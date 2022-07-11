const inquirer = require('inquirer');
const { up } = require('inquirer/lib/utils/readline');
const db = require('./db/connection')

var role = {
  title:"Part-time Supevisor",
  salary:"35000",
  department_id:1
}

console.log(role)
// TODO: Create an array of questions for user input


// displays all departments
const veiwAlldepartments = ()=> {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) throw err
        console.table(rows)
      });
}
// displays all employees
const veiwAllEmployees = ()=> {
    const sql = `SELECT * FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) throw err
        console.table(rows)
      });
}
// displays all roles
const veiwAllRoles = ()=> {
    const sql = `SELECT * FROM role`;
  
    db.query(sql, (err, rows) => {
      if (err) throw err
        console.table(rows)
      });
}
const createDepartment = ()=> {
  inquirer
  .prompt([
    {
      name: 'departmentname',
      message: 'Please provide the title of the new department:',
      
    }
  ])
  .then(answers=>addDepartment(answers))
}
const addDepartment = (newDepartmet) =>{
  // insert statement
  const sql = `INSERT INTO department (name)
  VALUES(?);`

  const params = newDepartmet.departmentname;

  db.query(sql,params, (err, rows) => {
    if (err) throw err
      console.table(rows)
    });
  }
const addRole = (roleObj) =>{
  // insert statement role
  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES(?,?,?);`

  const params = [roleObj.title, roleObj.salary, roleObj.department_id];

  db.query(sql,params, (err, rows) => {
    if (err) throw err
      console.table(rows)
    });
  }
const createRole = ()=> {
    inquirer
    .prompt([
      {
        name: 'title',
        message: 'Please provide the title of the new role:',
        
      },
      {
        name: 'salary',
        message: 'Please provide the salary of the new role',
       
      },
      {
        name: 'department_id',
        message: 'Please provide the deparment id of the new role',
       
      },
    ])
    .then(answers=>addRole(answers))
  }
const addEmployee = (employeeObj) =>{
  // insert statement employee
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES(?,?,?,?);`

  const params = [employeeObj.first_name, employeeObj.last_name,employeeObj.role_id, employeeObj.manager_id];

  db.query(sql,params, (err, rows) => {
    if (err) throw err
      console.table(rows)
    });
  }
const createEmployee = ()=> {
  inquirer
  .prompt([
    {
      name: 'first_name',
      message: 'Please provide the first name of the new employee:',
      
    },
    {
      name: 'last_name',
      message: 'Please provide the last name  of the new employee',
     
    },
    {
      name: 'employee_id',
      message: 'Please provide the employee id of the new employee',
     
    },
    {
      name: 'manager_id',
      message: 'Please provide the manager id of the new employee or leave it blank if no manager exist',
     
    },
  ])
  .then(answers=>addEmployee(answers))
}
const updateRole=(newRoleObj)=>{
  const sql = `UPDATE employee SET role_id = ?  
  WHERE id = ?`
const params = [newRoleObj.role_id, newRoleObj.id]


db.query(sql,params, (err, rows) => {
  if (err) throw err
    console.table(rows)
  });
}
const roleSwitch = ()=> {
  veiwAllEmployees()
  veiwAlldepartments()
  inquirer
  .prompt([
    {
      name: 'id',
      message: 'Please provide the id number of the employee your would like to change:',
      
    },
    {
      name: 'role_id',
      message: 'Please provide the new role of the employee',
     
    }
  ])
  .then(answers=>updateRole(answers))

}
const reRunApp = () =>{
  
    return inquirer.prompt([
      {
        type: 'list', 
        // set user response and userOptions
        name: 'reRunOptions',
        message: 'What would you like to do?',
        choices: ['1. Run App again',
                  '2. Exit App '],
      }
    ]).then(answers => {
      if(answers.reRunOptions[0] === "1"){
        console.log('option 1 worked');
        promptUser();
      }
      else if(answers.reRunOptions[0] === "2"){
        console.log('option 2 worked');
        process.exit();
      }
    }
      )
  
}
// returns the users selection 
const promptUser = ()=>{
   return inquirer.prompt([
    {
      type: 'list', 
      // set user response and userOptions
      name: 'userOptions',
      message: 'What would you like to do?',
      choices: ['1. View all departments',
                '2. View all roles',
                '3. View all employees',
                '4. add a department', 
                '5. add a role', 
                '6. add an employee', 
                '7. update an employee role',
                '8. Exit'],
    }
  ])
  .then(answers => {
    if(answers.userOptions[0] === "1"){
      console.log('option 1 worked');
      veiwAlldepartments()
    
    }
    else if(answers.userOptions[0] === "2"){
      console.log('option 2 worked');
      veiwAllRoles();
    
    }
    if(answers.userOptions[0] === "3"){
      console.log('option 3 worked');
      veiwAllEmployees();
     
    }
    if(answers.userOptions[0] === "4"){
      console.log('option 4 worked');
      createDepartment();
     

    }
    if(answers.userOptions[0] === "5"){
      console.log('option 5 worked');
      createRole()
    }
    if(answers.userOptions[0] === "6"){
      console.log('option 6 worked');
      createEmployee();
      
    }
    if(answers.userOptions[0] === "7"){
      console.log('option 7 worked')
      veiwAllEmployees();
      veiwAllRoles();
      roleSwitch();
      
      

    }
    if(answers.userOptions[0] === "8"){
      console.log('option 8 worked')
      process.exit();
    }
    // }else{
    //   console.log('Invalid selection');
    //   promptUser()
    // }

    


    
  });
 
}






//  Function calls
// roleSwitch()
// veiwAlldepartments()
// createRole()
// addRole(role)

// veiwAllRoles()
// veiwAllEmployees()
// addDepartment('PE')
// veiwAlldepartments()



promptUser()



// write queres first
//use work bench
 // 