USE employee_tracker;

INSERT INTO department (name) VALUES
("Sales"),
("MIS"),
("Finance"),
("Design");

INSERT INTO role (title, salary, department_id) VALUES 
("Sales Rep", 80000, 1),
("Account Manager", 100000, 1),
("Software Engineer", 110000, 2),
("Lead Engineer", 130000, 2),
("Accountant", 90000, 3),
("Accounting Manager", 100000, 3),
("Designer Brand", 85000, 4),
("CDC Director", 115000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Dan", "Miller", 1, null),
("Mark", "Towery", 2, 1),
("Rena", "Capri", 7, 5),
("Tyler", "Dowson", 8, null),
("Chad", "Gilbert", 4, null),
("Joe", "Roegan", 3, 5);


