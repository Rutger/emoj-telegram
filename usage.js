const fs = require('fs');

const PATH = './stats.json';

// Write how many times the bot was used per day to a file.
module.exports = function() {
	fs.readFile(PATH, 'utf8', function(err, data) {
		let counts = {};
		if (data) {
			counts = JSON.parse(data);
		}

		// Get the date like YYYY-MM-DD
		const date = (new Date()).toISOString().slice(0, 10);

		counts[date] = counts[date] ? counts[date] + 1 : 1;

		fs.writeFile(PATH, JSON.stringify(counts), function(err) {
			if (err) {
				throw err;
			}
		});
	});
}
