DROP DATABASE IF EXISTS superheroes_db;
CREATE DATABASE superheroes_db;

\c superheroes_db;

DROP TABLE IF EXISTS superheroes;

CREATE TABLE superheroes (
    id SERIAL PRIMARY KEY,
	name text NOT NULL,
	real_name text NULL,
	history_text text NULL,
	powers_text text NULL,
	intelligence_score int8 NULL,
	speed_score int8 NULL,
	power_score int8 NULL,
	combat_score int8 NULL,
	superpowers text NULL,
	aliases text NULL,
	place_of_birth text NULL,
	first_appearance text NULL,
	creator text NOT NULL,
	occupation text NULL,
	relatives text NULL,
	gender text NULL,
	type_race text NULL,
	height text NULL,
	weight text NULL,
	img text NULL,
    is_favorite BOOLEAN DEFAULT false, 
    rating float8 CHECK (rating >= 1 AND rating <= 10),
    CONSTRAINT check_both_columns_not_null CHECK ((name IS NOT NULL) OR (real_name IS NOT NULL))
);

-- CREATE TABLE public.superheroes (
--     id SERIAL PRIMARY KEY,
-- 	"name" text NULL,
-- 	real_name text NULL,
-- 	history_text text NULL,
-- 	powers_text text NULL,
-- 	intelligence_score int8 NULL,
-- 	speed_score int8 NULL,
-- 	power_score int8 NULL,
-- 	combat_score int8 NULL,
-- 	superpowers text NULL,
-- 	aliases text NULL,
-- 	place_of_birth text NULL,
-- 	first_appearance text NULL,
-- 	creator text NULL,
-- 	occupation text NULL,
-- 	relatives text NULL,
-- 	gender text NULL,
-- 	type_race text NULL,
-- 	height text NULL,
-- 	weight text NULL,
-- 	img text NULL
-- );