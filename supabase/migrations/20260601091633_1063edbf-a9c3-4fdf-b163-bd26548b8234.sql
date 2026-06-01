
revoke execute on function public.has_role(uuid, app_role) from public, anon;
revoke execute on function public.get_my_role() from public, anon;
revoke execute on function public.is_class_teacher(uuid, uuid) from public, anon;
revoke execute on function public.is_teacher_of_student(uuid, uuid) from public, anon;
revoke execute on function public.student_has_access(uuid, content_type, uuid) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
