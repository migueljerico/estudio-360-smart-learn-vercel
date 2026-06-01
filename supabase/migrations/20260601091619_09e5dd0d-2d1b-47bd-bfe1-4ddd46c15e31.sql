
-- ========== ENUMS ==========
create type public.app_role as enum ('profesor', 'alumno');
create type public.content_type as enum ('deck', 'quiz');
create type public.review_result as enum ('known', 'unknown');

-- ========== PROFILES ==========
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  created_at timestamptz not null default now()
);

-- ========== USER ROLES ==========
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

-- security-definer role check
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.get_my_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.user_roles where user_id = auth.uid() limit 1
$$;

-- ========== CLASSES ==========
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  teacher_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.class_members (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

-- helper: is teacher of a class
create or replace function public.is_class_teacher(_class_id uuid, _user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes where id = _class_id and teacher_id = _user_id)
$$;

-- helper: is teacher of a student (shares any class)
create or replace function public.is_teacher_of_student(_teacher_id uuid, _student_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.class_members cm
    join public.classes c on c.id = cm.class_id
    where c.teacher_id = _teacher_id and cm.student_id = _student_id
  )
$$;

-- ========== DECKS / FLASHCARDS ==========
create table public.decks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  subject text default '',
  topic text default '',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  front text not null,
  back text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- ========== QUIZZES / QUESTIONS / ANSWERS ==========
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  subject text default '',
  topic text default '',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  prompt text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  text text not null,
  is_correct boolean not null default false,
  position int not null default 0
);

-- ========== ASSIGNMENTS ==========
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  content_type content_type not null,
  content_id uuid not null,
  class_id uuid references public.classes(id) on delete cascade,
  student_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (class_id is not null or student_id is not null)
);

create index on public.assignments (content_type, content_id);
create index on public.assignments (student_id);
create index on public.assignments (class_id);

-- helper: student has access to a piece of content
create or replace function public.student_has_access(_student_id uuid, _type content_type, _content_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.assignments a
    where a.content_type = _type
      and a.content_id = _content_id
      and (
        a.student_id = _student_id
        or (a.class_id is not null and exists (
          select 1 from public.class_members cm
          where cm.class_id = a.class_id and cm.student_id = _student_id
        ))
      )
  )
$$;

-- ========== ATTEMPTS ==========
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score int not null default 0,
  total int not null default 0,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  answer_id uuid references public.answers(id) on delete set null,
  is_correct boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  flashcard_id uuid not null references public.flashcards(id) on delete cascade,
  result review_result not null,
  reviewed_at timestamptz not null default now()
);

-- ========== GRANTS ==========
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select on public.user_roles to authenticated;
grant insert on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
grant select, insert, update, delete on public.classes to authenticated;
grant all on public.classes to service_role;
grant select, insert, update, delete on public.class_members to authenticated;
grant all on public.class_members to service_role;
grant select, insert, update, delete on public.decks to authenticated;
grant all on public.decks to service_role;
grant select, insert, update, delete on public.flashcards to authenticated;
grant all on public.flashcards to service_role;
grant select, insert, update, delete on public.quizzes to authenticated;
grant all on public.quizzes to service_role;
grant select, insert, update, delete on public.questions to authenticated;
grant all on public.questions to service_role;
grant select, insert, update, delete on public.answers to authenticated;
grant all on public.answers to service_role;
grant select, insert, update, delete on public.assignments to authenticated;
grant all on public.assignments to service_role;
grant select, insert, update, delete on public.quiz_attempts to authenticated;
grant all on public.quiz_attempts to service_role;
grant select, insert, update, delete on public.attempt_answers to authenticated;
grant all on public.attempt_answers to service_role;
grant select, insert, update, delete on public.card_reviews to authenticated;
grant all on public.card_reviews to service_role;

-- ========== RLS ==========
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;
alter table public.assignments enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.card_reviews enable row level security;

-- profiles
create policy "own profile select" on public.profiles for select to authenticated using (id = auth.uid());
create policy "teacher sees student profiles" on public.profiles for select to authenticated
  using (public.is_teacher_of_student(auth.uid(), id));
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid());

-- user_roles
create policy "own role select" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "teacher sees student role" on public.user_roles for select to authenticated
  using (public.is_teacher_of_student(auth.uid(), user_id));
