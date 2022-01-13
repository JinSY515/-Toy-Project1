--필요한 데이터베이스--
--1. users --
--2. musicals--

CREATE TABLE users (
    userid VARCHAR(16) NOT NULL,
    name VARCHAR(10) NOT NULL,
    password VARCHAR(152) NOT NULL,
    phone CHAR(11) NOT NULL,
    date_joined DATETIME NOT NULL DEFAULT current_timestamp(),
    is_staff TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(userid)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE musicals(
    musical_id INT NOT NULL,
    location VARCHAR(32) NOT NULL,
    period_start DATETIME NOT NULL,
    period_end DATETIME NOT NULL,
    able_age VARCHAR(16) NOT NULL,
    PRIMARY KEY(musical_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE tickets(

)

CREATE TABLE ticket_price(
    id INT NOT NULL,
    seatLevel VARCHAR(3) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE datetable(
    musical_id INT NOT NULL,
    show_date DATE NOT NULL,
    
    casting
    PRIMARY KEY(musical_id, show_date)
)

CREATE TABLE roles(
    musical_id INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,
    PRIMARY KEY(musical_id),
    FOREIGN KEY(musical_id) REFERENCES FROM musicals(musical_id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE actors(
    musical_id INT NOT NULL,
    show_date DATE NOT NULL,
    role_name VARCHAR(20) NOT NULL, 
    actor_name VARCHAR(10) NOT NULL,
    PRIMARY KEY(musical_id, role_name, show_date).
    FOREIGN KEY(musical_id) REFERENCES FROM musicals(musical_id),
    FOREIGN KEY(role_name) REFERENCES FROM roles(role_name),
    FOREIGN KEY(show_date) REFERENCES FROM datetable(show_date)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

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

