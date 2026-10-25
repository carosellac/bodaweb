-- =====================================================================
-- PANEL DE LOS NOVIOS — base de datos (Supabase / Postgres 15+)
-- Se corre UNA vez en el editor SQL del proyecto de Supabase de Boda Web.
--
-- Qué guarda: cada confirmación y cada canción sugerida que mandan los invitados desde la invitación
-- (además del WhatsApp, que sigue llegando igual). Los novios lo ven en /panel/?i=<invitación>&c=<clave>.
--
-- Seguridad:
--   · las dos tablas tienen RLS prendido y NINGUNA política: la clave pública no puede leer ni escribir
--     nada directamente;
--   · los invitados sólo pueden AGREGAR respuestas, y sólo a una invitación que exista (registrar_respuesta);
--   · para LEER hay que tener la clave de esa invitación (ver_panel). La clave se guarda como huella
--     (sha256), nunca tal cual;
--   · crear una invitación lo hace sólo Boda Web, desde el editor SQL (crear_invitacion).
-- =====================================================================

create table if not exists public.invitaciones (
  id          text primary key check (id ~ '^[a-z0-9][a-z0-9-]{2,60}$'),
  nombre      text not null check (char_length(nombre) between 1 and 120),
  clave_hash  text not null,
  creada      timestamptz not null default now()
);

create table if not exists public.respuestas (
  id          bigint generated always as identity primary key,
  invitacion  text not null references public.invitaciones(id) on delete cascade,
  tipo        text not null check (tipo in ('confirmacion', 'cancion')),
  datos       jsonb not null check (jsonb_typeof(datos) = 'object' and octet_length(datos::text) <= 4000),
  creada      timestamptz not null default now()
);
create index if not exists respuestas_invitacion_creada on public.respuestas (invitacion, creada desc);

alter table public.invitaciones enable row level security;
alter table public.respuestas enable row level security;
revoke all on public.invitaciones, public.respuestas from anon, authenticated;

-- ---------- El invitado manda una respuesta ----------
create or replace function public.registrar_respuesta(p_invitacion text, p_tipo text, p_datos jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_tipo not in ('confirmacion', 'cancion') then raise exception 'tipo inválido'; end if;
  if p_datos is null or jsonb_typeof(p_datos) <> 'object' or octet_length(p_datos::text) > 4000 then raise exception 'datos inválidos'; end if;
  if not exists (select 1 from invitaciones where id = p_invitacion) then raise exception 'invitación inexistente'; end if;
  -- Freno contra abusos: una invitación real no recibe 300 respuestas en una hora
  if (select count(*) from respuestas where invitacion = p_invitacion and creada > now() - interval '1 hour') >= 300 then
    raise exception 'demasiadas respuestas, probá más tarde';
  end if;
  insert into respuestas (invitacion, tipo, datos) values (p_invitacion, p_tipo, p_datos);
end;
$$;

-- ---------- Los novios ven sus respuestas (con la clave) ----------
create or replace function public.ver_panel(p_invitacion text, p_clave text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  inv invitaciones%rowtype;
begin
  select * into inv from invitaciones where id = p_invitacion;
  if not found or inv.clave_hash <> encode(sha256(convert_to(coalesce(p_clave, ''), 'UTF8')), 'hex') then
    return null;   -- mismo resultado si no existe o si la clave no es: no se puede averiguar qué invitaciones hay
  end if;
  return jsonb_build_object(
    'nombre', inv.nombre,
    'respuestas', coalesce((select jsonb_agg(jsonb_build_object('tipo', r.tipo, 'datos', r.datos, 'creada', r.creada) order by r.creada desc)
                             from respuestas r where r.invitacion = inv.id), '[]'::jsonb)
  );
end;
$$;

-- ---------- Boda Web da de alta una invitación (sólo desde el editor SQL) ----------
-- Uso:  select crear_invitacion('lucia-y-mateo', 'Lucía y Mateo');
-- Devuelve la clave para armar el link del panel: /panel/?i=lucia-y-mateo&c=<clave>
create or replace function public.crear_invitacion(p_id text, p_nombre text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  clave text := replace(gen_random_uuid()::text, '-', '');
begin
  insert into invitaciones (id, nombre, clave_hash)
  values (p_id, p_nombre, encode(sha256(convert_to(clave, 'UTF8')), 'hex'));
  return clave;
end;
$$;

-- Permisos: el público (clave anónima) sólo puede registrar respuestas y ver un panel con su clave
revoke all on function public.registrar_respuesta(text, text, jsonb) from public, anon, authenticated;
revoke all on function public.ver_panel(text, text) from public, anon, authenticated;
revoke all on function public.crear_invitacion(text, text) from public, anon, authenticated;
grant execute on function public.registrar_respuesta(text, text, jsonb) to anon, authenticated, service_role;
grant execute on function public.ver_panel(text, text) to anon, authenticated, service_role;
grant execute on function public.crear_invitacion(text, text) to service_role;
