import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { a as Route$4 } from "./router-DjXwSKFg.mjs";
import "../_libs/sonner.mjs";
import { k as Trophy } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/zod.mjs";
function Results() {
  const {
    id
  } = Route$4.useParams();
  const {
    data
  } = useQuery({
    queryKey: ["attempt", id],
    queryFn: async () => {
      const a = await supabase.from("quiz_attempts").select("*, quiz:quizzes(title)").eq("id", id).single();
      const ans = await supabase.from("attempt_answers").select("*, question:questions(prompt), answer:answers(text)").eq("attempt_id", id);
      return {
        attempt: a.data,
        answers: ans.data ?? []
      };
    }
  });
  if (!data?.attempt) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cargando…" });
  const pct = data.attempt.total ? Math.round(data.attempt.score / data.attempt.total * 100) : 0;
  const rows = data.answers;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto h-10 w-10 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-3xl font-semibold", children: [
        pct,
        "% de aciertos"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        data.attempt.score,
        " de ",
        data.attempt.total,
        " correctas · ",
        data.attempt.quiz?.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", children: "Al panel" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/history", children: "Historial" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: r.question?.prompt }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-1 text-sm ${r.is_correct ? "text-success" : "text-destructive"}`, children: [
        "Tu respuesta: ",
        r.answer?.text
      ] })
    ] }) }, r.id)) })
  ] });
}
export {
  Results as component
};
