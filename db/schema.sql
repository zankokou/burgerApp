DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
    id int(11) auto_increment not null,
    burger_name VARCHAR(200),
    devoured BOOLEAN default false not null,
    PRIMARY KEY (id)
);