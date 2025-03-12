export interface Job {
  id: string;
  title: string;
  department: 'engineering' | 'design' | 'marketing' | 'product' | 'other';
  location: 'Madrid' | 'Barcelona' | 'Valencia' | 'Remote';
  type: 'full_time' | 'part_time';
  workMode: 'remote' | 'hybrid' | 'onsite';
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

// Sample job listings
export const jobs: Job[] = [
  {
    id: 'frontend-developer',
    title: 'Desarrollador/a Frontend',
    department: 'engineering',
    location: 'Madrid',
    type: 'full_time',
    workMode: 'hybrid',
    postedDate: '2025-05-15',
    description: 'Buscamos un desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de productos para la industria cinematográfica.',
    requirements: [
      'Experiencia mínima de 3 años en desarrollo frontend',
      'Dominio de React, TypeScript y CSS moderno',
      'Conocimiento de herramientas de testing como Jest y React Testing Library',
      'Experiencia con sistemas de diseño y componentes reutilizables',
      'Valorable experiencia en la industria audiovisual'
    ],
    responsibilities: [
      'Desarrollar interfaces de usuario para nuestras aplicaciones web',
      'Colaborar con el equipo de diseño para implementar experiencias de usuario intuitivas',
      'Mantener y mejorar el código existente',
      'Participar en revisiones de código y sesiones de pair programming',
      'Contribuir a la arquitectura frontend de nuestros productos'
    ],
    benefits: [
      'Horario flexible',
      'Posibilidad de teletrabajo parcial',
      'Formación continua',
      'Seguro médico privado',
      'Eventos de equipo y actividades de team building'
    ]
  },
  {
    id: 'backend-developer',
    title: 'Desarrollador/a Backend',
    department: 'engineering',
    location: 'Madrid',
    type: 'full_time',
    workMode: 'hybrid',
    postedDate: '2025-05-10',
    description: 'Estamos buscando un desarrollador backend con experiencia en Node.js y bases de datos para fortalecer nuestro equipo de ingeniería.',
    requirements: [
      'Experiencia mínima de 3 años en desarrollo backend',
      'Dominio de Node.js y TypeScript',
      'Experiencia con bases de datos SQL y NoSQL',
      'Conocimiento de arquitecturas de microservicios',
      'Valorable experiencia con AWS o Azure'
    ],
    responsibilities: [
      'Diseñar y desarrollar APIs RESTful',
      'Implementar y mantener bases de datos',
      'Optimizar el rendimiento de las aplicaciones',
      'Colaborar en la definición de la arquitectura del sistema',
      'Participar en la integración continua y despliegue continuo'
    ],
    benefits: [
      'Horario flexible',
      'Posibilidad de teletrabajo parcial',
      'Formación continua',
      'Seguro médico privado',
      'Eventos de equipo y actividades de team building'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'Diseñador/a UI/UX',
    department: 'design',
    location: 'Barcelona',
    type: 'full_time',
    workMode: 'hybrid',
    postedDate: '2025-05-05',
    description: 'Buscamos un diseñador UI/UX creativo y orientado a resultados para diseñar experiencias de usuario excepcionales para nuestros productos digitales.',
    requirements: [
      'Experiencia mínima de 3 años en diseño UI/UX',
      'Dominio de herramientas como Figma, Sketch o Adobe XD',
      'Conocimiento de principios de diseño de interfaces y experiencia de usuario',
      'Capacidad para crear prototipos interactivos',
      'Portfolio que demuestre habilidades de diseño visual y de interacción'
    ],
    responsibilities: [
      'Diseñar interfaces de usuario intuitivas y atractivas',
      'Crear wireframes, mockups y prototipos',
      'Colaborar con desarrolladores para implementar diseños',
      'Realizar investigación de usuarios y pruebas de usabilidad',
      'Contribuir a la evolución del sistema de diseño'
    ],
    benefits: [
      'Horario flexible',
      'Posibilidad de teletrabajo parcial',
      'Formación continua',
      'Seguro médico privado',
      'Eventos de equipo y actividades de team building'
    ]
  },
  {
    id: 'marketing-specialist',
    title: 'Especialista en Marketing Digital',
    department: 'marketing',
    location: 'Remote',
    type: 'full_time',
    workMode: 'remote',
    postedDate: '2025-04-28',
    description: 'Buscamos un especialista en marketing digital con experiencia en el sector B2B para impulsar nuestra estrategia de marketing y aumentar la visibilidad de nuestros productos.',
    requirements: [
      'Experiencia mínima de 3 años en marketing digital B2B',
      'Conocimiento de SEO, SEM, email marketing y redes sociales',
      'Experiencia en creación de contenido para diferentes canales',
      'Capacidad para analizar datos y métricas de marketing',
      'Valorable experiencia en el sector tecnológico o audiovisual'
    ],
    responsibilities: [
      'Desarrollar e implementar estrategias de marketing digital',
      'Gestionar campañas en diferentes canales',
      'Crear contenido relevante para nuestro público objetivo',
      'Analizar el rendimiento de las acciones de marketing',
      'Colaborar con el equipo de ventas para generar leads cualificados'
    ],
    benefits: [
      'Trabajo 100% remoto',
      'Horario flexible',
      'Formación continua',
      'Seguro médico privado',
      'Eventos de equipo virtuales'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'product',
    location: 'Madrid',
    type: 'full_time',
    workMode: 'hybrid',
    postedDate: '2025-04-20',
    description: 'Estamos buscando un Product Manager con experiencia en productos digitales para liderar el desarrollo de nuestras soluciones para la industria cinematográfica.',
    requirements: [
      'Experiencia mínima de 4 años como Product Manager',
      'Conocimiento de metodologías ágiles',
      'Capacidad para definir roadmaps y priorizar funcionalidades',
      'Habilidades de comunicación y liderazgo',
      'Valorable experiencia en la industria audiovisual'
    ],
    responsibilities: [
      'Definir la visión y estrategia de producto',
      'Gestionar el backlog y priorizar funcionalidades',
      'Colaborar con equipos de desarrollo, diseño y marketing',
      'Recopilar y analizar feedback de usuarios',
      'Identificar oportunidades de mejora y nuevas funcionalidades'
    ],
    benefits: [
      'Horario flexible',
      'Posibilidad de teletrabajo parcial',
      'Formación continua',
      'Seguro médico privado',
      'Eventos de equipo y actividades de team building'
    ]
  }
]; 