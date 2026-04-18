
import { slugify } from './utils';
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

function getImage(id: string): ImagePlaceholder {
  // This is a placeholder function. In a real application, you would fetch this data from a CMS or API.
  return PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];
}

export type NavLink = {
  href: string;
  label: string;
  subLinks?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Inicio' },
  {
    href: '/quienes-somos',
    label: 'Nosotras',
    subLinks: [
      { href: '/quienes-somos#organizacion', label: 'Organización' },
      { href: '/quienes-somos#mision-vision', label: 'Misión y Visión' },
      { href: '/quienes-somos#alianzas', label: 'Alianzas' },
      { href: '/quienes-somos/directorio', label: 'Directorio' },
    ]
  },
  {
    href: '/servicios',
    label: 'Servicios',
    subLinks: [
      { href: '/servicios#asesoramiento', label: 'Asesoramiento' },
      { href: '/servicios#transformacion', label: 'Transformación Digital' },
      { href: '/servicios#academy', label: 'Business Academy' },
      { href: '/servicios#representacion', label: 'Representación' },
      { href: '/servicios', label: 'Ver todos...' },
    ]
  },
  { href: '/asociadas', label: 'Asociadas' },
  { href: '/calendario', label: 'Actividades' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

export const ABOUT_US = {
  introduction: "Es construir y conectar espacios de desarrollo para visibilizar a las mujeres en el Sector empresarial, fortaleciendo sus capacidades y fomentando las Redes de Negocios a nivel nacional e internacional, promoviendo un ambiente colaborativo, inclusivo, productivo y de compromiso con el desarrollo de nuestro país.",
  mission: "Fomentar el crecimiento y la consolidación de las empresas lideradas por mujeres, a través de la capacitación, el networking y la defensa de sus intereses, contribuyendo al desarrollo económico y social de Cochabamba y Bolivia.",
  vision: "Ser la organización líder y referente en el empoderamiento económico de la mujer en Bolivia, reconocida por su impacto en la creación de oportunidades y la promoción de un entorno empresarial inclusivo y equitativo.",
  impactStats: [
    { value: 200, label: 'Asociadas a nivel nacional' },
    { value: 100, label: 'Rondas de Negocio' },
    { value: 20, label: 'Alianzas Estratégicas' },
  ],
  genderApproach: [
    "Trabajamos para reducir las barreras que limitan la participación de las mujeres en todos los ámbitos, visibilizando el aporte que realizan a la economía y a la generación de fuentes de empleo formales.",
    "Buscamos crear una mayor conciencia y compromiso en quienes lideran las empresas sobre el valor de incorporar a las mujeres en puestos de toma de decisiones.",
    "Impulsamos el desarrollo de una agenda en políticas públicas que respondan a las necesidades diferenciadas de las mujeres empresarias y emprendedoras.",
    "Tenemos la convicción de que las mujeres son el componente transformador para el desarrollo económico y social de nuestro país."
  ],
  pillars: [
    { title: 'Capacitación', description: 'Fortalecemos habilidades y conocimientos.', icon: 'BrainCircuit' },
    { title: 'Networking', description: 'Creamos redes de contacto y colaboración.', icon: 'Network' },
    { title: 'Visibilización', description: 'Destacamos el éxito de nuestras asociadas.', icon: 'Megaphone' },
    { title: 'Incidencia', description: 'Influimos en políticas para la equidad.', icon: 'Landmark' },
  ],
};


export type TeamMember = {
  name: string;
  role: string;
  image: ImagePlaceholder;
  bio: string;
  linkedinUrl: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Magaly Castro Claure',
    role: 'Primera Vicepresidenta – FEPC',
    image: getImage('team-member-1'),
    bio: "Líder empresarial y referente en el ámbito de la representación gremial. Como Primera Vicepresidenta de la FEPC, trabaja por el fortalecimiento del ecosistema empresarial de Cochabamba.",
    linkedinUrl: "https://linkedin.com"
  },
  {
    name: 'Ximena Antezana Velasquez',
    role: 'Delegada - FEPC',
    image: getImage('team-member-2'),
    bio: "Profesional con amplia trayectoria en la gestión empresarial y representación institucional, comprometida con el desarrollo económico regional.",
    linkedinUrl: "https://linkedin.com"
  },
  {
    name: 'Danica Yaksic Hoyos',
    role: 'Delegada - FEPC',
    image: getImage('team-member-3'),
    bio: "Experta en desarrollo organizacional y liderazgo femenino, representando activamente los intereses del sector empresarial en diversas instancias.",
    linkedinUrl: "https://linkedin.com"
  },
  {
    name: 'Rocio Adorno Silguero',
    role: 'Directora – Fundación FEICOBOL',
    image: getImage('team-member-4'),
    bio: "Especialista en la organización de ferias y eventos de alto impacto, impulsando la visibilidad y competitividad de las empresas bolivianas.",
    linkedinUrl: "https://linkedin.com"
  },
];

export type ServiceCategory = 'Desarrollo Empresarial' | 'Networking y Visibilidad' | 'Asesoría Especializada';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  isFeatured?: boolean;
  details: string[];
}

