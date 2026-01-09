-- DDL

CREATE DATABASE IF NOT EXISTS KMS;
USE KMS;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL ,
    email VARCHAR(100) NOT NULL ,
    passwordVARCHAR(255) NOT NULL,
    role INT DEFAULT 2,
)

SELECT * FROM users;

INSERT INTO KMS.users
(id, email, password, `role`)
VALUES(0, 'admin@kms.com', 'password', 2);

