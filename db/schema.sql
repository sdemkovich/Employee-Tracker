DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
    id INT auto_increment NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT auto_increment NOT NULL,
    name VARCHAR(50),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT auto_increment NOT NULL,
    name VARCHAR(50),
    PRIMARY KEY (id)
);