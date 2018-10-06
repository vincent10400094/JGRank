const fetch 	= require('node-fetch');
const cheerio 	= require('cheerio');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const fields = ['rank', 'account', 'class', 'AC', 'url'];

function Crawler() {
	this.success = true;
	this.fetchData = async function(URL) {
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				this.success = false;
				return [];
			}
			const body = await response.text();
			const $ = cheerio.load(body);
			const tr = $('tbody tr');
			const users = [];
			tr.each((i, elem) => {
				var data = $(elem).find('td').not('.motto');
				var user = {};
				data.each((j, elem) => {
					user[fields[j]] = $(elem).text();
				});
				user['url'] = $(elem).find('a').attr('href');
				users.push(user);
			});
			// console.log('users:', users.length);
			if (users.length == 0) {
				this.success = false;
				return users;
			}
			return users;
		}
		catch (err) {
			console.log('fetch failed:', err);
			this.success = false;
		}
	}
}

exports = module.exports = Crawler;