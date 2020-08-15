// will hold role names and department names from database columns
let roleArr = [];
let departmentArr = [];
let employeeArr = [];

// what would you like to do question
const toDoQuestion = {
    type: "list",
    name: "toDoType",
    message: "What would you like to do?",
    choices: ["View all Employees", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View all Roles", "Add Role", "Remove Role", "View all Departments", "Add Department", "Remove Department", "Nothing, I'm done"]
};

// questions to add employee
const addEmployeeQs = [
    {
        type: "input",
        name: "employeeFirstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?"
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "employeeRole",
        message: "What is the employee's role?",
        choices: roleArr
    },
    {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager? ",
        choices: employeeArr
    }
];

// update employee role questions
const updateEmpQ = [
    {
        type: "list",
        name: "updateEmployee",
        message: "Which employees' role do you want to update? ",
        choices: employeeArr
    },
    {
        type: "list",
        name: "updateRole",
        message: "What do you want to update their role to? ",
        choices: roleArr
    }
];

// update employee manager questions
const updateEmpManager = [
    {
        type: "list",
        name: "updateEmpName",
        message: "Which employees' manager do you want to update? ",
        choices: employeeArr
    },
    {
        type: "list",
        name: "updateEmpManager",
        message: "Who is their manager? ",
        choices: employeeArr
    }
];

// questions to add department
const addDepartmentQs = {
    type: "input",
    name: "departmentName",
    message: "What department would you like to add?"
};

// questions to add new role
const addRoleQs = [
    {
        type: "input",
        name: "roleName",
        message: "What role would you like to add? ",
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary for this role? "
    },
    {
        type: "list",
        name: "departmentName",
        message: "What department does this role belong to? ",
        choices: departmentArr
    }
];

// export questions
module.exports = {toDoQuestion, addEmployeeQs, addDepartmentQs, addRoleQs, updateEmpQ, updateEmpManager, employeeArr, roleArr, departmentArr};