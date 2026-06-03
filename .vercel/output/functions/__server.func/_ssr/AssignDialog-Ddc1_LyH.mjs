import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DekdCuEE.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DLDX5ALL.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Check } from "../_libs/lucide-react.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
function AssignDialog({ open, onOpenChange, contentType, contentId }) {
  const qc = useQueryClient();
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const classes = useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => (await supabase.from("classes").select("id,name")).data ?? []
  });
  const existing = useQuery({
    queryKey: ["assignments", contentType, contentId],
    queryFn: async () => (await supabase.from("assignments").select("*").eq("content_type", contentType).eq("content_id", contentId)).data ?? [],
    enabled: open
  });
  reactExports.useEffect(() => {
    if (existing.data) setSelected(new Set(existing.data.filter((a) => a.class_id).map((a) => a.class_id)));
  }, [existing.data]);
  const save = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("assignments").delete().eq("content_type", contentType).eq("content_id", contentId).eq("teacher_id", user.id);
      if (selected.size) {
        await supabase.from("assignments").insert(
          [...selected].map((class_id) => ({ teacher_id: user.id, content_type: contentType, content_id: contentId, class_id }))
        );
      }
    },
    onSuccess: () => {
      toast.success("Asignación actualizada");
      qc.invalidateQueries({ queryKey: ["assignments"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Asignar a clases" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      (classes.data ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Crea una clase primero desde el panel de Clases." }),
      (classes.data ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-md border border-border p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: selected.has(c.id), onCheckedChange: (v) => {
          const next = new Set(selected);
          if (v) next.add(c.id);
          else next.delete(c.id);
          setSelected(next);
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "cursor-pointer", children: c.name })
      ] }, c.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => save.mutate(), disabled: save.isPending, children: "Guardar" })
    ] })
  ] }) });
}
export {
  AssignDialog as A,
  Checkbox as C,
  Textarea as T
};
