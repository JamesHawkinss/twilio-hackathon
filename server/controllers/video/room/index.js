const { client } = require('../../../helpers/twilio');
const uuid = require('uuid-random');

function createRoom(req, res) { // create a room
    if (!req.params.name) {
        return res.status(406).send({ "result": "expected name" });
    }
    const name = req.params.name;
    const serverSid = req.body.serverSid;
    client.video.rooms.create({ uniqueName: name })
        .then(room => {
            client.chat.services(serverSid)
                .channels
                .create({
                    friendlyName: name + "-text",
                    uniqueName: uuid() + "#voice"
                })
                .catch(err => console.log(err));
            res.send({ "result": "success", room })
        })
        .catch(err => res.send({ "result": "error", "error": err }));
}

function closeRoom(req, res) { // complete (close) a room
    if (!req.params.roomSid) {
        return res.status(406).send({ "result": "expected roomSid" });
    }
    const roomSid = req.params.roomSid;
    client.video.rooms(roomSid)
        .update({ status: 'completed' })
        .then(room => res.send({ "result": "success", room }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRooms(req, res) {
    if (!req.params.status) {
        return res.status(406).send({ "result": "expected status" });
    }
    const status = req.params.status;
    client.video.rooms.list({ status: status })
        .then(rooms => res.send({ "result": "success", rooms }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRoom(req, res) {
    if (!req.params.roomSid) {
        return res.status(406).send({ "result": "expected roomSid" });
    }
    const roomSid = req.params.roomSid;
    client.video.rooms(roomSid)
        .fetch()
        .then(room => res.send({ "result": "success", room }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

module.exports = {
    createRoom,
    closeRoom,
    getRooms,
    getRoom
}