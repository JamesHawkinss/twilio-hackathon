/*
 * In this wrapper, a "server" is in fact a service resource on the Twilio side. We're calling it a server for the sake of our project.
 */

const { client } = require('../../../helpers/twilio');
const uuid = require('uuid-random');

function createServer(req, res) {
    if (!req.body.friendlyName) {
        return res.status(406).send({ "result": "expected friendlyName" });
    }
    const friendlyName = req.body.friendlyName;
    client.chat.services.create({
        friendlyName: friendlyName,
    })
    .then(service => {
        client.chat.services(service.sid)
            .channels
            .create({
                friendlyName: "general",
                uniqueName: uuid()
            })
            .catch(err => console.log(err));
        res.send({ "result": "success", service }) 
    })
    .catch(err => res.send({ "result": "error", "error": err }));
}

function getServers(req, res) {
    client.chat.services.list()
        .then(services => res.send({ "result": "success", services }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getServer(req, res) {
    if (!req.params.serverSid) {
        return res.status(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.service(serverSid)
        .fetch()
        .then(service => res.send({ "result": "success", service }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function deleteServer(req, res) {
    if (!req.params.serverSid) {
        return res.status(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.services(serverSid).remove()
        .then(res.send({ "result": "success" }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

module.exports = {
    createServer,
    getServers,
    getServer,
    deleteServer
}