export const SERVICES: Service[] = [
  {
    id: "asesoramiento",
    title: "Asesoramiento e Innovación Empresarial",
    description: "Mejoramos la gestión empresarial de manera holística, abordando la innovación como variable de diferenciación y éxito.",
    icon: "Rocket",
    category: 'Desarrollo Empresarial',
    isFeatured: true,
    details: [
      "Asesoramiento en Estrategia y Funciones Gerenciales.",
      "Asesoría Legal Corporativa.",
      "Asesoría Contable y Tributaria.",
      "Asesoría Financiera y Acceso a financiamiento."
    ],
  },
  {
    id: "transformacion-digital",
    title: "Programa de Transformación Digital",
    description: "Impulsamos la adquisición de conocimientos y la implementación de herramientas digitales para la operación de las empresas.",
    icon: "Laptop",
    category: 'Desarrollo Empresarial',
    details: [
      "Proceso de adquisición de conocimientos.",
      "Implementación de herramientas digitales."
    ],
  },
  {
    id: "seguridad",
    title: "Asesoría en Seguridad Industrial y Salud Ocupacional",
    description: "Servicios especializados en elaboración de Programas de Seguridad y Salud en el Trabajo (PSST), fichas ambientales y más.",
    icon: "ShieldCheck",
    category: 'Asesoría Especializada',
    details: [
      "Elaboración de Programas de Seguridad y Salud en el Trabajo – PSST.",
      "Representación técnica ante inspecciones del Ministerio de Trabajo.",
      "Elaboración de fichas ambientales y evaluación de impacto ambiental.",
    ],
  },
  {
    id: "academy",
    title: "CAMEBOL Business Academy",
    description: "Potenciamos conocimientos, herramientas y competencias para el crecimiento y empoderamiento de las mujeres.",
    icon: "BrainCircuit",
    category: 'Desarrollo Empresarial',
    isFeatured: true,
    details: [
      "Formación para Mujeres en Alta Dirección y Empresarias.",
      "Experiencias de aprendizaje personalizadas.",
      "Herramientas para desarrollo profesional y personal.",
    ],
  },
  {
    id: "mentoria",
    title: "Programa de Mentoría",
    description: "Accede a un amplio pool de profesionales y expertos que guían con su experiencia la mejor estrategia para tu empresa.",
    icon: "Users",
    category: 'Desarrollo Empresarial',
    details: [],
  },
  {
    id: "emprendedoras",
    title: "Formación para Emprendedoras",
    description: "Brindamos herramientas especializadas que promueven y fortalecen sus unidades productivas para un exitoso posicionamiento.",
    icon: "Lightbulb",
    category: 'Desarrollo Empresarial',
    details: [
      "Estrategia y propuesta de valor.",
      "Trasformación digital.",
      "Marco legal e impositivo.",
      "Educación financiera.",
    ],
  },
  {
    id: "representacion",
    title: "Representación Institucional",
    description: "Representamos y defendemos los intereses de nuestras asociadas ante instancias públicas y privadas.",
    icon: "Landmark",
    category: 'Asesoría Especializada',
    details: [
      "Defensa de intereses legítimos.",
      "Promoción de productos y servicios.",
      "Incidencia en políticas públicas."
    ],
  },
  {
    id: "visibilizacion",
    title: "Visibilización y Reconocimiento",
    description: "Visibilizamos a las mujeres con historias de éxito, trayectoria y aporte al ecosistema empresarial.",
    icon: "Megaphone",
    category: 'Networking y Visibilidad',
    details: [],
  },
  {
    id: "red-de-negocios",
    title: "Mujeres & Negocios",
    description: "Organizamos espacios de negocios inclusivos y colaborativos a través de Ruedas de Negocios, Ferias y Misiones Comerciales.",
    icon: "Network",
    category: 'Networking y Visibilidad',
    details: [
      "Ruedas de Negocios.",
      "Ferias y Misiones Comerciales.",
      "Oportunidades Comerciales a nivel regional e internacional."
    ],
  },
  {
    id: "directorio-empresas",
    title: "Directorio de Empresas Asociadas",
    description: "Facilita la interconexión entre las empresas, agilizando la prospección y adquisición de nuevos clientes.",
    icon: "BookUser",
    category: 'Networking y Visibilidad',
    details: [],
  },
  {
    id: "descuentos",
    title: "Catálogo de Descuentos y Promociones",
    description: "Fortalece la Red de Negocios y consolida el consumo entre las empresas asociadas, sus trabajadores y familias.",
    icon: "TicketPercent",
    category: 'Networking y Visibilidad',
    details: [],
  }
];

