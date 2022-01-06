--필요한 데이터베이스--
--1. users --

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    displayName VARCHAR(16) NOT NULL,
    password VARCHAR(32) NOT NULL,
    date_joined DATETIME NOT NULL,
    PRIMARY KEY(id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;