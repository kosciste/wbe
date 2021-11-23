var Song = require('./lib/jasmine_examples/Song');
var Player = require('./lib/jasmine_examples/Player');

let song = new Song('Testsong');
let player = new Player();

player.play(song);

if(player.isPlaying) {
    console.log('Playing: ',player.currentlyPlayingSong.title);
}
