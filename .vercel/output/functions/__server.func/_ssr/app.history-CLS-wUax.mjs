import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { u as useAuth } from "./router-DjXwSKFg.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/zod.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function History() {
  const {
    user
  } = useAuth();
  const {
    data
  } = useQuery({
    queryKey: ["history", user?.id],
    queryFn: async () => (await supabase.from("quiz_attempts").select("*, quiz:quizzes(title)").eq("student_id", user.id).order("started_at", {
      ascending: false
    })).data ?? [],
    enabled: !!user
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Historial de intentos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      (data ?? []).map((a) => {
        const pct = a.total ? Math.round(a.score / a.total * 100) : 0;
        const quiz = a.quiz;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/results/$id", params: {
          id: a.id
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "transition hover:shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: quiz?.title ?? "Cuestionario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: a.finished_at ? new Date(a.finished_at).toLocaleString() : "En curso" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg", children: [
            pct,
            "% ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "(",
              a.score,
              "/",
              a.total,
              ")"
            ] })
          ] })
        ] }) }) }, a.id);
      }),
      data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "Aún no has hecho ningún cuestionario." })
    ] })
  ] });
}
export {
  History as component
};
