import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DK4TJU2r.mjs";
import { U as Users, T as TrendingUp } from "../_libs/lucide-react.mjs";
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
function StudentsProgress() {
  const data = useQuery({
    queryKey: ["t-students-progress"],
    queryFn: async () => {
      const {
        data: members
      } = await supabase.from("class_members").select("student_id, class_id, classes(name)");
      const studentIds = Array.from(new Set((members ?? []).map((m) => m.student_id)));
      if (studentIds.length === 0) return [];
      const [profilesRes, attemptsRes, reviewsRes] = await Promise.all([supabase.from("profiles").select("id, full_name").in("id", studentIds), supabase.from("quiz_attempts").select("student_id, score, total, finished_at").in("student_id", studentIds), supabase.from("card_reviews").select("student_id, result").in("student_id", studentIds)]);
      const profiles = new Map((profilesRes.data ?? []).map((p) => [p.id, p.full_name]));
      const classesByStudent = /* @__PURE__ */ new Map();
      (members ?? []).forEach((m) => {
        const cls = m.classes;
        const name = Array.isArray(cls) ? cls[0]?.name : cls?.name;
        if (!name) return;
        const arr = classesByStudent.get(m.student_id) ?? [];
        if (!arr.includes(name)) arr.push(name);
        classesByStudent.set(m.student_id, arr);
      });
      return studentIds.map((id) => {
        const attempts = (attemptsRes.data ?? []).filter((a) => a.student_id === id);
        const reviews = (reviewsRes.data ?? []).filter((r) => r.student_id === id);
        const score = attempts.reduce((s, a) => s + a.score, 0);
        const total = attempts.reduce((s, a) => s + a.total, 0);
        return {
          id,
          name: profiles.get(id) || "Alumno",
          classes: classesByStudent.get(id) ?? [],
          attempts: attempts.length,
          pct: total ? Math.round(score / total * 100) : null,
          reviews: reviews.length,
          lastAttempt: attempts.map((a) => a.finished_at).filter(Boolean).sort().pop()
        };
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Progreso de alumnos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Resumen del rendimiento de tus alumnos." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      (data.data ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 p-5 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
            s.id.slice(0, 8),
            "…"
          ] }),
          s.classes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: s.classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground", children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Aciertos", value: s.pct === null ? "—" : `${s.pct}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Intentos", value: s.attempts, sub: `${s.reviews} repasos` })
      ] }) }, s.id)),
      data.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          " Sin alumnos todavía"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Añade alumnos a tus clases desde la sección Clases. Ellos verán su ID al iniciar sesión y te lo compartirán." }) })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold leading-none", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        label,
        sub ? ` · ${sub}` : ""
      ] })
    ] })
  ] });
}
export {
  StudentsProgress as component
};
