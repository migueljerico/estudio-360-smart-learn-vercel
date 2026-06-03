import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-DMDvqVcV.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx = reactExports.createContext({
  session: null,
  user: null,
  role: null,
  loading: true,
  signOut: async () => {
  }
});
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [role, setRole] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(async () => {
          const { data } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id).maybeSingle();
          setRole(data?.role ?? null);
        }, 0);
      } else {
        setRole(null);
      }
    });
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).maybeSingle();
        setRole(r?.role ?? null);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        session,
        user: session?.user ?? null,
        role,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Estudio360 — Aprende mejor, evalúate inteligente" },
      { name: "description", content: "Plataforma educativa para profesores y alumnos. Crea tarjetas, cuestionarios y sigue el progreso de toda tu clase." },
      { name: "author", content: "Estudio360" },
      { property: "og:title", content: "Estudio360 — Aprende mejor, evalúate inteligente" },
      { property: "og:description", content: "Plataforma educativa para profesores y alumnos. Crea tarjetas, cuestionarios y sigue el progreso de toda tu clase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Estudio360 — Aprende mejor, evalúate inteligente" },
      { name: "twitter:description", content: "Plataforma educativa para profesores y alumnos. Crea tarjetas, cuestionarios y sigue el progreso de toda tu clase." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4d93246b-1f37-4bae-b6d6-effac7ff1abc/id-preview-129142ac--d17fa008-79c5-47e3-9056-0a4b08370260.lovable.app-1780305914491.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4d93246b-1f37-4bae-b6d6-effac7ff1abc/id-preview-129142ac--d17fa008-79c5-47e3-9056-0a4b08370260.lovable.app-1780305914491.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$d = () => import("./login-DHNO6XmP.mjs");
const searchSchema = objectType({
  mode: enumType(["login", "signup"]).optional()
});
const Route$d = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Acceder · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./app-DBFVy8Q1.mjs");
const Route$c = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-2Rs0hWCy.mjs");
const Route$b = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Estudio360 — Aprende mejor, evalúate inteligente"
    }, {
      name: "description",
      content: "Plataforma educativa para profesores y alumnos. Flashcards, autoevaluaciones y seguimiento del progreso."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./app.index-BNvNKFjv.mjs");
const Route$a = createFileRoute("/app/")({
  head: () => ({
    meta: [{
      title: "Panel · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./app.students-CCqhm_mI.mjs");
const Route$9 = createFileRoute("/app/students")({
  head: () => ({
    meta: [{
      title: "Progreso de alumnos · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app.library-BTCNpz8w.mjs");
const Route$8 = createFileRoute("/app/library")({
  head: () => ({
    meta: [{
      title: "Biblioteca · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.history-CLS-wUax.mjs");
const Route$7 = createFileRoute("/app/history")({
  head: () => ({
    meta: [{
      title: "Historial · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.classes-Ceo0Em2V.mjs");
const Route$6 = createFileRoute("/app/classes")({
  head: () => ({
    meta: [{
      title: "Clases · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.assigned-CDIsU4Oq.mjs");
const Route$5 = createFileRoute("/app/assigned")({
  head: () => ({
    meta: [{
      title: "Mi contenido · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.results._id-DBv1wcJA.mjs");
const Route$4 = createFileRoute("/app/results/$id")({
  head: () => ({
    meta: [{
      title: "Resultados · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.quizzes._id-D34pkRhg.mjs");
const Route$3 = createFileRoute("/app/quizzes/$id")({
  head: () => ({
    meta: [{
      title: "Cuestionario · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.decks._id-qdAXHO2u.mjs");
const Route$2 = createFileRoute("/app/decks/$id")({
  head: () => ({
    meta: [{
      title: "Tarjeta · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.study.quiz._id-Cd8H2r2I.mjs");
const Route$1 = createFileRoute("/app/study/quiz/$id")({
  head: () => ({
    meta: [{
      title: "Cuestionario · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.study.deck._id-BZ3Ldpwv.mjs");
const Route = createFileRoute("/app/study/deck/$id")({
  head: () => ({
    meta: [{
      title: "Estudio · Estudio360"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$d.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$e
});
const AppRoute = Route$c.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const AppIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppStudentsRoute = Route$9.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => AppRoute
});
const AppLibraryRoute = Route$8.update({
  id: "/library",
  path: "/library",
  getParentRoute: () => AppRoute
});
const AppHistoryRoute = Route$7.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => AppRoute
});
const AppClassesRoute = Route$6.update({
  id: "/classes",
  path: "/classes",
  getParentRoute: () => AppRoute
});
const AppAssignedRoute = Route$5.update({
  id: "/assigned",
  path: "/assigned",
  getParentRoute: () => AppRoute
});
const AppResultsIdRoute = Route$4.update({
  id: "/results/$id",
  path: "/results/$id",
  getParentRoute: () => AppRoute
});
const AppQuizzesIdRoute = Route$3.update({
  id: "/quizzes/$id",
  path: "/quizzes/$id",
  getParentRoute: () => AppRoute
});
const AppDecksIdRoute = Route$2.update({
  id: "/decks/$id",
  path: "/decks/$id",
  getParentRoute: () => AppRoute
});
const AppStudyQuizIdRoute = Route$1.update({
  id: "/study/quiz/$id",
  path: "/study/quiz/$id",
  getParentRoute: () => AppRoute
});
const AppStudyDeckIdRoute = Route.update({
  id: "/study/deck/$id",
  path: "/study/deck/$id",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppAssignedRoute,
  AppClassesRoute,
  AppHistoryRoute,
  AppLibraryRoute,
  AppStudentsRoute,
  AppIndexRoute,
  AppDecksIdRoute,
  AppQuizzesIdRoute,
  AppResultsIdRoute,
  AppStudyDeckIdRoute,
  AppStudyQuizIdRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  Route$4 as a,
  Route$3 as b,
  Route$2 as c,
  Route$1 as d,
  Route as e,
  router as r,
  useAuth as u
};
