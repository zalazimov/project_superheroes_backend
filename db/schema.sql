-- DROP DATABASE IF EXISTS games_db;
-- CREATE DATABASE games_db;

-- \c games_db;

-- DROP TABLE IF EXISTS games;


-- CREATE TABLE games (
--     id SERIAL PRIMARY KEY,
-- 	name text NOT NULL,
-- 	manufacturer text NULL,
-- 	description text NOT NULL,
-- 	image_path text NULL,
--     howplay_path text NULL,
-- 	rating float8 NULL,
--     min_players int8 NULL,
-- 	price float8 NULL,
--     is_favorite BOOLEAN NULL,
-- 	age_for text NULL,
-- 	genre text NULL,
-- 	CONSTRAINT check_both_columns_not_null CHECK (((rating IS NOT NULL) OR (is_favorite IS NOT NULL)))
-- );

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