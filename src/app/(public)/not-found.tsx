import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

      {/* Diamond Shape */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rotate-45 opacity-20 blur-md absolute inset-0" />
        <div className="w-32 h-32 border-2 border-primary/20 rotate-45 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <span className="text-4xl font-bold text-primary -rotate-45">404</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold !font-headline text-foreground mb-4">
        Página No Encontrada
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8 px-4">
        Parece que el diamante que buscas no se encuentra en nuestro cofre.
      </p>

      <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all duration-300">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Link>
      </Button>
    </div>
  )
}
