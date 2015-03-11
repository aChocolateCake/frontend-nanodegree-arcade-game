// static y positions to use for bug generation
var posY = [60,142,225];

// gets random from posY
var randomY = function(){
    return posY[Math.floor(Math.random()*posY.length)];
};
// array of enemy images
var enemyImages = ['images/enemy-bug.png','images/enemy-snail.png'];

// gets random enemy image
var randomEnemy = function(){
    return enemyImages[Math.floor(Math.random()*enemyImages.length)];
};

// enemy class. enemies our player must avoid
var Enemy = function() {
    this.sprite = randomEnemy();
    this.x = -50;
    this.y = randomY();
    this.speed = Math.floor(Math.random() * 300) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //collision detection. TODO: switch collision to player instead?
    if(((this.x + 100 >= player.x) && (this.x <= player.x + 75)) && ((this.y + 65 >= player.y) && (this.y <= player.y + 65))){
        player.resetPos();
    }

// moves enemy to beginning again if at end of playable area 
    if (this.x < 550){
        this.x += (this.speed * dt);   
    } else if (this.x > 550){
        this.x = -50;
        this.y = randomY();
        }
    };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class. This class requires an update(), render() and a handleInput() method
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
};

// spawns enemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// spawns player
var player = new Player();

// Update player movement
Player.prototype.update = function(dt) {
    // checks if player has hit water
    if(this.y <= 10){
        this.resetPos();
    }
};

// checks for win scenerio (player hits water)
Player.prototype.win = function(){
    if(this.y <= 10){
        this.resetPos();
    }
};

// renders the player image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// resets player position
Player.prototype.resetPos = function() {
  this.x = 200;
  this.y = 400;
};

// player movement
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'up' && this.y > 10) {
        this.y -= 85;
    }
    if (keyPress === 'down' && this.y < 400) {
        this.y += 85;
    }
    if (keyPress === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 100;
    }
};

// listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});