create policy "self assign role on signup" on public.user_roles for insert to authenticated with check (user_id = auth.uid());

-- classes
create policy "teacher manages own classes" on public.classes for all to authenticated
  using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());
create policy "student sees own classes" on public.classes for select to authenticated
  using (exists (select 1 from public.class_members cm where cm.class_id = id and cm.student_id = auth.uid()));

-- class_members
create policy "teacher manages class members" on public.class_members for all to authenticated
  using (public.is_class_teacher(class_id, auth.uid()))
  with check (public.is_class_teacher(class_id, auth.uid()));
create policy "student sees own memberships" on public.class_members for select to authenticated
  using (student_id = auth.uid());

-- decks
create policy "owner manages decks" on public.decks for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "student sees assigned decks" on public.decks for select to authenticated
  using (public.student_has_access(auth.uid(), 'deck', id));

-- flashcards (inherit from deck)
create policy "manage flashcards via deck" on public.flashcards for all to authenticated
  using (exists (select 1 from public.decks d where d.id = deck_id and d.owner_id = auth.uid()))
  with check (exists (select 1 from public.decks d where d.id = deck_id and d.owner_id = auth.uid()));
create policy "student sees assigned flashcards" on public.flashcards for select to authenticated
  using (public.student_has_access(auth.uid(), 'deck', deck_id));

-- quizzes
create policy "owner manages quizzes" on public.quizzes for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "student sees assigned quizzes" on public.quizzes for select to authenticated
  using (public.student_has_access(auth.uid(), 'quiz', id));

-- questions
create policy "manage questions via quiz" on public.questions for all to authenticated
  using (exists (select 1 from public.quizzes q where q.id = quiz_id and q.owner_id = auth.uid()))
  with check (exists (select 1 from public.quizzes q where q.id = quiz_id and q.owner_id = auth.uid()));
create policy "student sees assigned questions" on public.questions for select to authenticated
  using (public.student_has_access(auth.uid(), 'quiz', quiz_id));

-- answers
create policy "manage answers via quiz" on public.answers for all to authenticated
  using (exists (
    select 1 from public.questions q join public.quizzes qz on qz.id = q.quiz_id
    where q.id = question_id and qz.owner_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.questions q join public.quizzes qz on qz.id = q.quiz_id
    where q.id = question_id and qz.owner_id = auth.uid()
  ));
create policy "student sees answers of assigned quizzes" on public.answers for select to authenticated
  using (exists (
    select 1 from public.questions q
    where q.id = question_id and public.student_has_access(auth.uid(), 'quiz', q.quiz_id)
  ));

-- assignments
create policy "teacher manages own assignments" on public.assignments for all to authenticated
  using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());
create policy "student sees own assignments" on public.assignments for select to authenticated
  using (
    student_id = auth.uid()
    or (class_id is not null and exists (
      select 1 from public.class_members cm where cm.class_id = class_id and cm.student_id = auth.uid()
    ))
  );

-- quiz_attempts
create policy "student manages own attempts" on public.quiz_attempts for all to authenticated
  using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy "teacher sees student attempts" on public.quiz_attempts for select to authenticated
  using (public.is_teacher_of_student(auth.uid(), student_id));

-- attempt_answers
create policy "student manages own attempt answers" on public.attempt_answers for all to authenticated
  using (exists (select 1 from public.quiz_attempts a where a.id = attempt_id and a.student_id = auth.uid()))
  with check (exists (select 1 from public.quiz_attempts a where a.id = attempt_id and a.student_id = auth.uid()));
create policy "teacher sees student attempt answers" on public.attempt_answers for select to authenticated
  using (exists (
    select 1 from public.quiz_attempts a
    where a.id = attempt_id and public.is_teacher_of_student(auth.uid(), a.student_id)
  ));

-- card_reviews
create policy "student manages own reviews" on public.card_reviews for all to authenticated
  using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy "teacher sees student reviews" on public.card_reviews for select to authenticated
  using (public.is_teacher_of_student(auth.uid(), student_id));

-- ========== AUTO-CREATE PROFILE ON SIGNUP ==========
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  _role app_role;
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));

  _role := coalesce((new.raw_user_meta_data->>'role')::app_role, 'alumno');
  insert into public.user_roles (user_id, role) values (new.id, _role)
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
