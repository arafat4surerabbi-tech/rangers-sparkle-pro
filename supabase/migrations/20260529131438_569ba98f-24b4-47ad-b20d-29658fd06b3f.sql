
-- Roles enum and table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins can manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Bookings table
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  preferred_date date not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

grant insert on public.bookings to anon, authenticated;
grant select, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;

alter table public.bookings enable row level security;

create policy "Anyone can submit a booking"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view bookings"
  on public.bookings for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete bookings"
  on public.bookings for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));
