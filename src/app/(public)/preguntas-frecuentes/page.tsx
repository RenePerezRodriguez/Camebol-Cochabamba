
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/layout/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { SectionDivider } from '@/components/ui/section-divider';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿Quiénes pueden afiliarse a CAMEBOL Cochabamba?',
    answer:
      'Tanto empresarias con empresas constituidas como emprendedoras que estén iniciando su camino pueden afiliarse. Tenemos diferentes requisitos y beneficios adaptados a cada perfil. Visita nuestra página de "Afíliate" para más detalles.',
  },
  {
    question: '¿Cuáles son los beneficios de ser socia?',
    answer:
      'Al ser socia, accedes a una red de más de 1.000 mujeres líderes, participas en eventos exclusivos de networking, te beneficias de nuestros programas de capacitación en la Business Academy, obtienes visibilidad para tu marca y mucho más. Explora la sección de "Servicios" para conocer todos los beneficios.',
  },
  {
    question: '¿Tienen costo los eventos y talleres?',
    answer:
      'Muchos de nuestros eventos y talleres son gratuitos o tienen un costo preferencial muy reducido para nuestras socias. Algunos eventos especiales o programas de formación avanzados pueden tener un costo, el cual siempre se comunica con antelación.',
  },
  {
    question: '¿Cómo puedo participar en las ruedas de negocios?',
    answer:
      'Las ruedas de negocios se anuncian en nuestra sección de "Actividades" y a través de nuestros canales de comunicación. Como socia, recibirás invitaciones prioritarias para inscribirte y participar en estos importantes eventos de networking.',
  },
  {
    question: 'Mi empresa no está en Cochabamba, ¿puedo afiliarme?',
    answer:
      'CAMEBOL es una organización nacional con filiales en diferentes departamentos. Esta es la filial de Cochabamba. Te recomendamos contactar a la filial de CAMEBOL en tu departamento para conocer el proceso de afiliación local y poder participar en las actividades de tu región.',
  },
];

export default function FaqPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container py-16 md:py-24 relative z-10">
        <SectionHeader
          title="Preguntas Frecuentes"
          subtitle="Hemos recopilado las dudas más comunes para que puedas resolverlas rápidamente."
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border-0 rounded-2xl shadow-md bg-background/60 backdrop-blur-md ring-1 ring-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-background/80 data-[state=open]:ring-primary/50 data-[state=open]:bg-background"
              >
                <AccordionTrigger className="p-6 text-lg font-medium hover:no-underline text-left [&[data-state=open]>div>svg]:rotate-180">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      <HelpCircle className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                    <span className="flex-1 text-foreground group-hover:text-primary transition-colors">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="pl-[3.5rem]">
                    <p className="text-muted-foreground text-base leading-relaxed border-l-2 border-primary/20 pl-4">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <SectionDivider />
    </div>
  );
}
