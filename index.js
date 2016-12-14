const TelegramBot = require('node-telegram-bot-api');
const uuid = require('uuid');
const emoj = require('emoj');
require('dotenv').config();

const token = process.env.EMOJ_TOKEN;
const bot = new TelegramBot(token, {
	polling: true,
});

bot.on('inline_query', (query) => {
	emoj(query.query).then((res) => {
		const title = res.slice(0, 5).join('');
		const results = [
			{
				id: uuid(),
				type: 'article',
				thumb_url: 'https://raw.githubusercontent.com/indri-indri/emoj-telegram/master/thumb.png',
				title,
				input_message_content: {
					message_text: title,
				}
			}
		];

		bot.answerInlineQuery(query.id, results)
		.then((res) => {
			console.log('something good happened', res);
		})
		.catch((err) => {
			console.log('something bad happened', err);
		});
	});
});
