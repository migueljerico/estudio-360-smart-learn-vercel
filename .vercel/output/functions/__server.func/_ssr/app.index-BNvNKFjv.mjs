import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { u as useAuth } from "./router-DjXwSKFg.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DK4TJU2r.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as Plus, B as BookOpen, G as GraduationCap, U as Users, T as TrendingUp, h as Copy } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
function StudentIdBadge({
  userId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
    navigator.clipboard.writeText(userId);
    toast.success("ID copiado");
  }, className: "group flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-left transition hover:border-primary", title: "Comparte este ID con tu profesor para que te añada a su clase", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Tu ID de alumno" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs", children: [
        userId.slice(0, 8),
        "…",
        userId.slice(-4)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary" })
  ] });
}
function DashboardPage() {
  const {
    role,
    user
  } = useAuth();
  return role === "profesor" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TeacherDashboard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(StudentDashboard, { userId: user.id });
}
function TeacherDashboard() {
  const decks = useQuery({
    queryKey: ["t-decks"],
    queryFn: async () => (await supabase.from("decks").select("id,title").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const quizzes = useQuery({
    queryKey: ["t-quizzes"],
    queryFn: async () => (await supabase.from("quizzes").select("id,title").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const classes = useQuery({
    queryKey: ["t-classes"],
    queryFn: async () => (await supabase.from("classes").select("id,name").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const attempts = useQuery({
    queryKey: ["t-attempts"],
    queryFn: async () => (await supabase.from("quiz_attempts").select("id,score,total,finished_at,quiz_id,student_id").order("started_at", {
      ascending: false
    }).limit(8)).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Bienvenido, profesor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Gestiona tu contenido y el progreso de tu clase." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/decks/new", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nueva tarjeta"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/quizzes/new", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nuevo cuestionario"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: BookOpen, label: "Tarjetas", value: decks.data?.length ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: GraduationCap, label: "Cuestionarios", value: quizzes.data?.length ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Clases", value: classes.data?.length ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Intentos recientes", value: attempts.data?.length ?? 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Tu contenido" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          [...(decks.data ?? []).map((d) => ({
            ...d,
            kind: "deck"
          })), ...(quizzes.data ?? []).map((q) => ({
            ...q,
            kind: "quiz"
          }))].slice(0, 8).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.kind === "deck" ? "/app/decks/$id" : "/app/quizzes/$id", params: {
            id: item.id
          }, className: "flex items-center justify-between rounded-lg border border-border p-3 transition hover:bg-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm", children: [
              item.kind === "deck" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-primary" }),
              item.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: item.kind })
          ] }, `${item.kind}-${item.id}`)),
          (decks.data?.length ?? 0) + (quizzes.data?.length ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { text: "Aún no tienes contenido. Crea tu primera tarjeta o cuestionario." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Intentos recientes de tus alumnos" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          (attempts.data ?? []).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Cuestionario · ",
              a.finished_at ? new Date(a.finished_at).toLocaleDateString() : "en curso"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              a.score,
              "/",
              a.total
            ] })
          ] }, a.id)),
          attempts.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { text: "Sin intentos todavía." })
        ] })
      ] })
    ] })
  ] });
}
function StudentDashboard({
  userId
}) {
  const assigned = useQuery({
    queryKey: ["s-assigned"],
    queryFn: async () => {
      const [decks, quizzes] = await Promise.all([supabase.from("decks").select("id,title,subject,topic"), supabase.from("quizzes").select("id,title,subject,topic")]);
      return {
        decks: decks.data ?? [],
        quizzes: quizzes.data ?? []
      };
    }
  });
  const attempts = useQuery({
    queryKey: ["s-attempts", userId],
    queryFn: async () => (await supabase.from("quiz_attempts").select("id,score,total,finished_at").eq("student_id", userId).order("started_at", {
      ascending: false
    }).limit(10)).data ?? []
  });
  const totalScore = (attempts.data ?? []).reduce((s, a) => s + a.score, 0);
  const totalQuestions = (attempts.data ?? []).reduce((s, a) => s + a.total, 0);
  const pct = totalQuestions ? Math.round(totalScore / totalQuestions * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Tu espacio de estudio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sigue aprendiendo. Cada repaso cuenta." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StudentIdBadge, { userId })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: BookOpen, label: "Tarjetas asignadas", value: assigned.data?.decks.length ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: GraduationCap, label: "Cuestionarios asignados", value: assigned.data?.quizzes.length ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Aciertos globales", value: `${pct}%` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Tu contenido asignado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/assigned", children: "Ver todo →" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-2", children: [
        [...(assigned.data?.decks ?? []).map((d) => ({
          ...d,
          kind: "deck"
        })), ...(assigned.data?.quizzes ?? []).map((q) => ({
          ...q,
          kind: "quiz"
        }))].slice(0, 6).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.kind === "deck" ? "/app/study/deck/$id" : "/app/study/quiz/$id", params: {
          id: item.id
        }, className: "group rounded-xl border border-border bg-card p-4 transition hover:shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground", children: [
            item.kind === "deck" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
            item.kind
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display font-semibold group-hover:text-primary", children: item.title }),
          (item.subject || item.topic) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: [item.subject, item.topic].filter(Boolean).join(" · ") })
        ] }, `${item.kind}-${item.id}`)),
        !assigned.data || assigned.data.decks.length + assigned.data.quizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { text: "Tu profesor aún no te ha asignado contenido." }) }) : null
      ] })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold leading-none", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
    ] })
  ] }) });
}
function EmptyState({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: text });
}
export {
  DashboardPage as component
};
