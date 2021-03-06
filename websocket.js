/**
* @overview Websocket class, which initializes a new websocket used for audio streaming
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

let config = require('./config');
let utility = require('./utility');

module.exports = class WebSocket {
    /**
     * Starts the socket and websocket on a given port
     * @param  {number} port websocket port
     * @return {void}
     */
    constructor(port) {
        // Validate the port
        if(typeof port !== 'number') {
            port = 8080;
        }

        // Start the websocket server
        let io = require('socket.io')(port);
        console.log(`Successfully started the websocket on port ${port}`);


        io.on('connection', function(socket) {
            socket.on('audioData', function(data) {
                let player = utility.getPlayer(socket.networkId);
                // Should be ALWAYS false
                if(typeof player === 'undefined') {
                    return;
                }

                const players = gtamp.players;

                for(let i = 0; i < players.length; i++) {
                    const tempPlayer = players[i];

                    // Check if the player is in range of the speaking player
                    let playerDistanceToSpeaker = utility.playerDistanceToSpeaker(tempPlayer, socket.player, config.directChatRadius);

                    if(typeof playerDistanceToSpeaker !== 'number') {
                        // not in range because it returned false
                        return;
                    }

                    // Get the direction where the speaker is
                    let playerDirectionToSpeaker = utility.playerDirectionToSpeaker(tempPlayer, socket.player);

                    if(typeof playerRotationToSpeaker !== 'number') {
                        return;
                    }

                    tempPlayer.socket.emit('audioData', {data: data.data, rotationToSpeaker: {ground: playerDirectionToSpeaker, yAxis: 0}, volume: playerDistanceToSpeaker / config.directChatRadius});
                }
            });

            // Like a global voice chat
            // Temporary only for web testing the voice chat in general
            socket.on('web audioData', function(data) {
                socket.broadcast.emit('web audioData', {data: data.data, rotationToSpeaker: {ground: 0, yAxis: 0}, volume: 1});
            });

            socket.on('set networkId', function(networkId) {
                let tempPlayer = utility.getPlayer(networkId);
                socket.networkId = networkId;
                tempPlayer.socket = socket;
            });
        });
    }
};
