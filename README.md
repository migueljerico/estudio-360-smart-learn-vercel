# Estudio360

Plataforma educativa para profesores y alumnos. Crea flashcards, lanza cuestionarios y sigue el progreso real del aprendizaje, todo desde un solo lugar.

---

## ¿Qué hace la app?

Estudio360 conecta profesores y alumnos en un flujo de estudio estructurado:

- **Los profesores** crean tarjetas de estudio (flashcards) y cuestionarios de opción múltiple, los organizan en clases y los asignan a sus alumnos.
- **Los alumnos** estudian el contenido asignado, reciben feedback inmediato al terminar cada cuestionario y pueden repasar únicamente las tarjetas que han fallado.

La aplicación diferencia automáticamente el panel de cada usuario según su rol (profesor o alumno) en el momento del registro.

---

## Funcionalidades principales

### Para profesores
| Sección | Descripción |
|---|---|
| **Panel** | Resumen de tarjetas, cuestionarios, clases e intentos recientes |
| **Biblioteca** | Gestión de todo el contenido propio; permite duplicar o eliminar tarjetas y cuestionarios |
| **Clases y alumnos** | Creación de clases; los alumnos se añaden pegando su ID de usuario |
| **Tarjetas** | Editor de decks de flashcards con frente y reverso |
| **Cuestionarios** | Editor de cuestionarios de opción múltiple con corrección automática |
| **Alumnos** | Vista del progreso individual de cada estudiante |

### Para alumnos
| Sección | Descripción |
|---|---|
| **Panel** | Tarjetas y cuestionarios asignados, porcentaje global de aciertos |
| **Estudio de tarjetas** | Modo flip-card con botones "La sabía / No la sabía"; al terminar, opción de repasar solo los fallos |
| **Cuestionarios** | Preguntas de opción múltiple una a una, con corrección visual inmediata y navegación a la siguiente pregunta |
| **Historial** | Lista de todos los intentos realizados con puntuación y fecha |
| **Resultados** | Vista detallada de cada intento |

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework frontend/SSR | [TanStack Start](https://tanstack.com/start) (React 19) |
| Enrutamiento | TanStack Router (file-based) |
| Estilos | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Backend / Auth / DB | [Supabase](https://supabase.com) (PostgreSQL + Auth) |
| Bundler | Vite 7 + Nitro (preset `netlify`) |
| Despliegue | [Netlify](https://netlify.com) |
| Gestor de paquetes | Bun |

---

## Arquitectura

```
src/
├── routes/             # Páginas (file-based routing via TanStack Router)
│   ├── index.tsx       # Landing pública
│   ├── login.tsx       # Login / registro con selección de rol
│   ├── app.tsx         # Layout autenticado con sidebar
│   ├── app.index.tsx   # Panel (diferente según rol)
│   ├── app.library.tsx # Biblioteca de contenido
│   ├── app.classes.tsx # Gestión de clases
│   ├── app.students.tsx
│   ├── app.decks.$id.tsx
│   ├── app.quizzes.$id.tsx
│   ├── app.study.deck.$id.tsx   # Modo estudio flashcards
│   ├── app.study.quiz.$id.tsx   # Modo cuestionario
│   ├── app.history.tsx
│   └── app.results.$id.tsx
├── integrations/supabase/       # Cliente Supabase + helpers de auth
├── components/
│   ├── AppSidebar.tsx           # Navegación lateral
│   └── ui/                      # Componentes shadcn/ui
└── lib/
    ├── auth-context.tsx          # Contexto de sesión y rol
    └── utils.ts
```

---

## Configuración del despliegue

El proyecto usa Nitro con el preset `netlify` para generar una build compatible con Netlify (SSR + funciones edge). La configuración se encuentra en `vite.config.ts`:

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "netlify",
  },
});
```

---

## Variables de entorno requeridas

Estas variables deben configurarse en el panel de Netlify (o en un archivo `.env` en local):

```
VITE_SUPABASE_URL=       # URL del proyecto Supabase
VITE_SUPABASE_ANON_KEY=  # Clave anónima de Supabase
```

---

## Desarrollo local

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# O usando Netlify CLI (incluye emulación de funciones)
netlify dev --port 8889
```

---

## Historial de cambios relevantes

| Commit | Descripción |
|---|---|
| `8ccf57e` | Habilitó Nitro con el preset de Netlify para SSR correcto en producción |
| `4337f2c` | Renombró secciones internas de "deck/quizzes" a "tarjetas/cuestionarios" |
| `129142a` | Añadió badge de ID de alumno y métricas de progreso en el panel |

---

© 2026 Estudio360 · Aprender es un acto diario.
