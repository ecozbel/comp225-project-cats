import Phaser from 'phaser';


/*
things that have to be stored in a JSON file in order to rebuild the cat in phaser game.
when you instatiate a cat, you would run all the relevant functions that are in SceneA right now.
------------
sprite name : string (all the images are loaded in the game, so this just needs to be a string of the internal name of the sprite)
palette : don't know how this will work.
hat :
shirt :
pants :
shoes :
catlayer : (phaser layer of clothes)
prompts : javascript object from the prompts.JSON, so the text can be displayed.
*/

/*
things a "clothing" class would have.
when you instatiate a clothing item, the constructor could have all those functions that we currently have in SceneA.
---------
sprite name : string
clothing type : int (just an int that would be applied to the enumerator when the JSON is parsed.)
*/


class Cat {

    constructor (name, sprite, hat, shirt, pants, shoes, ) {
        this.name = name; // string
        this.sprite = sprite; // not sure how to store this?



    }




}