export type MemberCompany = {
  name: string;
  slug: string;
  sector: string;
  logo: ImagePlaceholder;
  coverImage: ImagePlaceholder;
  description: string;
  address: string;
  phone: string;
  website: string;
  googleMapsUrl: string;
  socialLinks: { name: 'Facebook' | 'Instagram' | 'Linkedin' | 'X' | 'Youtube'; url: string }[];
  brochureUrl?: string;
  featuredProducts?: {
    name: string;
    description: string;
    image: ImagePlaceholder;
  }[];
}

export const MEMBER_COMPANIES: MemberCompany[] = [
  {
    name: 'Innovatech Solutions',
    slug: 'innovatech-solutions',
    sector: 'Tecnología',
    logo: getImage('alliance-logo-1'),
    coverImage: getImage('gallery-1'),
    description: 'Innovatech Solutions es una empresa líder en el desarrollo de software a medida y consultoría tecnológica. Nos especializamos en crear soluciones innovadoras que impulsan la transformación digital de las empresas en Bolivia. Nuestro equipo de expertos está comprometido con la excelencia, la calidad y la satisfacción del cliente, ofreciendo productos que no solo cumplen, sino que superan las expectativas del mercado.',
    address: 'Av. Heroínas 123, Edificio "Torre Empresarial", Piso 5, Oficina 501, Cochabamba, Bolivia',
    phone: '+591 (4) 4555888',
    website: 'https://innovatech.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561358039656!2d-66.1593347851213!3d-17.38531798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Facebook', url: 'https://facebook.com/innovatech' },
      { name: 'Instagram', url: 'https://instagram.com/innovatech' },
      { name: 'Linkedin', url: 'https://linkedin.com/company/innovatech' }
    ],
    brochureUrl: "/docs/brochure-innovatech.pdf",
    featuredProducts: [
      { name: "ERP Cloud", description: "Sistema de planificación de recursos empresariales en la nube.", image: getImage('service-1') },
      { name: "CRM Pro", description: "Solución integral para la gestión de relaciones con clientes.", image: getImage('service-2') },
      { name: "Analytic Suite", description: "Plataforma de inteligencia de negocios y análisis de datos.", image: getImage('service-3') }
    ]
  },
  {
    name: 'Gourmet Delights',
    slug: 'gourmet-delights',
    sector: 'Gastronomía',
    logo: getImage('alliance-logo-2'),
    coverImage: getImage('gallery-2'),
    description: 'Gourmet Delights es un catering de alta cocina que transforma eventos en experiencias culinarias inolvidables. Fusionamos ingredientes locales de la más alta calidad con técnicas gastronómicas de vanguardia para crear menús personalizados que deleitan los paladares más exigentes. Desde eventos corporativos hasta celebraciones íntimas, nuestro compromiso es con la excelencia y la creatividad en cada plato.',
    address: 'Calle Sabor 456, Zona Gastronómica, Cochabamba, Bolivia',
    phone: '+591 (4) 4666999',
    website: 'https://gourmetdelights.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.19597368565!2d-66.1573347851213!3d-17.39961798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Facebook', url: 'https://facebook.com/gourmetdelights' },
      { name: 'Instagram', url: 'https://instagram.com/gourmetdelights' },
    ],
    featuredProducts: [
      { name: "Bocaditos de Lujo", description: "Selección de canapés y bocadillos para eventos.", image: getImage('event-1') },
      { name: "Estaciones de Comida", description: "Buffets temáticos interactivos para tus invitados.", image: getImage('event-2') }
    ]
  },
  {
    name: 'Creative Designs Co.',
    slug: 'creative-designs-co',
    sector: 'Diseño y Publicidad',
    logo: getImage('alliance-logo-3'),
    coverImage: getImage('gallery-3'),
    description: 'Creative Designs Co. es una agencia de branding y marketing digital que ayuda a las marcas a contar su historia. Ofrecemos servicios integrales de diseño gráfico, gestión de redes sociales, campañas publicitarias y estrategia de marca. Creemos en el poder del diseño para conectar con las personas y construir marcas memorables y exitosas.',
    address: 'Pje. Ideas 789, Barrio Creativo, Cochabamba, Bolivia',
    phone: '+591 (4) 4777000',
    website: 'https://creativedesigns.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561358039656!2d-66.1593347851213!3d-17.38531798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Linkedin', url: 'https://linkedin.com/company/creativedesigns' },
      { name: 'Instagram', url: 'https://instagram.com/creativedesigns' }
    ]
  },
  {
    name: 'EcoSustain Bolivia',
    slug: 'ecosustain-bolivia',
    sector: 'Consultoría Ambiental',
    logo: getImage('alliance-logo-4'),
    coverImage: getImage('gallery-4'),
    description: 'EcoSustain Bolivia ofrece soluciones integrales en consultoría ambiental, ayudando a las empresas a operar de manera sostenible y en cumplimiento con la normativa vigente. Nuestros servicios incluyen evaluación de impacto ambiental, gestión de residuos y desarrollo de proyectos de energía renovable.',
    address: 'Av. Ecológica 321, Cochabamba, Bolivia',
    phone: '+591 (4) 4888111',
    website: 'https://ecosustain.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561358039656!2d-66.1593347851213!3d-17.38531798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Linkedin', url: 'https://linkedin.com/company/ecosustain' }
    ]
  },
  {
    name: 'Andean Textiles',
    slug: 'andean-textiles',
    sector: 'Moda y Textil',
    logo: getImage('alliance-logo-5'),
    coverImage: getImage('gallery-5'),
    description: 'Andean Textiles fusiona la rica herencia textil de los Andes con diseños contemporáneos. Producimos prendas y accesorios de alta calidad utilizando fibras naturales como alpaca y algodón orgánico, trabajando en colaboración con comunidades de artesanos locales para crear moda con identidad y propósito.',
    address: 'Calle Telar 987, Cochabamba, Bolivia',
    phone: '+591 (4) 4999222',
    website: 'https://andeantextiles.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561358039656!2d-66.1593347851213!3d-17.38531798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/andeantextiles' },
      { name: 'Facebook', url: 'https://facebook.com/andeantextiles' }
    ]
  },
  {
    name: 'SaludTotal Bienestar',
    slug: 'saludtotal-bienestar',
    sector: 'Salud y Bienestar',
    logo: getImage('alliance-logo-6'),
    coverImage: getImage('gallery-6'),
    description: 'SaludTotal Bienestar es un centro integral dedicado a promover un estilo de vida saludable. Ofrecemos servicios de nutrición, fisioterapia, psicología y clases de yoga y pilates, con un enfoque holístico en el bienestar físico y mental de nuestros clientes.',
    address: 'Av. de la Salud 654, Cochabamba, Bolivia',
    phone: '+591 (4) 4111333',
    website: 'https://saludtotal.com.bo',
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561358039656!2d-66.1593347851213!3d-17.38531798808101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e374345c474a6b%3A0x2d3278c6b9e5acec!2sPlaza%20Col%C3%B3n%2C%2C%20Cochabamba!5e0!3m2!1sen!2sbo!4v1684876612345",
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/saludtotal' },
      { name: 'Facebook', url: 'https://facebook.com/saludtotal' }
    ]
  }
];


