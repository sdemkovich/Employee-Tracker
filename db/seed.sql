USE employeeTracker_db;

INSERT INTO department (name) VALUES
("Sales"),
("Engineering"),
("Finance"),
("Design");

INSERT INTO role (name, salary, department_id) VALUES 
("Sales Rep", 80000, 1),
("Sales Department Manager", 100000, 1),
("Software Engineer", 110000, 2),
("Lead Engineer", 130000, 2),
("Accountant", 90000, 3),
("Accounting Manager", 100000, 3),
("UI/UX Designer", 85000, 4),
("Design Department Manager", 115000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Ron", "Swanson", 1, null),
("Leslie", "Knope", 2, 1),
("April", "Ludgate", 7, 5),
("Andy", "Dwyer", 8, null),
("Ben", "Wyatt", 4, null),
("Tom", "Haverford", 3, 5);


