const inquirer = require("inquirer");
const db = require("./server_db");
const Query = require("./lib/Query");
const questions = require("./lib/Questions");
const cTable = require("console.table");

// set variables for table instances
let employeeQuery = Query.employeeQuery;
let departmentQuery = Query.departmentQuery;
let roleQuery = Query.roleQuery;
let QueryClass = Query.Query;

init();

function init() {
    // find column values
    findDeleteVals();
    findColumnVals();
    inquirer.prompt(questions.toDoQuestion).then(data => {
        switch (data.toDoType) {
            case "View all Employees":
                employeeQuery.viewTable();
                break;
            case "View all Departments":
                departmentQuery.viewTable();
                break;
            case "View all Roles":
                roleQuery.viewTable();
                break;
            case "Add Employee":
                employeeQuery.addToTable();
                break;
            case "Add Department":
                departmentQuery.addToTable();
                break;
            case "Add Role":
                roleQuery.addToTable();
                break;
            case "Remove Employee":
                employeeQuery.deleteFromTable();
                break;
            case "Remove Department":
                departmentQuery.deleteFromTable();
                break;
            case "Remove Role":
                roleQuery.deleteFromTable();
                break;
            case "Update Employee Role":
                employeeQuery.updateRole();
                break;
            case "Update Employee Manager":
                employeeQuery.updateManager();
                break;
            case "View all Employees by Manager":
                viewByManager();
                break;
            default:
                db.end();
        }
        })
        .catch(err => {
            if (err) throw err;
        });
};

// view table method
QueryClass.prototype.viewTable = function() {
    db.query(this.joinQuery, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        init();
    });
};

// delete method
QueryClass.prototype.deleteFromTable = function () {
    let choices = this.deleteQuestion.choices;
    let type = this.table;

    inquirer.prompt(this.deleteQuestion).then(data => {
        let deleteVal;
        
        if (this.table === "employee") {
            let name = Object.values(data)[0];
            deleteVal = name.split(" ")[0];
        } else {
            deleteVal = Object.values(data);
        };

        // delete from database
        db.query(`DELETE FROM ${this.table} WHERE ${this.columns[0]}=?;`,[deleteVal], function (err, res) {
            if (err) throw err;
            console.log(`\n${type} deleted!\n`);

            // delete from choices array
            for (var i = 0; i < choices.length; i++) {
                if (choices[i] == deleteVal) {
                    choices.splice(i, 1);
                };
            };

            findDeleteVals();
            init();
        });
    });
};

// update employee role
employeeQuery.updateRole = function() {
    inquirer.prompt(questions.updateEmpQ).then(data => {

        // set user response to variables
        let { updateEmployee, updateRole } = data;
        let fullName = updateEmployee.split(" ");

        // query from role table to correlate employee.role_id with role name
        db.query(`SELECT * FROM role`, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                if (updateRole === res[i].name) {

                    // update employee role
                    db.query(`UPDATE employee SET role_id=${res[i].id} WHERE first_name="${fullName[0]}" AND last_name="${fullName[1]}";`, function(err, res) {
                        if (err) throw err;
                        console.log(`\nEmployee Role Updated!\n`)
                        init();
                    });
                };
            };
        });
    });
};

employeeQuery.updateManager = function () {
    inquirer.prompt(questions.updateEmpManager).then(data => {

        // set user response to variables - split names
        let { updateEmpName, updateEmpManager } = data;
        let fullManName = updateEmpManager.split(" ");
        let fullName = updateEmpName.split(" ");
        let managerID;

        // find manager id in employees array
        db.query(`SELECT * FROM employee`, function(err, result) {
            if (err) throw err;

            for (var i = 0; i < result.length; i++) {
                if (fullManName[0] == result[i].first_name && fullManName[1] == result[i].last_name) {
                    managerID = result[i].id;
                };
            };

            // update based on manager id
            db.query(`UPDATE employee SET manager_id=${managerID} WHERE first_name="${fullName[0]}" AND last_name="${fullName[1]}";`, function (err, res) {
                if (err) throw err;
                console.log(`\nEmployee Manager Updated!\n`)
                init();
            });
        });
    });
};

// employee add to table
employeeQuery.addToTable = function () {
    let table = this.table;
    let columns = this.columns;
    let params = [];

    this.askQuestions().then(data => {
        params.push(Object.values(data)[0]);
        params.push(Object.values(data)[1]);

        // find role name from role table, based on employee.role_id
        db.query(`SELECT * FROM role`, function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                if (Object.values(data)[2] == res[i].name) {
                    params.push(res[i].id);
                };
            };

            let managerName = Object.values(data)[3]
            let nameArr = managerName.split(" ");

            // find manager name from employee table based on employee.manager_id
            db.query(`SELECT * FROM employee`, function(err, result) {
                if (err) throw err;

                for (var i = 0; i < result.length; i++) {
                    if (nameArr[0] == result[i].first_name && nameArr[1] == result[i].last_name) {
                        params.push(result[i].id)
                    };
                };

                // insert values into table
                db.query(`INSERT INTO ${table} (${columns}) VALUES (?);`, [params], function (err, res) {
                    if (err) throw err;
                    console.log(`\nNew ${table} added!\n`);
                    init();
                });
            });
        });
    });
};

departmentQuery.addToTable = function () {
    this.askQuestions().then(data => {
        let params = Object.values(data);
        let table = this.table;
        db.query(`INSERT INTO ${this.table} (${this.columns}) VALUES (?);`,[params], function (err, res) {
            if (err) throw err;
            console.log(`\nNew ${table} added!\n`);
            init();
        });
    });
};

roleQuery.addToTable = function () {
    let columns = this.columns;
    let params = [];

    this.askQuestions().then(data => {
        params.push(Object.values(data)[0]);
        params.push(Object.values(data)[1]);

        // find department name from department table, based on role.department_id
        db.query(`SELECT * FROM department`, function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                if (Object.values(data)[2] == res[i].name) {
                    params.push(res[i].id);
                };
            };

            // insert new role into role table
            db.query(`INSERT INTO role (${columns}) VALUES (?);`, [params], function (err, res) {
                if (err) throw err;
                console.log(`\nNew role added!\n`);
                init();
            });
        });
    });
};

// view employees by manager
function viewByManager() {
    db.query(
        `SELECT CONCAT_WS(" ", m.first_name, m.last_name) AS manager, CONCAT_WS(" ", e.first_name, e.last_name) AS employee
        FROM employee e
        INNER JOIN employee m ON m.id = e.manager_id
        ORDER BY manager;`,
        function(err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("\n");
            init();
        });
};

// find column values for delete dropdown, call at init
function findDeleteVals() {
    roleQuery.findColVals("name", roleQuery.deleteQuestion.choices);
    departmentQuery.findColVals("name", departmentQuery.deleteQuestion.choices);
    employeeQuery.findColVals("first_name, last_name", employeeQuery.deleteQuestion.choices);
};

// find column values for dropdown, call at init
function findColumnVals() {
    roleQuery.findColVals("name", questions.roleArr);
    departmentQuery.findColVals("name", questions.departmentArr);
    employeeQuery.findColVals("first_name, last_name", questions.employeeArr);
};
