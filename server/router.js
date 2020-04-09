const express = require('express');
const router = express.Router();

const roomController = require('./controllers/video/room');
const participantController = require('./controllers/video/room/participants');
const userController = require('./controllers/user');
const authController = require('./controllers/user/auth');
const serverController = require('./controllers/chat/server');

router.get('/rooms', roomController.getRooms);
router.get('/rooms/completed', roomController.getCompletedRooms);
router.get('/room/:room', roomController.getRoomByName);
router.post('/room/create/:room', roomController.createRoom);
router.patch('/room/:room/close', roomController.closeRoom);

router.get('/room/:room/participant/:participant', participantController.getParticipant);
router.get('/room/:room/connected', participantController.getConnectedParticipants);
router.post('/room/:room/token/create/:identifier', participantController.createAccessToken);
router.patch('/room/:room/participant/:participant', participantController.disconnectParticipant);

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user/create', userController.createUser);
router.delete('/user/:id/delete', userController.deleteUser);

router.post('/user/auth', authController.auth);

router.get('/chat/servers', serverController.getServers);
router.get('/chat/server/:serverSid', serverController.getServer);
router.post('/chat/server/create', serverController.createServer);
router.delete('/chat/server/:serverSid/delete', serverController.deleteServer);

router.get('/', function(req, res) {
    return res.sendStatus(204);
})

module.exports = router;