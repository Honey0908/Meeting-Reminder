const Router = require('express').Router;
const { makeCall, handleAttendance, welcome, handleForwardedCall } = require('./handler');


function createRouter(io) {
    const router = new Router();

    router.post('/make-call', async (req, res) => {
        if (!req.body.meetingDetails || !req.body.to) {
            res.send('invalid Meeting details or Contact number');
        }
        res.send(await makeCall(req.body.meetingDetails, req.body.to, req.body.from, res));
    })

    router.post('/call-status', async (req, res) => {
        io.emit('callStatus', req.body.CallStatus);
        res.send(await makeCall(req.body.meetingDetails, req.body.to, req.body.from, res));
    })

    router.post('/handle-gather', async (req, res) => {
        const digit = req.body.Digits;
        if (digit) {
            io.emit('attendance', digit == "1" ? true : false);
            res.type('text/xml');
            res.send(await handleAttendance(digit))
        }
        // io.destroy()
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
            io.emit('recordingUrl', recordingUrl);
            return res.sendStatus(200);
        }
        return res.sendStatus(500);
    });

    return router;
}

module.exports = { createRouter };