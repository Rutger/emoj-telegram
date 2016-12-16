require('./server');

const TelegramBot = require('node-telegram-bot-api');
const uuid = require('uuid');
const emoj = require('emoj');
require('dotenv').config();

const token = process.env.EMOJ_TOKEN;
const bot = new TelegramBot(token, {
	polling: true,
});

function formatEmoji(res) {
	return res.slice(0, 5).join('');
}

bot.on('inline_query', (query) => {
	if (!query.query) {
		bot.answerInlineQuery(query.id, [])
		.catch((err) => {
			console.log(`Something failed (sender: ${query.from.username})`, err);
		});
		return;
	}

	emoj(query.query).then((res) => {
		const title = formatEmoji(res);
		const results = [
			{
				id: uuid(),
				type: 'article',
				thumb_url: 'https://raw.githubusercontent.com/rutger/emoj-telegram/master/icon.png',
				title,
				input_message_content: {
					message_text: title,
				}
			}
		];

		bot.answerInlineQuery(query.id, results)
		.catch((err) => {
			console.log(`Something failed (sender: ${query.from.username})`, err);
		});
	});
});

bot.on('message', (message) => {
	const text = message.text;
	const chatId = message.chat.id;

	if (text.startsWith('/')) {
		const helpText = 'Simply send some text to use this bot! You can also use this service in other conversations by typing `@emojrobot harry potter` for example.';
		bot.sendMessage(chatId, helpText, {
			parse_mode: 'Markdown',
		});
		return;
	}

	emoj(text).then((res) => {
		bot.sendMessage(chatId, formatEmoji(res));
	});
});