export type EventCategory = 'Networking' | 'Taller' | 'Foro' | 'Webinar';

export type Event = {
  title: string;
  slug: string;
  start: Date;
  end: Date;
  location: string;
  description: string;
  longDescription: string;
  image: ImagePlaceholder;
  category: EventCategory;
};


export const EVENTS: Event[] = [
  {
    title: "Rueda de Negocios 2024",
    slug: "rueda-de-negocios-2024",
    start: new Date("2024-10-25T14:00:00"),
    end: new Date("2024-10-25T20:00:00"),
    location: "Centro de Convenciones El Portal",
    description: "Una oportunidad única para establecer contactos comerciales y generar nuevas alianzas.",
    longDescription: "La Rueda de Negocios Anual de CAMEBOL es nuestro evento insignia, diseñado para conectar a empresarias y emprendedoras de todo el país. Durante una tarde intensiva, podrás participar en reuniones programadas uno a uno, presentar tus productos y servicios en un formato dinámico y ampliar tu red de contactos de manera efectiva. Contaremos con la participación de inversionistas, representantes de grandes empresas y expertas en comercio internacional. ¡No te pierdas la oportunidad de llevar tu negocio al siguiente nivel!",
    image: getImage('event-1'),
    category: 'Networking',
  },
  {
    title: "Taller: Marketing Digital para Emprendedoras",
    slug: "taller-marketing-digital",
    start: new Date("2024-11-12T18:00:00"),
    end: new Date("2024-11-12T20:00:00"),
    location: "Online (Vía Zoom)",
    description: "Aprende las últimas estrategias y herramientas para impulsar tu marca en el entorno online.",
    longDescription: "En este taller intensivo de 2 horas, nos sumergiremos en el mundo del marketing digital. Cubriremos temas esenciales como la gestión de redes sociales, creación de contenido atractivo, fundamentos de SEO para mejorar tu visibilidad en Google y estrategias de publicidad en Facebook e Instagram. Este taller es 100% práctico y está diseñado específicamente para las necesidades de las emprendedoras que buscan maximizar su impacto con recursos limitados.",
    image: getImage('event-2'),
    category: 'Taller',
  },
  {
    title: "Foro de Liderazgo Femenino",
    slug: "foro-liderazgo-femenino",
    start: new Date("2024-12-05T08:30:00"),
    end: new Date("2024-12-05T13:00:00"),
    location: "Hotel Cochabamba",
    description: "Un espacio de inspiración y diálogo con mujeres líderes de diversos ámbitos.",
    longDescription: "El Foro de Liderazgo Femenino reúne a mujeres influyentes del sector empresarial, político y social para discutir los desafíos y oportunidades del liderazgo actual. A través de paneles de discusión, charlas inspiradoras y sesiones de networking, exploraremos temas como la innovación, la sostenibilidad, la inteligencia artificial y el rol de la mujer en la construcción del futuro. Ven a inspirarte, aprender y conectar con la nueva generación de líderes de Bolivia.",
    image: getImage('gallery-5'),
    category: 'Foro',
  },
  {
    title: "Webinar: Claves para la Exportación",
    slug: "webinar-claves-exportacion",
    start: new Date("2025-01-20T19:00:00"),
    end: new Date("2025-01-20T20:30:00"),
    location: "Online",
    description: "Descubre los pasos esenciales para llevar tus productos al mercado internacional.",
    longDescription: "Este webinar gratuito, impartido por expertas en comercio exterior, te guiará a través de los conceptos fundamentales de la exportación. Aprenderás sobre investigación de mercados, requisitos aduaneros, logística internacional y estrategias de marketing global. Si sueñas con ver tus productos en otros países, este es el primer paso.",
    image: getImage('gallery-4'),
    category: 'Webinar',
  },
  {
    title: "Café de Networking: Edición Innovación",
    slug: "cafe-networking-innovacion",
    start: new Date("2025-02-15T09:00:00"),
    end: new Date("2025-02-15T11:00:00"),
    location: "Café Metropolitano",
    description: "Conecta con otras empresarias en un ambiente relajado y habla sobre las últimas tendencias.",
    longDescription: "Nuestros cafés de networking son el espacio perfecto para construir relaciones profesionales de manera informal y efectiva. En esta edición, el tema central será la innovación. Compartiremos ideas, experiencias y desafíos sobre cómo aplicar la creatividad y la tecnología para hacer crecer nuestros negocios. Trae tus tarjetas de presentación y prepárate para una mañana de conversaciones productivas y café delicioso.",
    image: getImage('gallery-6'),
    category: 'Networking',
  },
  {
    title: "Taller: Oratoria y Liderazgo",
    slug: 'taller-oratoria-y-liderazgo',
    start: new Date("2025-03-10T18:30:00"),
    end: new Date("2025-03-10T20:30:00"),
    location: "Online (Vía Zoom)",
    description: "Domina el arte de hablar en público y presenta tus ideas con confianza e impacto.",
    longDescription: "Aprende técnicas prácticas para estructurar tus discursos, manejar el lenguaje corporal, controlar los nervios y conectar con tu audiencia. Este taller interactivo te dará la confianza necesaria para brillar en cualquier presentación, reunión o negociación.",
    image: getImage('gallery-3'),
    category: 'Taller',
  }
];

