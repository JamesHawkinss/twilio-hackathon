const { client } = require('../../../../helpers/twilio');

function getParticipant(req, res) { // get a specific participant of a specific room
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants.get(participant)
        .fetch()
        .then(participant => res.send(participant));
}

function getConnectedParticipants(req, res) { // get all participants connected to a room
    const room = req.params.name;
    var connected = [];
    client.video.rooms(room).participants
        .each({ status: 'connected' }, (participant) => {
            connected.push(participant.identity);
        });
    return res.send(connected);
}

function disconnectParticipant(req, res) { // disconnect a participant from a room
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants(participant)
        .update({ status: 'disconnected' })
        .then(participant => res.send(participant));
}

module.exports = {
    getParticipant,
    getConnectedParticipants,
    disconnectParticipant
}