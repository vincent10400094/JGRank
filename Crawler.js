const fetch 	= require('node-fetch');
const cheerio 	= require('cheerio');

const fields = ['rank', 'account', 'class', 'AC', 'url'];

function Crawler(URL) {
	this.URL = URL;
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
	this.updateData = async function() {
		var page = 1;
		var data = [];
		while (this.success) {
			// console.log(URL + page.toString());
			data = data.concat(await this.fetchData(URL+page.toString()))
			page ++;
		}
		console.log('fetch completed, pages:', page);
		return data;
	}
}

exports = module.exports = Crawler;