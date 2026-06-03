import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea, C as Checkbox, A as AssignDialog } from "./AssignDialog-Ddc1_LyH.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as Route$3 } from "./router-DjXwSKFg.mjs";
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
function QuizEditor() {
  const {
    id
  } = Route$3.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [topic, setTopic] = reactExports.useState("");
  const [questions, setQuestions] = reactExports.useState([{
    prompt: "",
    answers: [{
      text: "",
      is_correct: true
    }, {
      text: "",
      is_correct: false
    }]
  }]);
  const [quizId, setQuizId] = reactExports.useState(isNew ? null : id);
  const [assignOpen, setAssignOpen] = reactExports.useState(false);
  const {
    data
  } = useQuery({
    queryKey: ["quiz", id],
    enabled: !isNew,
    queryFn: async () => {
      const q = await supabase.from("quizzes").select("*").eq("id", id).single();
      const qs = await supabase.from("questions").select("*, answers(*)").eq("quiz_id", id).order("position");
      return {
        quiz: q.data,
        questions: qs.data ?? []
      };
    }
  });
  reactExports.useEffect(() => {
    if (data?.quiz) {
      setTitle(data.quiz.title);
      setDescription(data.quiz.description ?? "");
      setSubject(data.quiz.subject ?? "");
      setTopic(data.quiz.topic ?? "");
      const qs = data.questions;
      if (qs.length) {
        setQuestions(qs.map((q) => ({
          id: q.id,
          prompt: q.prompt,
          answers: [...q.answers].sort((a, b) => a.position - b.position).map((a) => ({
            id: a.id,
            text: a.text,
            is_correct: a.is_correct
          }))
        })));
      }
    }
  }, [data]);
  const save = async () => {
    if (!title.trim()) return toast.error("Pon un título");
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    let currentId = quizId;
    if (!currentId) {
      const {
        data: q,
        error
      } = await supabase.from("quizzes").insert({
        title,
        description,
        subject,
        topic,
        owner_id: user.id
      }).select().single();
      if (error) return toast.error(error.message);
      currentId = q.id;
      setQuizId(currentId);
    } else {
      await supabase.from("quizzes").update({
        title,
        description,
        subject,
        topic
      }).eq("id", currentId);
    }
    await supabase.from("questions").delete().eq("quiz_id", currentId);
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.prompt.trim()) continue;
      const validAnswers = q.answers.filter((a) => a.text.trim());
      if (validAnswers.length < 2 || !validAnswers.some((a) => a.is_correct)) {
        toast.error(`La pregunta #${i + 1} necesita al menos 2 respuestas y una marcada como correcta`);
        return;
      }
      const {
        data: insertedQ,
        error
      } = await supabase.from("questions").insert({
        quiz_id: currentId,
        prompt: q.prompt,
        position: i
      }).select().single();
      if (error) return toast.error(error.message);
      await supabase.from("answers").insert(validAnswers.map((a, j) => ({
        question_id: insertedQ.id,
        text: a.text,
        is_correct: a.is_correct,
        position: j
      })));
    }
    toast.success("Cuestionario guardado");
    if (isNew) navigate({
      to: "/app/quizzes/$id",
      params: {
        id: currentId
      }
    });
  };
  const updateQ = (i, patch) => setQuestions(questions.map((q, j) => j === i ? {
    ...q,
    ...patch
  } : q));
  const updateA = (qi, ai, patch) => {
    const next = [...questions];
    next[qi] = {
      ...next[qi],
      answers: next[qi].answers.map((a, j) => j === ai ? {
        ...a,
        ...patch
      } : a)
    };
    setQuestions(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/library", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: isNew ? "Nuevo cuestionario" : "Editar cuestionario" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Asignatura" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subject, onChange: (e) => setSubject(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tema" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: topic, onChange: (e) => setTopic(e.target.value) })
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
          "Preguntas (",
          questions.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setQuestions([...questions, {
          prompt: "",
          answers: [{
            text: "",
            is_correct: true
          }, {
            text: "",
            is_correct: false
          }]
        }]), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Añadir"
        ] })
      ] }),
      questions.map((q, qi) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: q.prompt, onChange: (e) => updateQ(qi, {
            prompt: e.target.value
          }), placeholder: `Pregunta ${qi + 1}`, rows: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setQuestions(questions.filter((_, j) => j !== qi)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          q.answers.map((a, ai) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: a.is_correct, onCheckedChange: (v) => updateA(qi, ai, {
              is_correct: !!v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: a.text, onChange: (e) => updateA(qi, ai, {
              text: e.target.value
            }), placeholder: `Respuesta ${ai + 1}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => updateQ(qi, {
              answers: q.answers.filter((_, j) => j !== ai)
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }, ai)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => updateQ(qi, {
            answers: [...q.answers, {
              text: "",
              is_correct: false
            }]
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Respuesta"
          ] })
        ] })
      ] }) }, qi))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-4 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-border bg-card/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur", children: [
      quizId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setAssignOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          " Asignar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/study/quiz/$id", params: {
          id: quizId
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
    quizId && /* @__PURE__ */ jsxRuntimeExports.jsx(AssignDialog, { open: assignOpen, onOpenChange: setAssignOpen, contentType: "quiz", contentId: quizId })
  ] });
}
export {
  QuizEditor as component
};