export const FOOTER_DATA = {
  address: "C. Rigoberto Sainz N° 464",
  whatsapp: "+591 63924474",
  email: "info@camebolcochabamba.com",
  social: [
    { name: "Whatsapp", url: "https://wa.me/59163924474", icon: "Whatsapp" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100065638682964", icon: "Facebook" },
    { name: "Instagram", url: "https://www.instagram.com/camebol_cochabamba/", icon: "Instagram" },
  ]
}

type Alliance = {
  name: string;
  logo: ImagePlaceholder;
  url: string;
};

export const ALLIANCES: Alliance[] = [
  { name: "CAMEBOL Nacional", logo: { id: 'camebol-nacional', description: 'Logo CAMEBOL Nacional', imageUrl: '/img/logos/home/aliados/1. CAMEBOL NACIONAL.jpeg', imageHint: 'Logo CAMEBOL Nacional' }, url: '#' },
  { name: "FEPC", logo: { id: 'fepc', description: 'Logo FEPC', imageUrl: '/img/logos/home/aliados/2. FEPC.jpeg', imageHint: 'Logo FEPC' }, url: 'https://fepc.bo' },
  { name: "Business Networking", logo: { id: 'business-networking', description: 'Logo Business Networking', imageUrl: '/img/logos/home/aliados/3. BUSINESS NETWORKING.jpeg', imageHint: 'Logo Business Networking' }, url: '#' },
  { name: "CECI", logo: { id: 'ceci', description: 'Logo CECI', imageUrl: '/img/logos/home/aliados/4. CECI.jpeg', imageHint: 'Logo CECI' }, url: 'https://ceci.ca/es/' },
  { name: "Alliance 4.1", logo: { id: 'alliance-4-1', description: 'Logo Alianza', imageUrl: '/img/logos/home/aliados/4.1.jpeg', imageHint: 'Logo Alianza' }, url: '#' },
  { name: "CNI", logo: { id: 'cni', description: 'Logo CNI', imageUrl: '/img/logos/home/aliados/4.2.CNI .jpeg', imageHint: 'Logo CNI' }, url: 'https://www.cnibolivia.com/' },
  { name: "FEICOBOL", logo: { id: 'feicobol', description: 'Logo FEICOBOL', imageUrl: '/img/logos/home/aliados/5. FEICOBOL.jpeg', imageHint: 'Logo FEICOBOL' }, url: 'https://www.feicobol.com.bo/' },
  { name: "INFOCAL", logo: { id: 'infocal', description: 'Logo INFOCAL', imageUrl: '/img/logos/home/aliados/6.INFOCAL.jpeg', imageHint: 'Logo INFOCAL' }, url: 'https://www.infocalcbba.org/' },
  { name: "IME", logo: { id: 'ime', description: 'Logo IME', imageUrl: '/img/logos/home/aliados/7. IME .jpeg', imageHint: 'Logo IME' }, url: 'https://mujerempresa.org/' },
  { name: "UNIFRANZ", logo: { id: 'unifranz', description: 'Logo UNIFRANZ', imageUrl: '/img/logos/home/aliados/8. UNIFRANZ.jpeg', imageHint: 'Logo UNIFRANZ' }, url: 'https://unifranz.edu.bo/' },
  { name: "UNIVALLE", logo: { id: 'univalle', description: 'Logo UNIVALLE', imageUrl: '/img/logos/home/aliados/9. UNIVALLE.jpeg', imageHint: 'Logo UNIVALLE' }, url: 'https://www.univalle.edu/' },
  { name: "BancoSol", logo: { id: 'bancosol', description: 'Logo BancoSol', imageUrl: '/img/logos/home/aliados/11. BANCO SOL.jpeg', imageHint: 'Logo BancoSol' }, url: 'https://www.bancosol.com.bo/' },
];

export const COMMUNITY_PHOTOS = [
  { imageUrl: '/img/quienes-somos/1.jpeg', description: 'Comunidad CAMEBOL en acción', imageHint: 'Mujeres empresarias reunidas en un evento de CAMEBOL.' },
  { imageUrl: '/img/quienes-somos/2..jpeg', description: 'Talleres y capacitación', imageHint: 'Participantes en una sesión de formación.' },
  { imageUrl: '/img/quienes-somos/3..jpeg', description: 'Networking y alianzas', imageHint: 'Grupo de mujeres compartiendo experiencias.' },
  { imageUrl: '/img/quienes-somos/4..jpeg', description: 'Eventos corporativos', imageHint: 'Presentación en un evento de la cámara.' },
  { imageUrl: '/img/quienes-somos/5.jpeg', description: 'Crecimiento conjunto', imageHint: 'Socias celebrando logros juntas.' },
];

export const PRESS_APPEARANCES = [
  { name: 'Los Tiempos', logo: getImage('alliance-logo-1') },
  { name: 'Opinión', logo: getImage('alliance-logo-2') },
  { name: 'El Deber', logo: getImage('alliance-logo-3') },
  { name: 'Página Siete', logo: getImage('alliance-logo-4') },
];

export const QUICK_FAQS = [
  { question: '¿Quiénes pueden unirse a CAMEBOL?', answer: 'Toda mujer empresaria, emprendedora o profesional que lidere una unidad de negocio en Bolivia puede postular para ser miembro.' },
  { question: '¿Qué costo tiene la membresía?', answer: 'Tenemos diferentes planes de membresía adaptados al tamaño y etapa de tu empresa. Contáctanos para recibir información detallada.' },
  { question: '¿Qué beneficios obtengo al ser miembro?', answer: 'Acceso a una red de contactos invaluable, programas de capacitación exclusivos, visibilidad para tu marca y la oportunidad de participar en eventos de alto impacto.' },
];
