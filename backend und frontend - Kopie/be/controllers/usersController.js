var fs = require('fs');
var data = fs.readFileSync('models/users.json');

let users;
if (data.length > 0) {
    users = JSON.parse(data);
} else {
    users = [];
}

//RESTful API
const getAllUsers = () => {
    return { status: 200, data: users };
}

const createUser = (data) => {
    try {
        const today = new Date();
        let { username, password, email, role, matrikelnr, birthday } = data;

        let validate = userValidation(data);
        if (validate.status !== 200) {
            return { status: validate.status, data: validate.data };
        }

        if (role == 1 || role == "Administrator") {
            return { "status": 404, "data": "Creating Admin Accounts not allowed" };
        } else if (role == 2 || role == "Standard") {
            role = "Standard";
        } else {
            role = "Guest";
        }

        let user = {
            id: users.length ? users[users.length - 1].id + 1 : 0,
            username: username,
            password: password,
            email: email,
            role: role,
            created: today.toISOString()
        }
        users.push(user);
        fs.writeFileSync('models/users.json', JSON.stringify(users, null, 2));
        return { status: 201, data: user };
    } catch (err) {
        return { "status": 404, "data": err };
    }
}

const readUser = (id) => {
    let user = users.find(p => p.id === parseInt(id));
    if (user) {
        return { status: 200, data: user };
    } else {
        return { status: 404, data: "User existiert nicht" };
    }
}

const updateUser = (id, data) => {
    let userIndex = users.findIndex(p => p.id === parseInt(id));
    if (userIndex != -1) {
        let { username, password, email, role, matrikelnr, birthday } = data;

        let validate = userValidation(data);
        if (validate.status !== 200) {
            return { status: validate.status, data: validate.data };
        }

        if (role == 1 || role == "Administrator") {
            role = "Administrator";
        } else if (role == 2 || role == "Standard") {
            role = "Standard";
        } else {
            role = "Guest";
        }

        if (username != undefined) { users[userIndex].username = username; }
        if (password != undefined) { users[userIndex].password = password; }
        if (email != undefined) { users[userIndex].email = email; }
        if (role != undefined) { users[userIndex].role = role; }

        fs.writeFileSync('models/users.json', JSON.stringify(users, null, 2));
        return { "status": 200, "data": users[userIndex] };
    } else {
        /**
         * Update am 10.07.2024
         * By: Dominik Rupprecht
         * Grund: falsche Variable übergeben
         */
        createUser(data);
    }
}

const deleteUser = (id) => {
    let userIndex = users.findIndex(p => p.id === parseInt(id));
    if (userIndex != -1) {
        users.splice(userIndex, 1);
        fs.writeFileSync('models/users.json', JSON.stringify(users, null, 2));
    }
    return { "status": 200, "data": users };
}

//Helpers and additional functions
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const userValidation = (data) => {
    let { username, password, email, role, matrikelnr, birthday } = data;

    if (filterByName(username).status == 200) {
        return { status: 404, data: "Username already exists" };
    }
    if (password.length < 4) {
        return { status: 404, data: "password to short" };
    }
    if (!validateEmail(email)) {
        return { status: 404, data: "Email address not valid" };
    }
    return { status: 200, data: "ok" };
}

const filterByName = (name) => {
    let result = users.filter(user => user.username == name);
    if (result.length > 0) {
        return { "status": 200, "data": result };
    } else {
        return { "status": 404, "data": "No user found" };
    }
}

module.exports = {
    getAllUsers,
    createUser,
    readUser,
    updateUser,
    deleteUser,
    filterByName
}