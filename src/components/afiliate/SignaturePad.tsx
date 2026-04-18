'use client';

import React, { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eraser } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  hasSignature: boolean;
}

const CANVAS_HEIGHT = 200;

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, hasSignature }) => {
  const sigPad = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) setCanvasWidth(width);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clear = () => {
    sigPad.current?.clear();
    onSave('');
  };

  const handleEndStroke = () => {
    if (sigPad.current) {
      onSave(sigPad.current.toDataURL());
    }
  };

  return (
    <Card>
      <CardContent className="p-2">
        <div
          ref={containerRef}
          className="w-full border rounded-md bg-white"
          style={{ height: CANVAS_HEIGHT }}
        >
          {canvasWidth > 0 && (
            <SignatureCanvas
              ref={sigPad}
              penColor="#000"
              backgroundColor="rgb(255, 255, 255)"
              canvasProps={{
                width: canvasWidth,
                height: CANVAS_HEIGHT,
                className: 'rounded-md cursor-crosshair',
              }}
              onEnd={handleEndStroke}
            />
          )}
        </div>
        {hasSignature && (
          <p className="text-xs text-green-600 font-medium mt-1 text-right">Firma guardada</p>
        )}
        <div className="mt-1 flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={clear}>
            <Eraser className="mr-2 h-4 w-4" />
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignaturePad;
