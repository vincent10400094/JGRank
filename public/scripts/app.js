'use strict';

const app = {
    setting: {
        limit: 50
    },
    page: 1,
    users: [],
    class: [],
    year: [],
    URL:'https://judgegirl.csie.org/'
}

app.updateView = function(data) {
	console.log('udate view');
	console.log(data);
    data.map((user, i) => {
        let new_row = `<tr id="#tr${i}">
						<td>${app.setting.limit*(app.page-1)+i+1}</td>
						<td><a href="${app.URL+user.url}">${user.account}</a></td>
						<td>${user.AC}</td>
						<td>${user.class}</td>
						</tr>`;
        if (app.users.length == 0) {
            $('tbody').append(new_row);
        } else if (users[i] != user) {
            $(`#tr${i}`).replaceWith(new_row);
            users[i] = user;
        }
    });
}

app.getUsers = function() {
    fetch(`/api/users/`).then(response => response.json()).then(data => {
        app.updateView(data);
    }).catch(err => {
        console.log('fetch failed:', err);
    });
}

window.onload = function() {
	app.getUsers();
}