'use strict';

fetch('/api/users?page=1')
.then(response => response.text())
.then(data => {
	console.log(data);
}).catch(err => {
	console.log('fetch failed:', err);
})