const Router = require('express').Router;
const { makeCall, handleAttendance, welcome, handleForwardedCall } = require('./handler');
const userSocketMap = {};

function createRouter(io) {

    const router = new Router();

    io.on("connection", (socket) => {
        // getting unique callSid from query parameter
        const callSid = socket.handshake.query.callSid;
        userSocketMap[callSid] = socket.id;

        // Handle when a user disconnects
        socket.on('disconnect', () => {
            console.log(`User disconnected with socket id: ${socket.id}`);
            // Remove the mapping when a user disconnects
            if (callSid) {
                delete userSocketMap[callSid];
            }
        });
    });

    router.post('/make-call', async (req, res) => {
        if (!req.body.meetingDetails || !req.body.to) {
            res.send('invalid Meeting details or Contact number');
        }
        const { meetingDetails, to, from, host_phoneNo } = req.body
        res.send(await makeCall({ meetingDetails, to, from, host_phoneNo }));
    })

    router.post('/call-status', async (req, res) => {
        const callSid = req.body.CallSid;
        const socketId = userSocketMap[callSid];
        if (socketId) {
            io.to(socketId).emit('callStatus', req.body.CallStatus);
        }
        res.send()
    })

    router.post('/handle-gather', async (req, res) => {
        const digit = req.body.Digits;
        const callSid = req.body.CallSid;
        const socketId = userSocketMap[callSid];
        if (digit) {
            if (socketId) {
                io.to(socketId).emit('attendance', digit == "1" ? true : false);
            }
            res.type('text/xml');
            res.send(await handleAttendance(digit))
        }
    })

    router.post('/welcome', (req, res) => {
        res.type('text/xml');
        res.send(welcome())
    })

    router.post('/handle-forward', (req, res) => {
        res.type('text/xml');
        res.send(handleForwardedCall(req.body.DialCallStatus))
    })

    router.post('/handle-voicemail', (req, res) => {
        const recordingUrl = req.body.RecordingUrl;
        const callSid = req.body.CallSid;
        const socketId = userSocketMap[callSid];
        if (recordingUrl) {
            if (socketId) {
                io.to(socketId).emit('recordingUrl', recordingUrl);
            }
            return res.sendStatus(200);
        }
        return res.sendStatus(500);
    });

    return router;
}

module.exports = { createRouter };