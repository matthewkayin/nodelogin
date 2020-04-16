DROP DATABASE IF EXISTS nodelogin;
CREATE DATABASE nodelogin;
USE nodelogin;
CREATE TABLE users(

    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    displayname VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

INSERT INTO `users`(`username`, `password`, `displayname`)
VALUES  ('marquise', 'Rosew00d', 'Marquise'),
        ('imthejoker', 'baby', 'The Joker, Baby'),
        ('fren', 'password', 'Doggos');
