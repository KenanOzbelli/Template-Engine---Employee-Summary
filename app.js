const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];

const idArray = []
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Engineer, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const init = () => {
    const createMang = () => {

        inquirer.prompt([
            {
                type: "input",
                message: "What is your Manager Name?",
                name: "mName"
            },
            {
                type: "input",
                message: "What is your Manager Id?",
                name: "mId"
            },
            {
                type: "input",
                message: "What is your Manager Email?",
                name: "mEmail"
            },
            {
                type: "input",
                message: "What is your Manager Office Number?",
                name: "mOffice"
            }

        ]).then(function (answers) {
            const manager = new Manager(answers.mName, answers.mId, answers.mEmail, answers.mOffice);
            teamMembers.push(manager);
            idArray.push(answers.mId);
            createTeamMember()
        })
    }
    const addEng = ()=> {
        
        inquirer.prompt([
            {
                type: "input",
                message: "What is your Engineer Name?",
                name: "engName"
            },
            {
                type: "input",
                message: "What is your Engineer Id?",
                name: "engId"
            },
            {
                type: "input",
                message: "What is your Engineer Email?",
                name: "engEmail"
            },
            {
                type: "input",
                message: "What is your Engineer Github Username?",
                name: "engGithub"
            }

        ]).then(function(answers){
            const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engId);
            createTeamMember()
        })

    }
    const addInt = ()=> {
         
        inquirer.prompt([
            {
                type: "input",
                message: "What is your Intern's Name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your Intern's Id?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is your Intern's Email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is your Intern's school?",
                name: "internscho"
            }

        ]).then(function(answers){
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internscho)
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeamMember()
        })
    }
    const createTeamMember = () => {
        inquirer.prompt([
            {
                type: "list",
                message: "What type of team member would you like to add",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ],
                name: "createId"
            }]
        ).then(choice => {
            switch (choice.createId) {
                case "Engineer":
                    addEng();
                    break;
                case "Intern":
                    addInt()
                    break;
                default:
                    buildTeam()
                    console.log("...Created Team, and Saved in the Output Folder!")
            }
        })
    }
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }
    createMang()
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

init();
