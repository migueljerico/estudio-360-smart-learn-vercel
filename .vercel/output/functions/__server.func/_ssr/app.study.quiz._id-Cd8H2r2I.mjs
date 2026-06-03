import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { d as Route$1, u as useAuth } from "./router-DjXwSKFg.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, a as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/zod.mjs";
import "../_libs/tailwind-merge.mjs";
function StudyQuiz() {
  const {
    id
  } = Route$1.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    data
  } = useQuery({
    queryKey: ["study-quiz", id],
    queryFn: async () => {
      const q2 = await supabase.from("quizzes").select("title").eq("id", id).single();
      const qs = await supabase.from("questions").select("*, answers(*)").eq("quiz_id", id).order("position");
      return {
        quiz: q2.data,
        questions: qs.data ?? []
      };
    }
  });
  const [attemptId, setAttemptId] = reactExports.useState(null);
  const [idx, setIdx] = reactExports.useState(0);
  const [chosen, setChosen] = reactExports.useState(null);
  const [revealed, setRevealed] = reactExports.useState(false);
  const [score, setScore] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (data?.questions.length && !attemptId && user) {
      (async () => {
        const {
          data: a
        } = await supabase.from("quiz_attempts").insert({
          student_id: user.id,
          quiz_id: id,
          total: data.questions.length
        }).select().single();
        if (a) setAttemptId(a.id);
      })();
    }
  }, [data, attemptId, user, id]);
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Cargando…" });
  if (!data.questions.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Cuestionario vacío." });
  const q = data.questions[idx];
  const total = data.questions.length;
  const done = idx >= total;
  const submit = async () => {
    if (!chosen || !attemptId) return;
    const ans = q.answers.find((a) => a.id === chosen);
    await supabase.from("attempt_answers").insert({
      attempt_id: attemptId,
      question_id: q.id,
      answer_id: ans.id,
      is_correct: ans.is_correct
    });
    if (ans.is_correct) setScore(score + 1);
    setRevealed(true);
  };
  const next = async () => {
    if (idx + 1 >= total) {
      if (attemptId) await supabase.from("quiz_attempts").update({
        score,
        finished_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", attemptId);
      navigate({
        to: "/app/results/$id",
        params: {
          id: attemptId
        }
      });
      return;
    }
    setIdx(idx + 1);
    setChosen(null);
    setRevealed(false);
  };
  if (done) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/assigned", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Salir"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: data.quiz?.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        idx + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: q.prompt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...q.answers].sort((a, b) => a.position - b.position).map((a) => {
        const isChosen = chosen === a.id;
        const showRight = revealed && a.is_correct;
        const showWrong = revealed && isChosen && !a.is_correct;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: revealed, onClick: () => setChosen(a.id), className: cn("flex w-full items-center justify-between rounded-lg border border-border p-3 text-left transition", !revealed && isChosen && "border-primary bg-accent", showRight && "border-success bg-success/10", showWrong && "border-destructive bg-destructive/10"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.text }),
          showRight && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success" })
        ] }, a.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: !revealed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: !chosen, children: "Responder" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: next, children: idx + 1 >= total ? "Ver resultados" : "Siguiente" }) })
    ] }) })
  ] });
}
export {
  StudyQuiz as component
};
