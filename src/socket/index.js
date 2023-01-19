const redis = require("redis");
const { SportMonks } = require("../services/sportmonks");
const { liveMatchParser } = require("../services/sportmonks/parser");
let redisClient;
const SportApi = new SportMonks();
const sampleData = require('../services/sportmonks/sampleData.json');

let errCount = 0;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect().then(() => {
        console.log("redis connected");
    }).catch((err) => {
        console.log(err);
    });
})();

const startSocketConnection = (server) => {

    const io = require("socket.io")(server, {
        maxHttpBufferSize: 1e8, pingTimeout: 60000,
        cors: {
            origin: true
        }
    });


    io.on('connection', (socket) => {
        console.log("connected: ", socket.id);
        users[socket.id] = socket;

        socket.on('trigger', async (data) => {
            console.log('Triggered')
            try {
                const { status, data: liveMatchData, message } = await SportApi.getLiveScores();
                let response = [];
                if (liveMatchData.length > 0) {
                    response = await liveMatchParser(liveMatchData);
                }
                console.log("response",response)
                // var fs = require('fs');

                // var file = fs.createWriteStream('array.json');
                // file.on('error', function (err) { /* error handling */ });
                // file.write(`${JSON.stringify(liveMatchData)}`)
                // file.end();
                redisClient.set('live_match', JSON.stringify(response));
                io.sockets.emit('trigger', 'changed the data');
            } catch (error) {
                errCount++;
                console.log("Error on live match api ", errCount);
            }
        });

        socket.on('live_match', async (matchId) => {
            let liveMatch;
            let cacheResults = await redisClient.get("live_match");
            if (matchId == "all") {
                liveMatch = cacheResults;
            } else {
                cacheResults = JSON.parse(cacheResults);
                liveMatch = cacheResults.find((match) => match.id == matchId);
                liveMatch = JSON.stringify(liveMatch);
            }
            socket.emit('live_match_data', liveMatch);
        });

        socket.on('disconnect', () => {
            console.log("disconnected: ", socket.id)
            delete users[socket.id];
        });


        socket.on('join-match-chat', async (matchId) => {
            socket.join('match-' + matchId);
            io.sockets.in("match-" + matchId).emit('connectToRoom', "You are in room no. " + matchId);
            let messages = await redisClient.get(`match-${matchId}`);
            if (!messages) messages = [];
            io.sockets.in("match-" + matchId).emit('messages', messages);
        });

        socket.on('send-room-message', async ({ name, message, room, userId, image, isSticker }) => {
            let messages = JSON.parse(await redisClient.get(`${room}`));
            if (!messages) messages = [];
            console.log(messages);
            const msg = JSON.stringify({ name, message, room, userId, image, isSticker });
            messages.push(msg);
            redisClient.set(`${room}`, JSON.stringify(messages));
            redisClient.expire(`${room}`, 1 * 24 * 60 * 60);
            io.sockets.in(room).emit('message', { name, message, userId, image, isSticker });
        });


    });
}

const users = {};

module.exports = {
    startSocketConnection
};