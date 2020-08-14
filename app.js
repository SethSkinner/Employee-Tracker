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
        .then(function(res){
            switch(res.action) {
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
   connection.query('SELECT * FROM employees', function(err, res) {
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

function addNewEmployee() {
    inquirer
        .prompt([
            {
                name: 'f_name',
                type: 'input',
                message: 'Please enter the employees first name.',   
            },
            {
                name: 'l_name',
                type: 'input',
                message: 'Please enter the employees last name.',
            },
            {
                name: 'r_id',
                type: 'input',
                message: 'please enter the role id for employee',
            },
            {
                name: 'm_id',
                type: 'input',
                message: 'please enter the manager id for employee',
            }
        ])
        .then(function(res) {
            connection.query('INSERT INTO employees SET ?',
            {
                f_name: res.f_name,
                l_name: res.l_name,
                r_id: res.r_id, 
                m_id: res.m_id
            },
            function(err) {
                if (err) throw err;
                    console.log('added employee.');
                    runSearch();
            }
            )
        })
    }; 

function addNewDepartment() {
    inquirer
        .prompt({
            name: 'd_name',
            type: 'input',
            message: 'Enter the name of the department you would like to add'
        })
        .then(function(res) {
            connection.query('INSERT INTO departments SET ?',
               {
                   d_name: res.d_name
               }, 
               function(err) {
                   if (err) throw err;
                   console.log('You have added the department.');
                   runSearch();
                }
            )
        })
    }; 

function addNewEmployeeRole() {
    inquirer   
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the employees role.'
            },
            {
                name: 'Salary',
                type: 'input',
                message: 'Enter the Salary of the role.'
            },
            {
                name: 'd_id',
                type: 'input',
                message: 'please enter the id of the department.'
            },
        ]) 
        .then(function(res){
            connection.query('INSERT INTO role SET ?',
                {
                    title: res.title,
                    Salary: res.Salary,
                    d_id: res.department_id
                },
                function(err) {
                    if (err) throw err;
                   console.log('You have added the employee role.');
                   runSearch();
                }
            )
        });
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the id of the employee you would like to update the role of.'
            },
            {
                name: 'r_id',
                type: 'input',
                message: 'enter the id of the employees new role.'
            }
        ])
        .then(function(res) {
            connection.query('UPDATE employees SET r_id = ' + res.r_id + ' WHERE id = ' + res.id,
                function(err,) {
                    if (err) throw err;
                    console.log('you have updated employee with that id.');
                    runSearch();
        })
    })
};

function removeCurrentEmployee() {
    inquirer
        .prompt({
            name: 'id',
            type: 'input',
            message: 'Please enter id of employee you wish to delete.'
        })
        .then(function(res) {
            connection.query('DELETE FROM employees WHERE id = ?', [res.id],
                function(err) {
                    if (err) throw err;
                    console.log('you have deleted employee with that id.');
                    runSearch();
        })
    })
};

function exitEmployeeTracker () {
    console.log('you have closed the application!');
    connection.end();
};