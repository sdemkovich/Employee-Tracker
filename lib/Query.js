const questions = require("./Questions");
const inquirer = require("inquirer");
const db = require("../server_db");

// create table/query class
class Query {
    constructor(table, questions, columns) {
        this.table = table;
        this.questions = questions;
        this.columns = columns;
        this.deleteQuestion = {
            type: "list",
            name: `delete${this.table}`,
            message: `Which ${this.table} would you like to delete?`,
            choices: []
        };
    };

    // ask questions to add new instance to table
    askQuestions() {
        return inquirer.prompt(this.questions);
    };

    // find column values for inquirer questions
    findColVals(colNames, arr) {
        let obj = this;
        db.query(`SELECT ${colNames} FROM ${this.table}`, function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                if (obj.table === "employee") {
                    let first = Object.values(res[i])[0];
                    let last = Object.values(res[i])[1];
                    let fullName = first + " " + last;
                    if (!arr.includes(fullName)) {
                        arr.push(fullName);
                    };
                } else {
                    let val = Object.values(res[i])[0];
                    if (!arr.includes(val)) {
                        arr.push(val);
                    };
                };

                for (var j = 0; j < arr.length; j++) {
                    if (Object.values(res[i]).join(" ") != arr[i]) {
                        arr.splice(i, 1);
                    };
                };
            };
        });
    };
};

// new table query instances;
const employeeQuery = new Query("employee", questions.addEmployeeQs, ["first_name", "last_name", "role_id", "manager_id"]);
const departmentQuery = new Query("department", questions.addDepartmentQs, ["name"]);
const roleQuery = new Query("role", questions.addRoleQs, ["name", "salary", "department_id"]);

employeeQuery.joinQuery = 
    `SELECT e.id, e.first_name, e.last_name, role.name as title, role.salary, department.name as department, CONCAT_WS(" ", m.first_name, m.last_name) AS manager
    FROM employee e
    LEFT JOIN employee m ON m.id = e.manager_id
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`;


roleQuery.joinQuery = 
    `SELECT role.id, role.name, role.salary, department.name as department
    FROM role
    INNER JOIN department
    WHERE role.department_id = department.id;`;

departmentQuery.joinQuery = `Select * FROM department`;

// export instances
module.exports = {Query, employeeQuery, departmentQuery, roleQuery};