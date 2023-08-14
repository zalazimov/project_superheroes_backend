DROP DATABASE IF EXISTS games_db;
CREATE DATABASE games_db;

\c games_db;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
	name text NOT NULL,
	manufacturer text NULL,
	description text NOT NULL,
	image_path text NULL,
    howplay_path text NULL,
	rating float8 NULL,
    min_players int8 NULL,
	price float8 NULL,
    is_favorite BOOLEAN NULL,
	age_for text NULL,
	genre text NULL,
	CONSTRAINT check_both_columns_not_null CHECK (((rating IS NOT NULL) OR (is_favorite IS NOT NULL)))
);