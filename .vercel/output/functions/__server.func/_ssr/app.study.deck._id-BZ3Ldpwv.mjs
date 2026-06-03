import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { e as Route, u as useAuth } from "./router-DjXwSKFg.mjs";
import "../_libs/sonner.mjs";
import { R as RotateCcw, A as ArrowLeft, X, a as Check } from "../_libs/lucide-react.mjs";
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
function StudyDeck() {
  const {
    id
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["study-deck", id],
    queryFn: async () => {
      const [d, c] = await Promise.all([supabase.from("decks").select("title").eq("id", id).single(), supabase.from("flashcards").select("*").eq("deck_id", id).order("position")]);
      return {
        deck: d.data,
        cards: c.data ?? []
      };
    }
  });
  const [idx, setIdx] = reactExports.useState(0);
  const [flipped, setFlipped] = reactExports.useState(false);
  const [stats, setStats] = reactExports.useState({
    known: 0,
    unknown: 0
  });
  const [reviewFailed, setReviewFailed] = reactExports.useState(false);
  const [failedIds, setFailedIds] = reactExports.useState([]);
  const cards = reactExports.useMemo(() => {
    if (!data) return [];
    return reviewFailed ? data.cards.filter((c) => failedIds.includes(c.id)) : data.cards;
  }, [data, reviewFailed, failedIds]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Cargando…" });
  if (!data?.cards.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  const card = cards[idx];
  if (!card) {
    const pct = stats.known + stats.unknown ? Math.round(stats.known / (stats.known + stats.unknown) * 100) : 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "¡Sesión terminada!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "Aciertos: ",
        stats.known,
        " · Fallos: ",
        stats.unknown,
        " · ",
        pct,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
        failedIds.length > 0 && !reviewFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setReviewFailed(true);
          setIdx(0);
          setFlipped(false);
          setStats({
            known: 0,
            unknown: 0
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          " Repasar fallos (",
          failedIds.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/assigned", children: "Volver" }) })
      ] })
    ] });
  }
  const rate = async (result) => {
    await supabase.from("card_reviews").insert({
      student_id: user.id,
      flashcard_id: card.id,
      result
    });
    if (result === "unknown") setFailedIds([...failedIds, card.id]);
    setStats((s) => ({
      ...s,
      [result]: s[result] + 1
    }));
    setFlipped(false);
    setIdx(idx + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/assigned", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-foreground", children: data.deck?.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        idx + 1,
        " / ",
        cards.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4 cursor-pointer select-none transition hover:shadow-[var(--shadow-soft)]", onClick: () => setFlipped(!flipped), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex min-h-[320px] items-center justify-center p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: flipped ? "Reverso" : "Anverso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl leading-snug", children: flipped ? card.back : card.front }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-muted-foreground", children: "Toca para girar" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", onClick: () => rate("unknown"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
        " No la sabía"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", onClick: () => rate("known"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        " La sabía"
      ] })
    ] })
  ] });
}
function Empty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Esta tarjeta aún no tiene fichas." });
}
export {
  StudyDeck as component
};
