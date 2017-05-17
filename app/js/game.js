// TODO Add score text on top of boards and ammo sprites 
// beneath board to keep track of bullets left

Battleship.GameState.spawnEnemyBoard = function(board) {
  this.BOARD_COLS = 10; //Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = 10; //Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.cells = this.game.add.group();

  // resetting score when hitting the respective ship
  this.cells.ship2 = 0;
  this.cells.ship3 = 0;
  this.cells.ship4 = 0;
  this.cells.ship5 = 0;
  this.cells.ship6 = 0;

  // sets enemy ships visibility to false for enemy board
  this.enemyShips.ship2.placed = false;
  this.enemyShips.ship3.placed = false;
  this.enemyShips.ship4.placed = false;
  this.enemyShips.ship5.placed = false;
  this.enemyShips.ship6.placed = false;

  for (var col = 0; col < this.BOARD_COLS; col++) {
    for (var row = 0; row < this.BOARD_ROWS; row++) {
      var cell = this.cells.create((col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 64), 'cell', 0);
      cell.anchor.setTo(0.5, 0.5);
      cell.inputEnabled = true;
      cell.enemyContact = 0; // var used to represent successful hit
      cell.marker = board.matrix[row][col];
      this.shipPlacement(this.enemyShips, cell, cell.marker, false, board.index);
      cell.posX = cell.x;
      cell.posY = cell.y;
      // check to see if there is a marker in cell
      cell.hasEnemy = cell.marker > 0;
      // click events
      cell.events.onInputDown.add(this.selectCell, this);
      cell.events.onInputUp.add(this.unselectCell, this);
    }
  }
};

// checks to see if player sank any enemy battleships
Battleship.GameState.sunkEnemyBattleship = function(cell) {
    // check to see if all markers of the enemy have been hit
    switch (cell.enemyContact)
    {
        case 2:
            this.cells.ship2 += cell.enemyContact;
            if (this.cells.ship2 === 4) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship2.location.visible = true;
                this.enemyShips.ship2.sunken = true;
                this.game.data.playerScore += 4;
            }
        break;

        case 3:
            this.cells.ship3 += cell.enemyContact;
            if (this.cells.ship3 === 9) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship3.location.visible = true;
                this.enemyShips.ship3.sunken = true;
                this.game.data.playerScore += 9;
            }
        break;

        case 4:
            this.cells.ship4 += cell.enemyContact;
            if (this.cells.ship4 === 16) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship4.location.visible = true;
                this.enemyShips.ship4.sunken = true;
                this.game.data.playerScore += 16;
            }
        break;

        case 5:
            this.cells.ship5 += cell.enemyContact;
            if (this.cells.ship5 === 25) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship5.location.visible = true;
                this.enemyShips.ship5.sunken = true;
                this.game.data.playerScore += 25;
            }
        break;

        case 6:
            this.cells.ship6 += cell.enemyContact;
            if (this.cells.ship6 === 36) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship6.location.visible = true;
                this.enemyShips.ship6.sunken = true;
                this.game.data.playerScore += 36;
            }
        break;
    }

    // checks if enemy lost
    if (this.enemyShips.ship2.location.visible === true && this.enemyShips.ship3.location.visible === true && this.enemyShips.ship4.location.visible === true && this.enemyShips.ship5.location.visible === true && this.enemyShips.ship6.location.visible === true) {
        setTimeout (function(){
            Battleship.game.data.loser = "enemy";
            Battleship.GameState.enemyShips.ship2.location.visible = false;
            Battleship.GameState.enemyShips.ship3.location.visible = false;
            Battleship.GameState.enemyShips.ship4.location.visible = false;
            Battleship.GameState.enemyShips.ship5.location.visible = false;
            Battleship.GameState.enemyShips.ship6.location.visible = false;
        }, 750);
    }
};

