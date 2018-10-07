'use strict';

const URL = 'https://judgegirl.csie.org/';

const limit = 50;
var page = 2;

fetch(`/api/users/year/B07?page=${page}`)
.then(response => response.json())
.then(data => {
	data.map((data, i) => {
		console.log(data);
		let new_row = 	`<tr>
							<td>${limit*(page-1)+i+1}</td>
							<td><a href="${URL+data.url}">${data.account}</a></td>
							<td>${data.AC}</td>
							<td>${data.class}</td>
						</tr>`;
		$('tbody').append(new_row);
	});
}).catch(err => {
	console.log('fetch failed:', err);
});