'use strict';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const fields = ['rank', 'account', 'class', 'AC'];

function Crawler() {
	this.status = true;
	this.fetchData = async function(URL) {
		try {
			var response = await fetch(URL);
			if (!response.ok) {
				this.status = false;
				return [];
			}
			var body = await response.text();
			var $ = cheerio.load(body);
			var tr = $('tbody tr');
			var users = [];
			tr.each((i, elem) => {
				var data = $(elem).find('td').not('.motto');
				var user = {};
				data.each((j, elem) => {
					user[fields[j]] = $(elem).text();
				});
				user['url'] = $(elem).find('a').attr('href');
				var re = /^(([A-Z]|[a-z])\d\d\d\d\d\d\d\d)/;
				if (user.account.match(re) !== null) {
					// console.log(user.account.slice(0, 3), user.account, user.account.match(re));
					user['year'] = user.account.slice(0, 3);
				}
				users.push(user);
			});
			// console.log('users:', users.length);
			if (users.length == 0) {
				this.status = false;
				return users;
			}
			return users;
		}
		catch (err) {
			console.log('fetch failed:', err);
			this.status = false;
		}
	}
}

exports = module.exports = Crawler;