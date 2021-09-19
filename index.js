const commander = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const github = require('./lib/github_credentials');
const inquirer = require('./lib/inquirer')
const repo = require('./lib/create_a_repo')

const text = require('./lib/messages');
const { setGitHubCredentials } = require('./lib/github_credentials');


commander
	.command('init')
	.description('Initialize CLI Tool')
	.action(() => {
		clear();
		console.log(
			chalk.white(
				figlet.textSync(text.initText, { horizontalLayout: 'full' })
			)
		);
});

commander
	.command('octocheck')
	.description('Check user GitHub credentials')
	.action(async () => {
		let token = github.getStoredGitHubToken();
		if (!token) {
			await github.setGitHubCredentials();
			token = await github.registerNewToken();
		}
		console.log(token);
	});

commander
	.command('create_repo')
	.description('Create a new repo on Github')
	.action(async() => {
		const getGithubToken = async() => {
			let token = github.getStoredGitHubToken();
			if(token){
				return token;
			}
			await setGitHubCredentials();
			token = await github.registerNewToken();
			return token;
		}

		try {
			const token = await getGithubToken();
			github.gitHubAuth(token);

			const url = await repo.createRemoteRepository();
			await repo.createGitIgnore();
			const complete = await repo.setupRepository(url);
			if(complete){
				console.log(chalk.green('Completed!'));
			}
		} catch (error) {
			if (error) {
				switch (error.status) {
					case 401:
						console.log(chalk.red('Error: Log-in failure'));
						break;
					case 422:
						console.log(chalk.red('Error: Remote repo exists already'));
						break;
					default:
						console.log(error);
						break;
				}
			}
		}
	});
	
commander.parse(process.argv);

if (!commander.args.length) {
	commander.help();
}