const Router = require('express').Router;
const { makeCall, handleAttendance, welcome, handleForwardedCall } = require('./handler');


function createRouter(socket) {

    const router = new Router();

    router.post('/make-call', async (req, res) => {
        if (!req.body.meetingDetails || !req.body.to) {
            res.send('invalid Meeting details or Contact number');
        }
        const { meetingDetails, to, from, host_phoneNo } = req.body
        res.send(await makeCall({ meetingDetails, to, from, host_phoneNo }));
    })

    router.post('/call-status', async (req, res) => {
        socket.emit('callStatus', req.body.CallStatus);
        res.send()
    })

    router.post('/handle-gather', async (req, res) => {
        const digit = req.body.Digits;
        if (digit) {
            socket.emit('attendance', digit == "1" ? true : false);
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
        if (recordingUrl) {
            socket.emit('recordingUrl', recordingUrl);
            return res.sendStatus(200);
        }
        return res.sendStatus(500);
    });

    return router;
}

module.exports = { createRouter };