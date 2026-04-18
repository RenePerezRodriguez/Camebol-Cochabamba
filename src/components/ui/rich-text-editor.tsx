"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { 
    Bold, 
    Italic, 
    Underline as UnderlineIcon, 
    List, 
    ListOrdered, 
    Link as LinkIcon, 
    Image as ImageIcon,
    Undo,
    Redo,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Code,
    Minus,
    Upload,
    Loader2,
    X,
    ExternalLink,
    ImagePlus
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback } from "react";
import { compressImage } from "@/lib/image-compression";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// Custom Modal Component for Links and Image URLs
function Modal({
    isOpen,
    onClose,
    title,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export function RichTextEditor({ value, onChange, placeholder = "Escribe el contenido..." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    
    // Modal states
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showImageUrlModal, setShowImageUrlModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkText, setLinkText] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary hover:underline cursor-pointer",
                },
            }),
            ImageExtension.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto border shadow-sm my-4 mx-auto block",
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg max-w-none p-5 focus:outline-none min-h-[400px] bg-white",
            },
            // Handle pasted images
            handlePaste: (view, event) => {
                const items = event.clipboardData?.items;
                if (!items) return false;

                for (const item of items) {
                    if (item.type.startsWith('image/')) {
                        event.preventDefault();
                        const file = item.getAsFile();
                        if (file) {
                            handleImageUpload(file);
                        }
                        return true;
                    }
                }
                return false;
            },
            // Handle dropped images
            handleDrop: (view, event) => {
                const files = event.dataTransfer?.files;
                if (!files || files.length === 0) return false;

                for (const file of files) {
                    if (file.type.startsWith('image/')) {
                        event.preventDefault();
                        handleImageUpload(file);
                        return true;
                    }
                }
                return false;
            }
        },
    });

    // Unified Image Upload Handler
    const handleImageUpload = async (file: File) => {
        if (!editor) return;
        setUploading(true);

        try {
            // 1. Compress Image
            const compressedFile = await compressImage(file);
            
            // 2. Prepare Form Data
            const formData = new FormData();
            formData.append("file", compressedFile);
            formData.append("folder", "news/content");

            // 3. Upload to API
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");
            
            const data = await res.json();
            
            // 4. Insert into Editor
            editor.chain().focus().setImage({ src: data.url }).run();

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al subir imagen. Revisa tu conexión.");
        } finally {
            setUploading(false);
        }
    };

    if (!editor) return null;

    // Link Helper
    const openLinkModal = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        setLinkText(selectedText);
        setLinkUrl("");
        setShowLinkModal(true);
    };

    const insertLink = () => {
        if (linkUrl) {
            let finalUrl = linkUrl;
            if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("/")) {
                finalUrl = `https://${finalUrl}`;
            }

            if (linkText && editor.state.selection.empty) {
                editor.chain().focus()
                    .insertContent(`<a href="${finalUrl}" class="text-primary hover:underline">${linkText}</a>`)
                    .run();
            } else {
                editor.chain().focus()
                    .setLink({ href: finalUrl })
                    .run();
            }
        }
        setShowLinkModal(false);
        setLinkUrl("");
        setLinkText("");
    };

    const countWords = (text: string) => {
        return text.trim().split(/\s+/).filter(Boolean).length;
    };

    return (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm border-gray-200">
            {/* Improved Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <ToolButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Deshacer"
                >
                    <Undo className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Rehacer"
                >
                    <Redo className="w-4 h-4" />
                </ToolButton>

                <Separator />

                <ToolButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Negrita"
                >
                    <Bold className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Cursiva"
                >
                    <Italic className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                    title="Subrayado"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive("code")}
                    title="Código"
                >
                    <Code className="w-4 h-4" />
                </ToolButton>

                <Separator />

                <ToolButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                    title="Título 1"
                >
                    <Heading1 className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                    title="Título 2"
                >
                    <Heading2 className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive("heading", { level: 3 })}
                    title="Título 3"
                >
                    <Heading3 className="w-4 h-4" />
                </ToolButton>

                <Separator />

                <ToolButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                    title="Lista"
                >
                    <List className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                    title="Lista numerada"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive("blockquote")}
                    title="Cita"
                >
                    <Quote className="w-4 h-4" />
                </ToolButton>
                <ToolButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Línea horizontal"
                >
                    <Minus className="w-4 h-4" />
                </ToolButton>

                <Separator />

                <ToolButton
                    onClick={openLinkModal}
                    active={editor.isActive("link")}
                    title="Insertar enlace"
                >
                    <LinkIcon className="w-4 h-4" />
                </ToolButton>

                <ToolButton
                    onClick={() => setShowImageUrlModal(true)}
                    title="Imagen por URL"
                >
                    <ImagePlus className="w-4 h-4" />
                </ToolButton>

                <button
                    type="button"
                    title="Subir imagen"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className={cn(
                        "p-2 rounded-md transition-all flex items-center gap-2",
                        uploading 
                            ? "bg-primary/10 text-primary animate-pulse" 
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    )}
                >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Subir</span>
                </button>
                <input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                    }}
                />
            </div>

            {/* Main Content Area */}
            <div className="relative">
                <EditorContent editor={editor} />
                
                {/* Upload Indicator Overlay */}
                {uploading && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-primary/20 overflow-hidden">
                        <div className="h-full bg-primary animate-progress origin-left" style={{ width: '40%' }} />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-400 flex justify-between items-center italic">
                <span>Puedes pegar imágenes (Ctrl+V) o arrastrarlas aquí</span>
                <span>{countWords(editor.getText())} palabras</span>
            </div>

            {/* Link Modal */}
            <Modal
                isOpen={showLinkModal}
                onClose={() => setShowLinkModal(false)}
                title="Insertar Enlace"
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-500 block mb-1">URL</label>
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://"
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-primary outline-none"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Texto (Opcional)</label>
                        <input
                            type="text"
                            value={linkText}
                            onChange={(e) => setLinkText(e.target.value)}
                            placeholder="Mostrar como..."
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-primary outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" type="button" onClick={() => setShowLinkModal(false)}>Cancelar</Button>
                        <Button type="button" onClick={insertLink} disabled={!linkUrl}>Insertar</Button>
                    </div>
                </div>
            </Modal>

            {/* Image URL Modal */}
            <Modal
                isOpen={showImageUrlModal}
                onClose={() => setShowImageUrlModal(false)}
                title="Imagen por URL"
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-500 block mb-1">URL de la Imagen</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-primary outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" type="button" onClick={() => setShowImageUrlModal(false)}>Cancelar</Button>
                        <Button 
                            type="button" 
                            onClick={() => {
                                if(imageUrl) {
                                    editor.chain().focus().setImage({ src: imageUrl }).run();
                                    setShowImageUrlModal(false);
                                    setImageUrl("");
                                }
                            }} 
                            disabled={!imageUrl}
                        >
                            Insertar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function ToolButton({
    onClick,
    active,
    disabled,
    title,
    children
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={cn(
                "p-2 rounded-md transition-all",
                active 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
            )}
        >
            {children}
        </button>
    );
}

function Separator() {
    return <div className="w-px h-6 bg-gray-200 mx-1 self-center" />;
}
