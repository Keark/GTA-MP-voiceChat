/**
* @overview Utility file, contains helpful functions
* @author Jannis 'Cludch' Lehmann
* @copyright (c) Cludch
* @license See LICENSE file
*/

'use strict';

let utility = module.exports;

/**
* Returns the player object with the given network id
* @param  {number} networkId The network id of a player
* @return {Player} Returns the player object if found, else returns null
*/
utility.getPlayer = (networkId) => {
    let player;
    // Iterate through every connect player and compare the network id
    for(let tempPlayer of gtamp.players) {
        if(tempPlayer.networkId === networkId) {
            player = tempPlayer;
            break;
        }
    }
    return player;
};

/**
* Returns the direction in which the speaker is
* Pure math
* @param  {Player} player player object
* @param  {Player} speaker speaker player object
* @return {number} 0-359
*/
utility.playerRotationToSpeaker = (player, speaker) => {
    let playerCoords = {x: Math.floor(player.position.x), y: Math.floor(player.position.y), z: Math.floor(player.position.z)};
    let speakerCoords = {x: Math.floor(speaker.position.x), y: Math.floor(speaker.position.y), z: Math.floor(speaker.position.z)};
    let rotation = 0;

    // First check if the player is on he same x or z level as the speaker
    if(playerCoords.x === speakerCoords.x && playerCoords.z === playerCoords.z) {
        rotation = 0;
    } else if(playerCoords.x === speakerCoords.x) {
        if(playerCoords.z > speakerCoords.z) {
            rotation = 180;
        } else {
            rotation = 0;
        }
    } else if(playerCoords.z === speakerCoords.z) {
        if(playerCoords.x > speakerCoords.x) {
            rotation = 90;
        } else {
            rotation = 270;
        }
    } else {
        // The player is not on the same x- or z-axis so we need to calculate the rotation
        let x = playerCoords.x - speakerCoords.x;
        let z = playerCoords.z - speakerCoords.z;

        let tangensAlpha = Math.tan(z / x);
        let alpha =  Math.atan(tangensAlpha);

        // Check in which quadrant the player is when the speaker is the origin
        if(playerCoords.x < speakerCoords.x && playerCoords.z < speakerCoords.z) {
            // first
            rotation = alpha;
        } else if(playerCoords.x > speakerCoords.x && playerCoords.z < speakerCoords.z) {
            // second
            rotation = 90 + alpha;
        } else if(playerCoords.x > speakerCoords.x && playerCoords.z > speakerCoords.z) {
            // third
            rotation = 90 - alpha;
        } else if(playerCoords.x < speakerCoords.x && playerCoords.z > speakerCoords.z) {
            // fourth
            rotation = 360 - (90 - alpha);
        }

        if(rotation >= 360) {
            rotation -= 360;
        }

        return rotation + player.rotation.x;
    }
};

/**
* Returns the players distance to a point if the player is in a given range
* @param  {Player} player player object
* @param  {Player} speaker speaker player object
* @param  {number} range the range in meters
* @return {number} returns number if in range, else false
*/
utility.playerDistanceToSpeaker = (player, speaker, range) => {
    let playerCoords = {x: Math.floor(player.position.x), y: Math.floor(player.position.y), z: Math.floor(player.position.z)};
    let speakerCoords = {x: Math.floor(speaker.position.x), y: Math.floor(speaker.position.y), z: Math.floor(speaker.position.z)};

    let coords = {x: playerCoords.x - speakerCoords.x, y: playerCoords.y - speakerCoords.y, z: playerCoords.z - speakerCoords.z};

    // calculate the hypotenuse of a triangle with the x and z coordinates
    let firstHypotenuse = Math.sqrt(coords.x * coords.x + coords.z + coords.z);

    // A new triangle with the first hypotenuse and the y coordinates
    // Calucate whose hypotenuse to get the distance
    let secondHypotenuse = Math.sqrt(firstHypotenuse * firstHypotenuse + coords.y + coords.y);

    return secondHypotenuse > range ? secondHypotenuse : false;
};
