const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
      }
    },

    isGitRepository: ()=> {
      if (files.directoryExists('.git')) {
        console.log(chalk.red('Sorry! Can\'t create a new git repo because the directory is already inside a git repo.'));
        process.exit();
        }
      }
  }
