// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

  // when enemy moves off screen (to the right) put it to the left of the playing area
  // otherwise increment the enemies x position so it moves to the right
	if (this.x > 780) {
		this.x = -100;
	} else {
		this.x += (Math.floor(Math.random()*500) * dt);
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function( sprite ) {
	this.sprite = sprite;
	this.x = 200;
	this.y = 390;
}

// reset player position if collides with enemy or crosses the stones successfully
Player.prototype.update = function() {
	for (var enemy in allEnemies) {
		if (allEnemies[enemy].x + 99 > this.x + 16 && allEnemies[enemy].x < this.x + 85 && allEnemies[enemy].y === this.y) {
			this.reset();
		}
	}
	
	if (this.y === -10) {
		this.reset();
	}
}

// put player sprite on screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// adjust player's X or Y position(s) based on keyboard input from user
Player.prototype.handleInput = function(key) {
  if (key =='left' && this.x > 0) {            
		  this.x -= 100;
	} else if (key== 'up' && this.y > -10) {             
      this.y -= 80;
	} else if (key == 'right' && this.x < 400) {
      this.x += 100; 
  } else if (key == 'down' && this.y < 390) {
      this.y += 80;
   }
}

// Reset the player's position to its original location
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 390;
}

// Logic for Character selection screen
var SELECTCHARACTER = function() {

  var carousel = document.getElementById('carousel'),
      currentAngle = 0;
  document.getElementById('btn-left').addEventListener('click', () => rotate('-'), false);
  document.getElementById('btn-right').addEventListener('click', () => rotate(''), false);

  // rotate the carousel left or right based on the 'dir' which is determined
  // by which button the user clicked (left or right).
  // Since we have 5 images to choose from: 
  // ... 360deg / 5 = 72deg <<- adjust angle value by +/- 72deg to get the next img in front
  function rotate( dir ) {
    if (!dir) {
      currentAngle = (currentAngle + 72 <= 360) ? currentAngle + 72 : 72;
    } else {
      currentAngle = (currentAngle - 72 >= -360) ? currentAngle - 72: -72;
    }

    // build the rotateY transform string. transform rotates on the updated
    // angle generated previously.
    var transform = "rotateY(" + currentAngle + "deg)";

    // vendor prefixes for 'transform'
    carousel.style.transform = transform;
    carousel.style.webkitTransform = transform;
    carousel.style.mozTransform = transform;
    carousel.style.msTransform = transform;
    carousel.style.oTransform = transform;
  }

  // grab the 'front' character image shown when function is called.
  // the angle is configured to match the rotateY(__deg) value set in style.css,
  // as well as the same number - 360 since the carousel moves in both directions.
  function getCharacter() {
    var character;
    var angle = +(document.getElementById('carousel')
                          .getAttribute('style')      // sprite img container has inline style
                          .match(/rotateY\(-?\d+/)[0] // regex match from number or '-'
                          .substring(8));             // get number from .match result

    // The value of 'angle' determines which character to use
    // default character is 'char-boy.png' which is also 0deg;
    if (angle === -360 || angle === 0 || angle === 360) {
      character = 'images/char-boy.png';
    } else if (angle === -288 || angle === 72) {
      character = 'images/char-princess-girl.png';
    } else if (angle === -216 || angle === 144) {
      character = 'images/char-pink-girl.png';
    } else if (angle === -144 || angle === 216) {
      character = 'images/char-horn-girl.png';
    } else if (angle === -72  || angle === 288) {
      character = 'images/char-cat-girl.png';
    }

    document.getElementById("btn-left").removeEventListener('click', () => {}, false);
    document.getElementById("btn-right").removeEventListener('click', () => {}, false);
    
    return character;
  }

  return { getCharacter: getCharacter }; // make public the getCharacter function
}


// Initate the enemies with their respective starting positions (x, y)
var allEnemies = [
  new Enemy(-450, 230),
  new Enemy(-200, 150),
  new Enemy(-100, 70),
  new Enemy(-600, 160)
];

// Create a player object defaulted to use 'char-boy.png'
// sprite will be overwritten on the Engine's reset method
var player = new Player('images/char-boy.png');

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
