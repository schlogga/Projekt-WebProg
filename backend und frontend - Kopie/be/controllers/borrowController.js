var fs = require('fs');
var data = fs.readFileSync('models/borrows.json');

let borrows;
if (data.length > 0) {
    borrows = JSON.parse(data);
} else {
    borrows = [];
}

let userController = require('./usersController')
let equipmentController = require('./equipmentController')

function checkBorrow(bor) {
    let {userid, equipmentids, start, end} = bor;

    if(userController.readUser(userid).status !== 200) {
        return { status: 404, data: "user does not exists" };
    }
    equipmentids.forEach(e => {
        if(equipmentController.readEquipment(e).status !== 200) {
            return { status: 404, data: "equipment does not exists" };
        }
    });

    let startDate, endDate;
    try {
        startDate = Date.parse(start);
        endDate = Date.parse(end);
        if(!startDate || !endDate) {
            return { status: 404, data: "Date format error" };
        } else if(endDate<startDate) {
            return { status: 404, data: "Borrow end must be after borrow start" };
        }
    } catch (err) {
        return { status: 404, data: err };
    }
    return { status: 200, data: "" };
}

const getAllBorrows = () => {
    console.log(equipmentController.readEquipment(0).data.count)
    return { status: 200, data: borrows };
}

const createBorrow = (bor) => {
    let {userid, equipmentids, start, end} = bor;

    let check = checkBorrow(bor);
    if(check.status !== 200) {
        return { status: check.status, data: check.data};
    }

    try {
        let borrow = {
            id: borrows.length ? borrows[borrows.length - 1].id + 1 : 0,
            userid: userid,
            equipmentids: equipmentids,
            start: start,
            end: end
        }
        borrows.push(borrow);
        fs.writeFileSync('models/borrows.json', JSON.stringify(borrows, null, 2));
        return { status: 201, data: borrow };
    } catch (err) {
        return { status: 404, data: err };
    }
}

const readBorrow = (id) => {
    let borrow = borrows.find(p => p.id === parseInt(id));
    if (borrow) {
        return { status: 201, data: borrow };
    } else {
        return { status: 404, data: "Borrow existiert nicht" };
    }
}

const updateBorrow = (id, bor) => {
    let borrowIndex = borrows.findIndex(p => p.id === parseInt(id));
    let {userid, equipmentids, start, end} = bor;

    let check = checkBorrow(bor);
    if(check.status !== 200) {
        return { status: check.status, data: check.data};
    }

    if (borrowIndex != -1) {
        if (userid != undefined) { borrows[borrowIndex].userid = userid; }
        if (equipmentids != undefined) { borrows[borrowIndex].equipmentids = equipmentids; }
        if (start != undefined) { borrows[borrowIndex].start = start; }
        if (end != undefined) { borrows[borrowIndex].end = end; }

        fs.writeFileSync('models/borrows.json', JSON.stringify(borrows, null, 2));
        return { status: 200, data: borrows[borrowIndex] };
    } else {
        /**
         * Update am 10.07.2024
         * By: Dominik Rupprecht
         * Grund: falsche Variable übergeben
         */
        createBorrow(bor);
    }
}

const deleteBorrow = (id) => {
    let borrowIndex = borrows.findIndex(p => p.id === parseInt(id));
    if (borrowIndex != -1) {
        borrows.splice(borrowIndex, 1);
        fs.writeFileSync('models/borrows.json', JSON.stringify(borrows, null, 2));
    }
    return { status: 200, data:borrows };
}

module.exports = {
    getAllBorrows,
    createBorrow,
    readBorrow,
    updateBorrow,
    deleteBorrow
}