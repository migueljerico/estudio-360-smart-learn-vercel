import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea, A as AssignDialog } from "./AssignDialog-Ddc1_LyH.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as Route$2 } from "./router-DjXwSKFg.mjs";
import { A as ArrowLeft, g as Plus, i as Trash2, l as Share2, m as Play, n as Save } from "../_libs/lucide-react.mjs";
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
import "./dialog-DLDX5ALL.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/zod.mjs";
function DeckEditor() {
  const {
    id
  } = Route$2.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [topic, setTopic] = reactExports.useState("");
  const [cards, setCards] = reactExports.useState([{
    front: "",
    back: "",
    position: 0
  }]);
  const [deckId, setDeckId] = reactExports.useState(isNew ? null : id);
  const [assignOpen, setAssignOpen] = reactExports.useState(false);
  const {
    data
  } = useQuery({
    queryKey: ["deck", id],
    enabled: !isNew,
    queryFn: async () => {
      const [d, c] = await Promise.all([supabase.from("decks").select("*").eq("id", id).single(), supabase.from("flashcards").select("*").eq("deck_id", id).order("position")]);
      return {
        deck: d.data,
        cards: c.data ?? []
      };
    }
  });
  reactExports.useEffect(() => {
    if (data?.deck) {
      setTitle(data.deck.title);
      setDescription(data.deck.description ?? "");
      setSubject(data.deck.subject ?? "");
      setTopic(data.deck.topic ?? "");
      setCards(data.cards.length ? data.cards.map((c) => ({
        id: c.id,
        front: c.front,
        back: c.back,
        position: c.position
      })) : [{
        front: "",
        back: "",
        position: 0
      }]);
    }
  }, [data]);
  const save = async () => {
    if (!title.trim()) return toast.error("Pon un título");
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    let currentId = deckId;
    if (!currentId) {
      const {
        data: d,
        error
      } = await supabase.from("decks").insert({
        title,
        description,
        subject,
        topic,
        owner_id: user.id
      }).select().single();
      if (error) return toast.error(error.message);
      currentId = d.id;
      setDeckId(currentId);
    } else {
      await supabase.from("decks").update({
        title,
        description,
        subject,
        topic
      }).eq("id", currentId);
    }
    await supabase.from("flashcards").delete().eq("deck_id", currentId);
    const valid = cards.filter((c) => c.front.trim() && c.back.trim());
    if (valid.length) {
      await supabase.from("flashcards").insert(valid.map((c, i) => ({
        deck_id: currentId,
        front: c.front,
        back: c.back,
        position: i
      })));
    }
    toast.success("Tarjeta guardada");
    if (isNew) navigate({
      to: "/app/decks/$id",
      params: {
        id: currentId
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/library", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: isNew ? "Nueva tarjeta" : "Editar tarjeta" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Verbos irregulares en inglés" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Curso / Asignatura" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subject, onChange: (e) => setSubject(e.target.value), placeholder: "Inglés" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tema" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: topic, onChange: (e) => setTopic(e.target.value), placeholder: "Unidad 3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descripción" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), rows: 2 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold", children: [
          "Tarjetas (",
          cards.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setCards([...cards, {
          front: "",
          back: "",
          position: cards.length
        }]), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Añadir"
        ] })
      ] }),
      cards.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 p-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground", children: [
            "Anverso #",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: c.front, onChange: (e) => setCards(cards.map((x, j) => j === i ? {
            ...x,
            front: e.target.value
          } : x)), rows: 2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Reverso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: c.back, onChange: (e) => setCards(cards.map((x, j) => j === i ? {
            ...x,
            back: e.target.value
          } : x)), rows: 2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setCards(cards.filter((_, j) => j !== i)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
      ] }) }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-4 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-border bg-card/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur", children: [
      deckId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setAssignOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          " Asignar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/study/deck/$id", params: {
          id: deckId
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
          " Vista alumno"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
        " Guardar"
      ] })
    ] }),
    deckId && /* @__PURE__ */ jsxRuntimeExports.jsx(AssignDialog, { open: assignOpen, onOpenChange: setAssignOpen, contentType: "deck", contentId: deckId })
  ] });
}
export {
  DeckEditor as component
};
