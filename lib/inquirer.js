const inquirer = require('inquirer');
const minimist = require('minimist');

const files = require('./files');

module.exports = {
    askGitHubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or e-mail address:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your GitHub username or e-mail address.';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your GitHub password.';
                    }
                }
            }  
        ];
        return inquirer.prompt(questions);
    },

    askIgnoreFiles: (fileList) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select files/folders to ignore:',
                choices: fileList,
                default: ['node_modules']
            }
        ];
        return inquirer.prompt(questions);
    },

    askRepositoryDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));
        const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter name for your repo:',
            default: argv._[0] || files.getCurrentDirectoryBase(), 
            validate: (value) => {
                if(value.length) {
                    return true;
                }
                return 'Please enter unique name for your repo';
            }
        },
        {
            type: 'input',
            name: 'description',
            default: argv._[1] || null,
            message: 'Enter description of this repo'

        },
        {
            type: 'input',
            name: 'visibility',
            message: 'Should this repo be public or private? (Default: public)',
            choices: ['public', 'private'],
            default: 'public'
        }
        ];
    }
    

}