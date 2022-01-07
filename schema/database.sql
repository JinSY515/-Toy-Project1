--필요한 데이터베이스--
--1. users --
--2. musicals--

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userid VARCHAR(16) NOT NULL,
    name VARCHAR(10) NOT NULL,
    password VARCHAR(24) NOT NULL,
    phone CHAR(11) NOT NULL,
    date_joined DATETIME NOT NULL DEFAULT current_timestamp(),
    is_staff TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE musicals(
    musical_id 
)

CREATE TABLE tickets(

)

CREATE TABLE ticket_price(
    id INT NOT NULL,
    seatLevel VARCHAR(3) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE datetable(

)

CREATE TABLE timetable(

)

CREATE TABLE concert_hall(

)

CREATE TABLE seat(

)

CREATE TABLE user_booking(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
)

