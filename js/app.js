/*
 * Enemies our player must avoid
 */ 
var Enemy = function(x, y, pace) {
    this.x = x; 
    this.y = y + 55;
    this.centered = this.y;
    this.pace = pace;   
    this.step = 101; 
    this.bound = this.step * 5; 
    this.resetPosition = -this.step; 
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    if(this.x < this.bound) {
        this.x += this.pace * dt; // moving enemy forward
    } else {
        this.x = this.resetPosition; // resets enemy to the start
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Player / Hero class
 */
class Hero {
    constructor() {
        this.step = 101; 
        this.jump = 83; 
        this.startX = this.step * 2; 
        this.startY = this.jump * 4 + 55; 
        this.x = this.startX; 
        this.y = this.startY; 
        this.winner = false; 
        this.sprite = 'images/char-boy.png'; 
    }
    // Draws player sprite on current x and y coordinate position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Updating player's x and y property according to input
    handleInput(input) {
        switch(input) {
            case 'left':  
                if (this.x > 0) {
                    this.x -= this.step; 
                }
                break; 
            case 'right':  
                if (this.x < this.step * 4) {
                    this.x += this.step; 
                }
                break; 
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break; 
            case 'down': 
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break; 
        }
    }
    // Resetting the player to the beginning
    reset() {
        this.x = this.startX; 
        this.y = this.startY; 
    }
    // Check for win / loss
    update() {
        // Losing the Game
        for (let enemy of allEnemies) {
            if (this.y === enemy.y &&
                (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                this.reset(); 
            }
            // Winning the game
            if (this.y === 55) {
                this.winner = true; 
            }
        }
    }
}


/*
 * Instantiating players and enemies
 */ 
const player = new Hero(); 
const roach1 = new Enemy(-101, 0, 200); 
const roach2 = new Enemy(-101, 83, 300); 
const roach3 = new Enemy((-101*2.5), 83, 300); 
const roach4 = new Enemy(-101, 166, 150);
const allEnemies = [];
allEnemies.push(roach1, roach2, roach3, roach4);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
