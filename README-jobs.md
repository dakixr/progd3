# Portal de Empleo - Programita D3

## Descripción General del Proyecto
El Portal de Empleo de Programita D3 es una plataforma diseñada para mostrar las oportunidades laborales disponibles en Programita D3, una empresa española especializada en soluciones tecnológicas para la industria cinematográfica. El portal permite a los candidatos explorar las ofertas de trabajo, ver detalles específicos de cada posición y enviar sus solicitudes.

## Características
- **Listado de Empleos**: Página principal que muestra todas las ofertas de trabajo disponibles, con opciones de filtrado por departamento, ubicación y tipo de contrato.
- **Páginas de Detalle de Empleo**: Vistas detalladas para cada oferta que incluyen descripción del puesto, responsabilidades, requisitos y beneficios.
- **Formulario de Solicitud**: Formulario integrado en cada página de detalle para que los candidatos puedan enviar su solicitud directamente.
- **Panel de Administración**: Interfaz para gestionar las ofertas de trabajo, con opciones para añadir, editar y eliminar ofertas.
- **Script de Gestión de Empleos**: Herramienta de línea de comandos para gestionar las ofertas de trabajo de forma eficiente.
- **Herramienta de Traducciones**: Utilidad para gestionar las traducciones del portal, identificar traducciones faltantes y exportar/importar traducciones.
- **Soporte Multilingüe**: Implementación completa en español e inglés, con posibilidad de añadir más idiomas en el futuro.

## Estructura de Archivos
- `src/pages/jobs/index.astro`: Página principal del portal de empleo
- `src/pages/jobs/[id].astro`: Plantilla para las páginas de detalle de cada empleo
- `src/pages/admin/jobs.astro`: Panel de administración para gestionar empleos
- `src/data/jobs.ts`: Archivo de datos que contiene la información de las ofertas de trabajo
- `src/i18n/ui.ts`: Traducciones para la interfaz de usuario
- `src/components/ui/`: Componentes de UI reutilizables
- `src/lib/utils.ts`: Funciones de utilidad
- `src/scripts/job-manager.js`: Script para gestionar ofertas de trabajo desde la línea de comandos
- `src/scripts/translation-helper.js`: Script para gestionar traducciones
- `src/scripts/fix-csv.js`: Script para corregir el formato del archivo CSV de traducciones
- `job-manager`: Script wrapper para facilitar el uso del gestor de empleos
- `translation-helper`: Script wrapper para facilitar el uso del gestor de traducciones

## Gestión de Ofertas de Trabajo

### Usando el Panel de Administración
1. Navega a `/admin/jobs` en tu navegador
2. Utiliza los botones "Añadir Empleo", "Editar" y "Eliminar" para gestionar las ofertas

### Usando el Script de Gestión de Empleos
El proyecto incluye un script de línea de comandos para gestionar las ofertas de trabajo de forma eficiente:

```bash
# Usando el script npm (recomendado)
npm run jobs list
npm run jobs add
npm run jobs edit
npm run jobs remove

# Usando el script wrapper
./job-manager list
./job-manager add
./job-manager edit
./job-manager remove

# Alternativamente, puedes usar directamente el script Node.js
node src/scripts/job-manager.js list
node src/scripts/job-manager.js add
node src/scripts/job-manager.js edit
node src/scripts/job-manager.js remove
```

El script es interactivo y te guiará a través del proceso de añadir, editar o eliminar ofertas.

### Editando Manualmente el Archivo de Datos
También puedes editar directamente el archivo `src/data/jobs.ts` si prefieres:

1. Abre el archivo `src/data/jobs.ts`
2. Añade, modifica o elimina entradas en el array `jobs`
3. Asegúrate de seguir el formato de la interfaz `Job`
4. Guarda el archivo

## Gestión de Traducciones

### Usando la Herramienta de Traducciones
El proyecto incluye un script para gestionar las traducciones del portal:

```bash
# Usando el script npm (recomendado)
npm run i18n check   # Verificar traducciones faltantes
npm run i18n add     # Añadir una nueva clave de traducción
npm run i18n export  # Exportar traducciones a CSV
npm run i18n import  # Importar traducciones desde CSV

# Para exportar traducciones y corregir el formato del CSV
npm run i18n export && npm run fix-csv

# Usando el script wrapper
./translation-helper check
./translation-helper add
./translation-helper export
./translation-helper import

# Alternativamente, puedes usar directamente el script Node.js
node src/scripts/translation-helper.js check
node src/scripts/translation-helper.js add
node src/scripts/translation-helper.js export
node src/scripts/translation-helper.js import
```

### Editando Manualmente el Archivo de Traducciones
También puedes editar directamente el archivo `src/i18n/ui.ts` si prefieres:

1. Abre el archivo `src/i18n/ui.ts`
2. Añade o modifica las claves de traducción en los objetos correspondientes a cada idioma
3. Asegúrate de mantener la misma estructura para todos los idiomas
4. Guarda el archivo

## Personalización
- **Estilos**: Modifica los estilos en los archivos CSS correspondientes
- **Traducciones**: Añade o modifica traducciones en `src/i18n/ui.ts`
- **Componentes UI**: Personaliza los componentes en `src/components/ui/`

## Mejoras Futuras
- Integración con base de datos para almacenar las ofertas de trabajo y las solicitudes
- Sistema de autenticación para el panel de administración
- Notificaciones por email para nuevas solicitudes
- Estadísticas y análisis de solicitudes

## Tecnologías Utilizadas
- Astro
- React
- Tailwind CSS
- TypeScript
- Node.js

## Licencia
Este proyecto es propiedad de Programita D3 y no está disponible públicamente sin autorización. 