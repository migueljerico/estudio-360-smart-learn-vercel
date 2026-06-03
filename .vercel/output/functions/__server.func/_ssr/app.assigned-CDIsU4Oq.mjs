import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as BookOpen, G as GraduationCap } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Assigned() {
  const {
    data
  } = useQuery({
    queryKey: ["assigned-all"],
    queryFn: async () => {
      const [d, q] = await Promise.all([supabase.from("decks").select("id,title,subject,topic"), supabase.from("quizzes").select("id,title,subject,topic")]);
      return {
        decks: d.data ?? [],
        quizzes: q.data ?? []
      };
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Tu contenido asignado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Estudia y autoevalúate a tu ritmo." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Tarjetas", icon: BookOpen, children: [
      (data?.decks ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/study/deck/$id", params: {
        id: d.id
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "transition hover:shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: d.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: [d.subject, d.topic].filter(Boolean).join(" · ") || "Sin tema" })
      ] }) }) }, d.id)),
      data?.decks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Cuestionarios", icon: GraduationCap, children: [
      (data?.quizzes ?? []).map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/study/quiz/$id", params: {
        id: q.id
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "transition hover:shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: q.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: [q.subject, q.topic].filter(Boolean).join(" · ") || "Sin tema" })
      ] }) }) }, q.id)),
      data?.quizzes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {})
    ] })
  ] });
}
function Section({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 flex items-center gap-2 font-display text-xl font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children })
  ] });
}
function Empty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "Nada por aquí todavía." });
}
export {
  Assigned as component
};
