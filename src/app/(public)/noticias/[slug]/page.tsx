import { getNewsBySlug, getLatestNews } from "@/actions/news";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Share2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { NewsCard } from "@/components/public/news-card";
import { ShareButton } from "@/components/public/share-button";
import sanitizeHtml from "sanitize-html";

interface NewsDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) return {};

    return {
        title: news.metaTitle || `${news.title} | CAMEBOL Cochabamba`,
        description: news.metaDescription || news.excerpt,
        openGraph: {
            title: news.title,
            description: news.excerpt,
            images: news.imageUrl ? [news.imageUrl] : [],
        },
    };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) notFound();

    const relatedNews = await getLatestNews(3);
    // Filter out current news
    const filteredRelated = relatedNews.filter(r => r.id !== news.id);

    const formattedDate = format(new Date(news.publishedAt), "PPP", { locale: es });

    return (
        <article className="min-h-screen">
            {/* Hero Header Section */}
            <div className="relative h-[60vh] md:h-[70vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={news.imageUrl || "/img/placeholder-news.webp"}
                    alt={news.imageAlt || news.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container mx-auto px-6 lg:px-12 pb-16">
                        <div className="max-w-4xl space-y-6 animate-fade-in-up">
                            <Link 
                                href="/noticias" 
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                Volver a noticias
                            </Link>

                            <Badge className="bg-brand-pink text-white border-none px-4 py-1.5 text-xs uppercase tracking-widest font-bold">
                                {news.category}
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif uppercase tracking-tight">
                                {news.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium pt-2">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand-pink" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-brand-pink" />
                                    {news.author}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">
                    {/* Main Content Column */}
                    <div className="flex-1">
                        {/* Excerpt / Lead Paragraph */}
                        <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-12 border-l-4 border-brand-pink pl-6 italic bg-slate-50 py-6 rounded-r-lg">
                            {news.excerpt}
                        </p>

                        {/* Rich Text Content */}
                        <div 
                            className="prose prose-slate prose-lg max-w-none 
                                prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-slate-900
                                prose-p:text-slate-700 prose-p:leading-relaxed
                                prose-strong:text-slate-950 prose-strong:font-bold
                                prose-img:rounded-2xl prose-img:shadow-xl
                                prose-a:text-brand-pink prose-a:no-underline hover:prose-a:underline font-body"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content, {
                                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe', 'figure', 'figcaption']),
                                allowedAttributes: {
                                    ...sanitizeHtml.defaults.allowedAttributes,
                                    img: ['src', 'alt', 'width', 'height', 'loading', 'class'],
                                    iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
                                    '*': ['class'],
                                },
                                allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
                            }) }}
                        />

                        {/* Social Share & Actions Placeholder */}
                        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                                Compartir noticia:
                            </span>
                            <div className="flex gap-4">
                                <ShareButton 
                                    title={news.title}
                                    text={news.excerpt}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related News Section */}
            {filteredRelated.length > 0 && (
                <section className="bg-slate-50 py-24">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 uppercase font-serif tracking-tight">
                                    Otras <span className="text-brand-pink">Actividades</span>
                                </h2>
                                <Link 
                                    href="/noticias" 
                                    className="text-sm font-bold text-brand-pink hover:underline uppercase tracking-widest"
                                >
                                    Ver todas
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredRelated.slice(0, 2).map((item) => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