Battleship.GameState.shootBullet = function() {
  // Enforce a short delay between shots by recording
  // the time that each bullet is shot
  if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
  if(this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
  this.lastBulletShotAt = this.game.time.now;

  // get dead bullet from the pool
  var bullet = this.bulletPool.getFirstDead();

  // If there aren't any bullets available then don't shoot
  if (bullet === null || bullet === undefined) return;

  // Revive the bullet
  // This makes the bullet "alive"
  bullet.revive();

  // Bullets will kill themselves when they leave world bounds
  bullet.checkWorldBounds = true;
  bullet.outOfBoundsKill = true;

  bullet.reset(this.gun.x, this.gun.y);
  bullet.rotation = this.gun.rotation;

  // Shoot bullet in the given coordinates
  bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
  bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;

  this.cannonShot = this.add.audio('shoot');
  this.cannonShot.play();

  if (this.game.data.turn === "player") {
    this.updateAmmo();
  } else if (this.game.data.turn === "enemy"){
    this.updateEnemyAmmo();
  }

  this.reservedBullets -= 1;
};

Battleship.GameState.shootCannon = function() {
  this.gun.play('kaboom');
};

Battleship.GameState.updateAmmo = function() {
  var ammo = this.ammo.getChildAt(this.reservedBullets - 1);

  ammo.visible = false;
};

// Update method is called every frame
Battleship.GameState.update = function() {
  //Aim the gun at mouse pointer
  
  if (!this.game.isReady) return;

  if (this.game.data.turn == "player") {
    // sets gun rotation relative to mouse pointer
    this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
  } else if (this.game.data.turn == "enemy"){
    if (!this.game.data.isShooting) {
      // if the enemy is playing and is currently NOT shooting, simulate shooting
      this.simulateShooting(this.playerCells);
    }
  }

  // collision method determined by who is playing
  if (this.game.data.turn == "player") {
    // triggers change of text of GameOverState to match the player's victory
    this.GameOverPlayer();
    this.checkPlayerCollision();
  } else if (this.game.data.turn == "enemy") {
    // otherwise the player loses
    this.GameOverEnemy();
    this.checkEnemyCollision();
  }
};

Battleship.GameState.crashingWaves = function() {
  var waveSprites = this.oceanWaves.getFirstDead();

  if (!waveSprites) {
    waveSprites = this.oceanWaves.create(this.game.world.centerX, this.game.height - 105, 'waves', 0);
    waveSprites.anchor.setTo(0.5);
    waveSprites.height = 20;

    var animation = waveSprites.animations.add('smoothWaves', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 18, false);
    animation.killOnComplete = true;

    this.oceanWaves.add(waveSprites);
  } 

  waveSprites.revive();
  waveSprites.animations.play('smoothWaves');

  return waveSprites;
};

Battleship.GameState.getExplosion = function(cell, x, y) {
  var explosion = this.explosionGroup.getFirstDead();

  if (explosion === null) {
    explosion = this.game.add.sprite(0, 0, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);

    var animation = explosion.animations.add('boom', [0, 0, 1, 2, 3], 60, false);
    animation.killOnComplete = true;

    this.explosionGroup.add(explosion);
  }

  explosion.revive();

  explosion.x = x;
  explosion.y = y;

  explosion.angle = this.game.rnd.integerInRange(0, 360);

  explosion.animations.play('boom');

  return explosion;
};

Battleship.GameState.getSplash = function(cell, x, y) {
  var splash = this.splashGroup.getFirstDead();

  if (splash === null) {
    splash = this.game.add.sprite(0, 0, 'splash');
    splash.anchor.setTo(0.5, 0.5);

    var animation = splash.animations.add('bigSplash', [ 0, 1, 1, 2, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 11, 11], 32, false);
    animation.killOnComplete = true;

    this.splashGroup.add(splash);
  }

  splash.revive();

  splash.x = x;
  splash.y = y;

  splash.width = 64;
  splash.height = 72;

  splash.angle = this.game.rnd.integerInRange(0, 45);

  splash.animations.play('bigSplash');

  return splash;
};

Battleship.GameState.getHitLocation = function (target,cell, x, y) {
//get the first dead explosion from the explosionGroup
    var hit = target === "player" ? this.hitGroup.getFirstDead() : this.hitEnemyGroup.getFirstDead();

    //if there aren't any available, create a new one
    if( hit === null)
    {
        hit = this.game.add.sprite(0, 0, 'fire', 0);
        hit.anchor.setTo(0.5, 0.5);
        hit.animations.add('flames', [ 0, 1, 2, 3, 4 ], 14, true);

        // add cell sprite to the group
        if(target === "player") {
          this.hitGroup.add(hit);
        } else {
          this.hitEnemyGroup.add(hit);
        }   
    }

    hit.revive();

    //move the explosion to the given coordinates
    hit.x = x + 3;
    hit.y = y - 10;

    hit.width = 33;
    hit.height = 60;
    hit.angle = 15;

    hit.animations.play('flames');

    // Return the explosion itself in case we want to do anything else with it
    return hit;
};

Battleship.GameState.shipSmoke = function (target, cell, x, y) {
//get the first dead explosion from the explosionGroup
    var smoke = target === "player" ? this.enemySmokeGroup.getFirstDead() : this.playerSmokeGroup.getFirstDead();

    if( smoke === null ) {
      smoke = this.game.add.sprite(0, 0, 'smoke', 0);
      smoke.anchor.setTo(0.5);
      smoke.animations.add('smoking', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 30, true);

      if (target === "player") {
        this.enemySmokeGroup.add(smoke);
      } else {
        this.playerSmokeGroup.add(smoke);
      }
    }

    smoke.revive();

    smoke.x = x + 5;
    smoke.y = y - 26;

    smoke.angle = this.game.rnd.integerInRange(15, 30);
    smoke.alpha = 0.85;
    smoke.width = 44;
    smoke.height = 80;

    smoke.animations.play('smoking');

    return smoke;

};

Battleship.GameState.selectCell = function(cell) {
  // change the look to emphasize selected cell
  cell.height = 68;
  cell.width = 68;
  cell.tint = 0x7F0B0A;
  
  // enemy grabbing cell and starting the shoot bullet method
  if(cell.frame === 0 && this.game.data.turn == "enemy") {
      // shoot bullet at selected cell from the simulated shooting method
      this.shootBullet();
      this.shootCannon();
      // selected cell physics
      this.game.physics.enable(cell, Phaser.Physics.ARCADE);
      cell.body.immovable = true;
      cell.body.allowGravity = false;
      if (cell.hasEnemy) {
        cell.enemyContact = cell.marker;
        cell.marker = 0;
      }
      // player shoots at cell as long as mouse pointer hovers over it
    } else if (cell.input.pointerOver && cell.frame === 0 && this.game.data.turn == "player" && this.reservedBullets > 0) {
    // shoot bullet if touching or in bounds of cell
    this.shootBullet();
    this.shootCannon();
    // selected cell physics
    this.game.physics.enable(cell, Phaser.Physics.ARCADE);
    cell.body.immovable = true;
    cell.body.allowGravity = false;
    // checks to see if cell is populated
    if (cell.hasEnemy) {
      // sets enemyContact to marker value, which is used to add to scoreText
      cell.enemyContact = cell.marker;
      cell.marker = 0;
    }
  }  
};

Battleship.GameState.unselectCell = function(cell) {
  cell.height = 64;
  cell.width = 64;
  cell.tint = 0xffffff;
};

// collision method to keep track of the damage done to enemy
Battleship.GameState.checkPlayerCollision = function() {
  this.game.physics.arcade.collide(this.bulletPool, this.cells, function(bullet, cell) {
  // kill bullet before triggering explosion or changing frame of the cell
  bullet.kill();
    // disable all other cells to collide with selected cell
    if(cell.body.enable) {
      cell.body.enable = false;
      cell.input.enabled = false;
    }
    // enemy was hit
    if (cell.hasEnemy) {
      this.getExplosion(cell, cell.posX, cell.posY);
      this.getHitLocation("player",cell, cell.x, cell.y);
      this.shipSmoke("player", cell, cell.x, cell.y);
      this.enemyHit(cell);
      // check for sunken ship
      this.sunkEnemyBattleship(cell);
      this.game.data.playerScore += cell.enemyContact;
      // updates the score text on the top of board
      this.score.text = this.scoreText + this.game.data.playerScore;
    } else {
        // there is nothing in the cell
        this.getSplash(cell, cell.posX, cell.posY);
        this.miss(cell);
    }

    // if there are no bullets left, then switch to enemy board
    if (this.reservedBullets === 0) {
      setTimeout(function() {
        Battleship.GameState.switchTurn('enemy');
      }, 850);
    }

    // destroy gun and ships, reset board
    if (this.gameOver) {
      this.cells.forEach(function (item) {
        item.frame = 0;
      }, this);

      // destroy all objects in order to clean up cache and start a new board
      this.music.stop();
      this.game.data.playerScore += Math.floor(Math.random() * (36 - 4)) + 4;
      setTimeout(function(){Battleship.game.state.start("GameOverState");}, 800);
    }
  }, null, this);
};