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
    musical_id CHAR(8) NOT NULL,
    musical_name VARCHAR(16) NOT NULL,
    hall_id CHAR(2) NOT NULL,
    period_start_id CHAR(8) NOT NULL,
    period_end_id CHAR(8) NOT NULL,
    running_time INT NOT NULL,
    able_age VARCHAR(16) NOT NULL,
    price_table_id CHAR(2) NOT NULL,
    PRIMARY KEY(musical_id, period_start_id),
    FOREIGN KEY(hall_id) REFERENCES  concert_hall(hall_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE tickets(
    show_date_id CHAR(8) NOT NULL,
    seat_num CHAR(6) NOT NULL,
    PRIMARY KEY(show_date_id, seat_num),
    FOREIGN KEY(show_date_id) REFERENCES  datetable(show_date_id) ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

--ticket_price의 id는 가격표 종류
CREATE TABLE ticket_price(
    price_table_id CHAR(2) NOT NULL,
    seatLevel VARCHAR(6) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY(price_table_id, seatLevel)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

--show_date_id : YY.MM.DD
--time_id : 회차
CREATE TABLE timetable(
    time_id CHAR(2) NOT NULL,
    time_sess CHAR(5) NOT NULL,
    PRIMARY KEY(time_id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE datetable(
    musical_id CHAR(8) NOT NULL, 
    show_date_id CHAR(8) NOT NULL,
    time_id CHAR(2) NOT NULL,
    PRIMARY KEY(musical_id, show_date_id, time_id),
    FOREIGN KEY(musical_id) REFERENCES musicals(musical_id) ON DELETE CASCADE,
    FOREIGN KEY(time_id) REFERENCES timetable(time_id) ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8;



CREATE TABLE roles(
    musical_id CHAR(8) NOT NULL,
    role_id CHAR(2) NOT NULL,
    role_name VARCHAR(20) NOT NULL,
    PRIMARY KEY(musical_id, role_id, role_name),
    FOREIGN KEY(musical_id) REFERENCES  musicals(musical_id) ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE actors(
    actor_name VARCHAR(10) NOT NULL,
    musical_id CHAR(8) NOT NULL,
    role_id CHAR(2) NOT NULL,
    show_date_id CHAR(8) NOT NULL,
    time_id CHAR(2) NOT NULL,
    PRIMARY KEY(actor_name, musical_id, role_id, show_date_id, time_id),
    FOREIGN KEY(musical_id) REFERENCES musicals(musical_id) ON DELETE CASCADE
    
)ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE concert_hall(
    hall_id CHAR(2) NOT NULL,
    hall_name VARCHAR(16) NOT NULL,
    location VARCHAR(48) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    homepage VARCHAR(50) NOT NULL,
    seat_num INT NOT NULL,
    PRIMARY KEY(hall_id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE seat(
    hall_id CHAR(2) NOT NULL,
    seat_num CHAR(6) NOT NULL,
    seat_available TINYINT NOT NULL,
    ticket_id CHAR(3) NOT NULL,
    PRIMARY KEY(hall_id, seat_num),
    FOREIGN KEY(hall_id) REFERENCES  concert_hall(hall_id) ON DELETE CASCADE,
    FOREIGN KEY(ticket_id) REFERENCES  ticket_price(ticket_id) ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE user_booking(
    id INT NOT NULL AUTO_INCREMENT,
    userid VARCHAR(16) NOT NULL,
    reserv_id 
)

----
INSERT INTO concert_hall VALUES('00', '블루스퀘어 신한카드홀', '서울특별시 용산구 이태원로 294 블루스퀘어(한남동)',
'1544-1591', 'http://www.bluesquare.kr/index.asp',1766);

INSERT INTO musicals VALUES('21008252', '프랑켄슈타인', '00', '21.11.24', '22.02.20', 175, '중학생이상 관람가', '00');

INSERT INTO ticket_price VALUES('00', 'VIP석', 150000);
INSERT INTO ticket_price VALUES('00', 'VIP가변석', 150000);
INSERT INTO ticket_price VALUES('00', 'R석', 130000);
INSERT INTO ticket_price VALUES('00', 'R가변석', 130000);
INSERT INTO ticket_price VALUES('00', 'S석', 100000);
INSERT INTO ticket_price VALUES('00', 'S가변석', 100000);
INSERT INTO ticket_price VALUES('00', 'A석', 70000);
INSERT INTO ticket_price VALUES('00', 'A가변석', 70000);

-- 00이 일반적인 대극장 표 가격

INSERT INTO roles VALUES('21008252','01', '빅터');
INSERT INTO roles VALUES('21008252','02', '앙리');
INSERT INTO roles VALUES('21008252','03', '줄리아');
INSERT INTO roles VALUES('21008252','04', '엘렌');
INSERT INTO roles VALUES('21008252','05', '슈테판');
INSERT INTO roles VALUES('21008252','06', '룽게');

--timetable
INSERT INTO timetable VALUES('01', '14:00');
INSERT INTO timetable VALUES('02', '14:30');
INSERT INTO timetable VALUES('03', '19:00');
INSERT INTO timetable VALUES('04', '19:30');

--datetable
INSERT INTO datetable VALUES('21008252', '22.01.18', '04');
INSERT INTO datetable VALUES('21008252', '22.01.19', '02');
INSERT INTO datetable VALUES('21008252', '22.01.19', '04');
INSERT INTO datetable VALUES('21008252', '22.01.20', '04');
INSERT INTO datetable VALUES('21008252', '22.01.21', '02');
INSERT INTO datetable VALUES('21008252', '22.01.21', '04');
INSERT INTO datetable VALUES('21008252', '22.01.22', '02');
INSERT INTO datetable VALUES('21008252', '22.01.22', '04');

--actors
INSERT INTO actors VALUES('전동석', '21008252', '01', '22.01.19', '02');
INSERT INTO actors VALUES('박은태', '21008252', '02', '22.01.19', '02');
INSERT INTO actors VALUES('이봄소리', '21008252', '03', '22.01.19', '02');
INSERT INTO actors VALUES('서지영', '21008252', '04', '22.01.19', '02');
INSERT INTO actors VALUES('이희정', '21008252', '05', '22.01.19', '02');
INSERT INTO actors VALUES('김대종', '21008252', '06', '22.01.19', '02');

INSERT INTO actors VALUES('민우혁', '21008252', '01', '22.01.19', '04');
INSERT INTO actors VALUES('카이', '21008252', '02', '22.01.19', '04');
INSERT INTO actors VALUES('이봄소리', '21008252', '03', '22.01.19', '04');
INSERT INTO actors VALUES('김지우', '21008252', '04', '22.01.19', '04');
INSERT INTO actors VALUES('이희정', '21008252', '05', '22.01.19', '04');
INSERT INTO actors VALUES('김대종', '21008252', '06', '22.01.19', '04');

INSERT INTO actors VALUES('규현', '21008252', '01', '22.01.20', '04');
INSERT INTO actors VALUES('박은태', '21008252', '02', '22.01.20', '04');
INSERT INTO actors VALUES('해나', '21008252', '03', '22.01.20', '04');
INSERT INTO actors VALUES('서지영', '21008252', '04', '22.01.20', '04');
INSERT INTO actors VALUES('서현철', '21008252', '05', '22.01.20', '04');
INSERT INTO actors VALUES('이정수', '21008252', '06', '22.01.20', '04');

INSERT INTO actors VALUES('전동석', '21008252', '01', '22.01.21', '02');
INSERT INTO actors VALUES('정택운', '21008252', '02', '22.01.21', '02');
INSERT INTO actors VALUES('이봄소리', '21008252', '03', '22.01.21', '02');
INSERT INTO actors VALUES('김지우', '21008252', '04', '22.01.21', '02');
INSERT INTO actors VALUES('이희정', '21008252', '05', '22.01.21', '02');
INSERT INTO actors VALUES('김대종', '21008252', '06', '22.01.21', '02');

INSERT INTO actors VALUES('규현', '21008252', '01', '22.01.21', '04');
INSERT INTO actors VALUES('카이', '21008252', '02', '22.01.21', '04');
INSERT INTO actors VALUES('이봄소리', '21008252', '03', '22.01.21', '04');
INSERT INTO actors VALUES('김지우', '21008252', '04', '22.01.21', '04');
INSERT INTO actors VALUES('이희정', '21008252', '05', '22.01.21', '04');
INSERT INTO actors VALUES('김대종', '21008252', '06', '22.01.21', '04');

INSERT INTO actors VALUES('민우혁', '21008252', '01', '22.01.22', '02');
INSERT INTO actors VALUES('박은태', '21008252', '02', '22.01.22', '02');
INSERT INTO actors VALUES('해나', '21008252', '03', '22.01.22', '02');
INSERT INTO actors VALUES('서지영', '21008252', '04', '22.01.22', '02');
INSERT INTO actors VALUES('서현철', '21008252', '05', '22.01.22', '02');
INSERT INTO actors VALUES('이정수', '21008252', '06', '22.01.22', '02');

INSERT INTO actors VALUES('전동석', '21008252', '01', '22.01.22', '04');
INSERT INTO actors VALUES('정택운', '21008252', '02', '22.01.22', '04');
INSERT INTO actors VALUES('해나', '21008252', '03', '22.01.22', '04');
INSERT INTO actors VALUES('김지우', '21008252', '04', '22.01.22', '04');
INSERT INTO actors VALUES('서현철', '21008252', '05', '22.01.22', '04');
INSERT INTO actors VALUES('이정수', '21008252', '06', '22.01.22', '04');