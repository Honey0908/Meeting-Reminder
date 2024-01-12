const Router = require('express').Router;
const { makeCall, handleAttendance, welcome } = require('./handler');

const router = new Router();

router.post('/make-call', async (req, res) => {
    if (!req.body.meetingDetails || !req.body.to) {
        res.send('invalid Meeting details or Contact number');
    }
    res.send(await makeCall(req.body.meetingDetails, req.body.to, req.body.from, res));
})

router.post('/handle-gather', async (req, res) => {
    console.log(req);
    res.type('text/xml');
    res.send(await handleAttendance(req.body.Digits))
})

router.post('/welcome', (req, res) => {
    res.type('text/xml');
    res.send(welcome())
})

module.exports = router;