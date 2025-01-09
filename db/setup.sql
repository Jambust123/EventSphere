DROP DATABASE IF EXISTS events_db_test;
DROP DATABASE IF EXISTS events_db;

CREATE DATABASE events_db_test;
CREATE DATABASE events_db;

\c events_db_test

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE events_id_seq RESTART WITH 1;

\c events_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE events_id_seq RESTART WITH 1;