// Enable webhook to work for automatic deployment.

const express = require('express');
const app = express();
const spawn = require('child_process').spawn;

app.post('/', function (req, res) {
	res.send('Post');

	const deploy = spawn('./deploy.sh');

	deploy.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	deploy.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	deploy.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
});

app.listen(3001);
