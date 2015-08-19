# GTA-MP voice chat

GTA-MP-voiceChat is a voice chat package for the GTA V multiplayer modification GTA-MP.

The first version will feature only the server side features because we can not
write the client side part currently.
But we will prepare as much as possible and adapt the client side part when GTA-MP gets released.

## Version

0.3.0

## Installation

  - Type `npm install` in the root directory of this repository
  - Put the whole folder (not content) into the `packages` directory of the STA
  - Check the `config.js` to configure the application
  - Run the STA

## To do

 - GTA-MP client integration (+ remove the testing web server)
 - Code cleanup
 - Rewrite Recorder functions as a ES6 class

## Future Milestones

##### 1.0.0
 - GTA-MP client integration

##### x.x.0
 - Make it more realistic, add voice panning

## Changelog

##### 0.1.0 (09.08.2015)

 - First release
 - Created a global voice chat
 - Added a browser client until GTA-MP is released, before we can not create client side code

##### 0.1.1 (09.08.2015)
 - Removed junk code
 - Fixed voice stuttering

##### 0.1.2 (13.08.2015)
 - Added `networkId` property to the socket to associate the socket with the player

##### 0.2.0 (14.08.2015)
 - The sockets now has a property called `networkId` which contains the network id of the player.
 - You can now define the direct voice chat radius in the `config.js`
 - Added utility functions
   - Added a function to get the player object by a given network id
   - Added a function to check return a players distance of given coordinates
 - Added non-performant way of getting the nearest players + the socket of the nearest players
 - Added volume decreasing depending on the players distance to the speaking player

##### 0.2.1 (14.08.2015)
 - Waffle added a way more performant way to store the sockets and associate them with the player and network id

##### 0.3.0 server side part (19.08.2015)
 - Added a way to calculate from which direction the speaker comes for later 3D emulation
   - This currently only features a 2D way, I didn't included the Y-axis into all these calculations
 - Rewrite of the utility function to determine the distance from the player to the speaker
 - Added ugly named place holder for the Y-axis rotation to the speaker

## Scripts used
 - https://github.com/mattdiamond/Recorderjs

## Thanks to
  - Waffle (GTA-MP.net)
  - Extreme (GTA-MP.net)

##  Bitcoin
If you want to donate me some coffee for further developments, my Bitcoin address is `16w7umTeoJfPzZnDbQtuefrPRssq21jhJ5`

License
----

MIT
