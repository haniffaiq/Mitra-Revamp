CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE partnership_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE insight_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE merchants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category_id uuid NOT NULL REFERENCES categories(id),
  type_id uuid NOT NULL REFERENCES partnership_types(id),
  logo_url text NOT NULL,
  bep_months integer NOT NULL,
  price_min integer NOT NULL,
  price_max integer,
  rating numeric(2, 1),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES roles(id),
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  password text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_url text,
  category_id uuid REFERENCES insight_categories(id),
  author_id uuid REFERENCES users(id),
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX merchants_slug_idx ON merchants (slug);
CREATE INDEX merchants_category_id_idx ON merchants (category_id);
CREATE INDEX merchants_type_id_idx ON merchants (type_id);
CREATE INDEX merchants_price_min_idx ON merchants (price_min);
CREATE INDEX users_role_id_idx ON users (role_id);
CREATE INDEX insights_slug_idx ON insights (slug);
CREATE INDEX insights_category_id_idx ON insights (category_id);
CREATE INDEX insights_published_at_idx ON insights (published_at);
