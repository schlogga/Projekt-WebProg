var fs = require('fs');
var data = fs.readFileSync('models/equipments.json');

let equipments;
if (data.length > 0) {
    equipments = JSON.parse(data);
} else {
    equipments = [];
}

let userController = require('./usersController')

function handleFiles(fileInput) {
    let file = fileInput;
    file.mv('public/uploads/' + file.name);
    return '/uploads/' + file.name;
}

const getAllEquipments = () => {
    return { status: 200, data: equipments };
}

const createEquipment = (equip) => {
    let { articlenumber, title, description, count, userid } = equip.body;
    if (userController.readUser(userid).status !== 200) {
        return { status: 404, data: "user does not exists" };
    }
    try {
        let filename = '';
        if (equip.files) {
            filename = handleFiles(equip.files.file);
        }
        let equipment = {
            id: equipments.length ? equipments[equipments.length - 1].id + 1 : 0,
            articlenumber: articlenumber,
            title: title,
            pic: filename,
            description: description,
            count: count,
            userid: userid
        }
        equipments.push(equipment);
        fs.writeFileSync('models/equipments.json', JSON.stringify(equipments, null, 2));
        return { status: 201, data: equipment };
    } catch (err) {
        return { status: 404, data: err };
    }
}

const readEquipment = (id) => {
    let equipment = equipments.find(p => p.id === parseInt(id));
    if (equipment) {
        return { status: 200, data: equipment };
    } else {
        return { status: 404, data: "equipment existiert nicht" };
    }
}


const updateEquipment = (id, equip) => {
    let equipmentIndex = equipments.findIndex(p => p.id === parseInt(id));
    /**
     * Update am 10.07.2024
     * By: Dominik Rupprecht
     * Grund: falsche Variable übergeben
     */
    let { articlenumber, title, description, count, userid } = equip.body;
    if (userController.readUser(userid).status !== 200) {
        return { status: 404, data: "user does not exists" };
    }

    if (equipmentIndex != -1) {
        let filename = equipments[equipmentIndex].pic;
        /**
         * Update am 10.07.2024
         * By: Dominik Rupprecht
         * Grund: falsche Variable übergeben
         */
        if (equip.files) {
            filename = handleFiles(equip.files.file);
        }
        equipments[equipmentIndex].pic = filename;

        if (articlenumber != undefined) { equipments[equipmentIndex].articlenumber = articlenumber; }
        if (title != undefined) { equipments[equipmentIndex].title = title; }
        if (description != undefined) { equipments[equipmentIndex].description = description; }
        if (count != undefined) { equipments[equipmentIndex].count = count; }
        if (userid != undefined) { equipments[equipmentIndex].userid = userid; }

        fs.writeFileSync('models/equipments.json', JSON.stringify(equipments, null, 2));
        return { status: 200, data: equipments[equipmentIndex] };
    } else {
        /**
         * Update am 10.07.2024
         * By: Dominik Rupprecht
         * Grund: falsche Variable übergeben
         */
        createEquipment(equip);
    }
}

const deleteEquipment = (id) => {
    let equipmentIndex = equipments.findIndex(p => p.id === parseInt(id));
    if (equipmentIndex != -1) {
        equipments.splice(equipmentIndex, 1);
        fs.writeFileSync('models/equipments.json', JSON.stringify(equipments, null, 2));
    }
    return { status: 200, data: equipments };
}

module.exports = {
    getAllEquipments,
    createEquipment,
    readEquipment,
    updateEquipment,
    deleteEquipment
}