const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'what would you like to do?',
            choices: [
                'view employee list',
                'view department list',
                'view employee roles',
                'add new employee',
                'add new department',
                'add new employee role',
                'update employee role',
                'remove current employee',
                'exit employee tracker'
            ]
        })
        .then(function(answer){
            switch(answer.action) {
                case 'view employee list':
                    viewEmployeeList();
                    break;

                case 'view department list':
                    viewDepartmentList();
                    break;

                case 'view employee roles':
                    viewEmployeeRole();
                    break;

                case 'add new employee':
                    addNewEmployee();
                    break;

                case 'add new department':
                    addNewDepartment();
                    break;

                case 'add new employee role':
                    addNewEmployeeRole();
                    break;

                case 'update employee role':
                    updateEmployeeRole();
                    break;

                case 'remove current employee':
                    removeCurrentEmployee();
                    break;

                case 'exit employee tracker':
                    exitEmployeeTracker();
                    break;
            }
        });
};

function viewEmployeeList() {
   connection.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
            console.table(res);
                runSearch();
   }
)};

function viewDepartmentList() {
    connection.query('SELECT * FROM departments', function(err,res) {
        if (err) throw err;
            console.table(res);
                runSearch();
    }
)};

function viewEmployeeRole() {
    connection.query('SELECT * FROM roles', function(err,res){
        if (err) throw err;
            console.table(res);
                runSearch();
    }
)};