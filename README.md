# 🎓 Estudio360 — Plataforma Educativa · Despliegue Vercel

![React](https://img.shields.io/badge/React%2019-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Backend%20%2F%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Desplegado-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Estado](https://img.shields.io/badge/Estado-Publicado-4CAF50?style=for-the-badge)
![Tipo](https://img.shields.io/badge/Práctica-Low%20Code-FF6B6B?style=for-the-badge)

> **Ejercicio Práctico — Creación de Apps Low Code**  
> Plataforma educativa para profesores y alumnos desplegada en **Vercel**

---

## 🔗 Acceso a la Aplicación

[![Ver App en Producción](https://img.shields.io/badge/🚀%20Ver%20App%20en%20Producción-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://estudio-360-smart-learn-vercel.vercel.app)

> ℹ️ **Variante de despliegue:** Este repositorio usa el preset **`vercel`** con `vercel.json` y Vite framework. Existe una [variante con despliegue en Netlify](https://github.com/migueljerico/estudio-360-smart-learn-netlify) del mismo proyecto.

---

## 📋 Descripción del Proyecto

**Estudio360** conecta profesores y alumnos en un flujo de estudio estructurado. Los profesores crean tarjetas y cuestionarios, los organizan en clases y los asignan a sus alumnos; los alumnos estudian el contenido asignado, reciben feedback inmediato y pueden repasar solo las tarjetas falladas. La aplicación diferencia automáticamente el panel de cada usuario según el rol seleccionado en el registro.

---

## ✨ Funcionalidades principales

### 👩‍🏫 Para profesores

| Sección | Descripción |
|---|---|
| **Panel** | Resumen de tarjetas, cuestionarios, clases e intentos recientes |
| **Biblioteca** | Gestión del contenido propio; duplicar o eliminar tarjetas y cuestionarios |
| **Clases y alumnos** | Creación de clases; los alumnos se añaden con su ID de usuario |
| **Tarjetas** | Editor de decks de flashcards con frente y reverso |
| **Cuestionarios** | Editor de opción múltiple con corrección automática |
| **Alumnos** | Vista del progreso individual de cada estudiante |

### 🎒 Para alumnos

| Sección | Descripción |
|---|---|
| **Panel** | Tarjetas y cuestionarios asignados, porcentaje global de aciertos |
| **Estudio de tarjetas** | Modo flip-card con botones "La sabía / No la sabía" + repaso de fallos |
| **Cuestionarios** | Preguntas de opción múltiple con corrección visual inmediata |
| **Historial** | Lista de todos los intentos con puntuación y fecha |
| **Resultados** | Vista detallada de cada intento |

---

## 🏗️ Arquitectura del proyecto

```
src/
├── routes/                      # Páginas (file-based routing — TanStack Router)
│   ├── index.tsx                # Landing pública
│   ├── login.tsx                # Login / registro con selección de rol
│   ├── app.tsx                  # Layout autenticado con sidebar
│   ├── app.index.tsx            # Panel (diferente según rol)
│   ├── app.library.tsx          # Biblioteca de contenido
│   ├── app.classes.tsx          # Gestión de clases
│   ├── app.study.deck.$id.tsx   # Modo estudio flashcards
│   └── app.study.quiz.$id.tsx   # Modo cuestionario
├── integrations/supabase/       # Cliente Supabase + helpers de auth
├── components/
│   ├── AppSidebar.tsx
│   └── ui/                      # Componentes shadcn/ui
└── lib/
    └── auth-context.tsx         # Contexto de sesión y rol
```

---

## ⚙️ Configuración de despliegue — Vercel

El proyecto usa **Nitro** con preset `vercel` y un `vercel.json` para la configuración del framework:

```ts
// vite.config.ts
export default defineConfig({
  base: '/',
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "vercel" },
  build: { outDir: 'dist', emptyOutDir: true },
});
```

```json
// vercel.json
{ "version": 2, "framework": "vite" }
```

### Variables de entorno requeridas

```env
VITE_SUPABASE_URL=        # URL del proyecto Supabase
VITE_SUPABASE_ANON_KEY=   # Clave anónima de Supabase
```

### Desarrollo local

```bash
bun install
bun run dev        # Servidor de desarrollo Vite
bun run build      # Build para producción → dist/
```

---

## 🧰 Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | TanStack Start — React 19 + SSR |
| **Enrutamiento** | TanStack Router (file-based) |
| **Estilos** | Tailwind CSS v4 + shadcn/ui |
| **Backend / Auth / DB** | Supabase (PostgreSQL + Auth) |
| **Bundler** | Vite 7 + Nitro (`preset: vercel`) |
| **Despliegue** | Vercel (Vite framework + vercel.json) |
| **Gestor de paquetes** | Bun |

---

## 📚 Contexto formativo

Este ejercicio forma parte del programa de formación en **Análisis de Datos**, dentro del módulo de creación de aplicaciones low-code. El objetivo es construir y desplegar una aplicación web con roles, autenticación y base de datos, comparando las diferencias de configuración entre plataformas de despliegue modernas.

**Repositorio relacionado:** [Estudio360 — Variante Netlify](https://github.com/migueljerico/estudio-360-smart-learn-netlify) — misma app, configuración `preset: netlify` con SSR + Edge Functions.

---

<p align="center">
  <sub>Desarrollado por <a href="https://github.com/migueljerico">@migueljerico</a> · 2025</sub>
</p>
