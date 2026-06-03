import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as Plus, B as BookOpen, G as GraduationCap, h as Copy, i as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function LibraryPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const decks = useQuery({
    queryKey: ["library-decks"],
    queryFn: async () => (await supabase.from("decks").select("id,title,subject,topic,created_at,flashcards(count)").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const quizzes = useQuery({
    queryKey: ["library-quizzes"],
    queryFn: async () => (await supabase.from("quizzes").select("id,title,subject,topic,created_at,questions(count)").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const dupDeck = useMutation({
    mutationFn: async (id) => {
      const {
        data: src
      } = await supabase.from("decks").select("*").eq("id", id).single();
      const {
        data: cards
      } = await supabase.from("flashcards").select("front,back,position").eq("deck_id", id);
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      const {
        data: newDeck,
        error
      } = await supabase.from("decks").insert({
        title: `${src.title} (copia)`,
        description: src.description,
        subject: src.subject,
        topic: src.topic,
        owner_id: user.id
      }).select().single();
      if (error) throw error;
      if (cards?.length) {
        await supabase.from("flashcards").insert(cards.map((c) => ({
          ...c,
          deck_id: newDeck.id
        })));
      }
      return newDeck.id;
    },
    onSuccess: () => {
      toast.success("Tarjeta duplicada");
      qc.invalidateQueries({
        queryKey: ["library-decks"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const delDeck = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("decks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tarjeta eliminada");
      qc.invalidateQueries({
        queryKey: ["library-decks"]
      });
    }
  });
  const delQuiz = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("quizzes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Cuestionario eliminado");
      qc.invalidateQueries({
        queryKey: ["library-quizzes"]
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Biblioteca" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Todo tu contenido en un solo lugar." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate({
          to: "/app/decks/new"
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Tarjeta"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: () => navigate({
          to: "/app/quizzes/new"
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Cuestionario"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "decks", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "decks", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-2 h-4 w-4" }),
          "Tarjetas"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "quizzes", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "mr-2 h-4 w-4" }),
          "Cuestionarios"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "decks", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
        (decks.data ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group transition hover:shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/decks/$id", params: {
            id: d.id
          }, className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold group-hover:text-primary", children: d.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              [d.subject, d.topic].filter(Boolean).join(" · ") || "Sin tema",
              " · ",
              d.flashcards?.[0]?.count ?? 0,
              " fichas"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => dupDeck.mutate(d.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm("¿Eliminar tarjeta?")) delDeck.mutate(d.id);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }) }, d.id)),
        decks.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { text: "Aún no tienes tarjetas." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "quizzes", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
        (quizzes.data ?? []).map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group transition hover:shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/quizzes/$id", params: {
            id: q.id
          }, className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold group-hover:text-primary", children: q.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              [q.subject, q.topic].filter(Boolean).join(" · ") || "Sin tema",
              " · ",
              q.questions?.[0]?.count ?? 0,
              " preguntas"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
            if (confirm("¿Eliminar cuestionario?")) delQuiz.mutate(q.id);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
        ] }) }, q.id)),
        quizzes.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { text: "Aún no tienes cuestionarios." })
      ] }) })
    ] })
  ] });
}
function Empty({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground", children: text });
}
export {
  LibraryPage as component
};
