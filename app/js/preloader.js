Battleship.GameState.init = function() {
  // player always starts first
  this.game.data.turn = "player";
  this.scoreText = "Player Score: ";
  this.ammo = null;

  this.levels = {};
  this.ship2 = {};
  this.ship3 = {};
  this.ship4 = {};
  this.ship5 = {};
  this.ship6 = {};

  this.playerShips = {
    'ship2' : {},
    'ship3' : {},
    'ship4' : {},
    'ship5' : {},
    'ship6' : {},
  };

  this.enemyShips = {
    'ship2' : {},
    'ship3' : {},
    'ship4' : {},
    'ship5' : {},
    'ship6' : {},
  };

  this.gameOver = false;
  this.selectedCell = null;

  this.lastBulletShotAt = undefined;
  this.cells;
  this.playerCells;
  this.selectedCell = null;
  this.selectedCellStartPos = { x: 0, y: 0 };

  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.reservedBullets = 6;
  this.game.data.loser = null;
  this.game.isReady = false;  // need to make sure that all objects are instantiated before processing the Phaser GameState Update method

  this.matrix = [
    [ // board 1
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 2
      [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 6, 6, 6, 6, 6, 6, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 2, 2, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 4
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 2, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [ // board 5
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 4, 4, 4, 4, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [ // board 6
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 2, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ]
  ];

  // angle 0 is horizontal
  // angle 90 is vertical
  this.levels.ships = [
    // board 1 ships
    {
      'ship2': {
        'angle': 0 
      },
      'ship3': {
        'angle': 90 
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 2 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 90
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 3 ships
    {
      'ship2': {
        'angle': 0
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 0
      }
    },
    // board 4 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 5 ships
    {
      'ship2': {
        'angle': 0
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 6 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    }
  ];

  this.game.data.isShooting = true;
};

Battleship.GameState.preload = function() {
  // images
  this.load.image('bullet', 'img/assets/gfx/rocket.png');
  this.load.image('player', 'img/assets/gfx/bullet.png');
  this.load.image('enemy', 'img/assets/gfx/player.png');
  this.load.image('ground', 'img/assets/gfx/ground.png');
  this.load.image('ship2', 'img/assets/gfx/Ship2.png');
  this.load.image('ship3', 'img/assets/gfx/Ship3.png');
  this.load.image('ship4', 'img/assets/gfx/Ship4.png');
  this.load.image('ship5', 'img/assets/gfx/Ship5.png');
  this.load.image('ship6', 'img/assets/gfx/Ship6.png');

  // sprite sheets
  this.load.spritesheet('explosion', 'img/assets/gfx/explosion.png', 128, 128);
  this.load.spritesheet('cell', 'img/assets/gfx/cells.png', 64, 64);

  // music
  this.load.audio('music', ['img/assets/audio/Battleship.mp3', 'img/assets/audio/Battleship.ogg']);
  // sound effects
  this.load.audio('explosion', 'img/assets/audio/Explosion Blast Large 05.mp3');
  this.load.audio('sunkenShip', 'img/assets/audio/Explosion Blast Debris Large 01.mp3');
  this.load.audio('shoot', 'img/assets/audio/Explosion Cannon Fire 01.mp3');
  this.load.audio('miss', 'img/assets/audio/Liquid Water Water Splash Hands Big Splash 02.mp3');
};

Battleship.GameState.positionData = function() {
  var board = {};
  var len = this.matrix.length;
  var index = this.game.rnd.integerInRange(0, (len-1));
  board.matrix = this.matrix[index];
  board.index = index;

  return board;
  
};

Battleship.GameState.create = function() {
  this.game.stage.backgroundColor = '#4488cc';

  // draws enemy board for player
  this.game.data.enemyBoard = this.positionData();
  this.spawnEnemyBoard(this.game.data.enemyBoard);

  // group that draws the missiles representing the reservedBullets variable
  this.ammo = this.game.add.group();
  this.enemyAmmo = this.game.add.group();
  // draw text associated with ammo
  this.drawAmmoText();
  // draw bullet/missiles representing total reservedBullets
  this.drawAmmoSprites();
  this.enemyAmmo.setAll('visible', false);

  // draws the player board for enemy
  setTimeout(function(){
    Battleship.game.data.playerBoard = Battleship.GameState.positionData();
    Battleship.GameState.spawnPlayerBoard(Battleship.game.data.playerBoard);
    Battleship.GameState.playerCells.visible = false;

    Battleship.GameState.gun = Battleship.game.add.sprite(Battleship.game.width / 2, Battleship.game.height - 10, 'player');
    Battleship.GameState.gun.anchor.setTo(0.5, 0.5);

    Battleship.GameState.bulletPool = Battleship.game.add.group();
    for (var i = 0; i < Battleship.GameState.NUMBER_OF_BULLETS; i++) {
      var bullet = Battleship.game.add.sprite(0, 0, 'bullet');
      Battleship.GameState.bulletPool.add(bullet);

      bullet.anchor.setTo(0.5, 0.5);

      Battleship.game.physics.enable(bullet, Phaser.Physics.ARCADE);
      bullet.kill();
    }

    // simulates mouse pointer in center of stage
    Battleship.game.input.activePointer.x = Battleship.game.width / 2;
    Battleship.game.input.activePointer.y = Battleship.game.height / 2;

    Battleship.GameState.explosionGroup = Battleship.game.add.group();
    // hit groups responsible for drawing the hit cell over ship sprites
    Battleship.GameState.hitGroup = Battleship.game.add.group();
    Battleship.GameState.hitEnemyGroup = Battleship.game.add.group();

    Battleship.GameState.music = Battleship.GameState.add.audio('music');
    Battleship.GameState.music.loopFull(0.4);
    Battleship.game.isReady = true;
    Battleship.GameState.bar.visible = false;
    Battleship.GameState.msg.visible = false;
  }, 2500);

  // Keeps track of score
  this.scoreKeep(this.scoreText);
  // creates a banner message
  this.bannerMessage();
  this.bar.visible = true;
  this.msg.visible = true;

};  // ------ End of create function ---------------//

Battleship.GameState.bannerMessage = function() {
  // banner message for changing turns
  this.bar = this.add.graphics();
  this.bar.beginFill(0x000000, 0.2);
  this.bar.drawRect(0, this.game.world.centerY - 50, 800, 100);

    // sets font style, color, and size
  var style = { font: "bold 32px Arial", fill: "#FFF"};

  // Text for banner
  if (this.game.data.turn === "player") {
    this.msg = this.add.text(this.game.world.centerX, this.game.world.centerY, "Player's Turn!", style);
    this.msg.anchor.setTo(0.5);
    this.msg.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
  } else if (this.game.data.turn === "enemy") {
    this.msg = this.add.text(this.game.world.centerX, this.game.world.centerY, "Enemy's Turn!", style);
    this.msg.anchor.setTo(0.5);
    this.msg.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
  }

  // make invisible to show board
  this.bar.visible = false;
  this.msg.visible = false;
};

// draws initial score text
Battleship.GameState.scoreKeep = function() {
  var style = { font: "bold 32px Arial", fill: "#FFF"};

    // score text that updates every time player scores a successful hit
  this.score = this.add.text(this.game.world.centerX - 10, this.game.world.centerY - 385, this.scoreText + this.game.data.playerScore, style);
  this.score.anchor.setTo(0.5);
  this.score.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
};

// draws the text for the ammo object
Battleship.GameState.drawAmmoText = function() {
  var style = { font: "bold 32px Arial", fill: "#FFF"};
  this.ammoText = this.game.add.text(this.game.world.centerX - 300, this.game.world.centerY + 315, "Ammo: ", style);
  this.ammoText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
};

// draws sprites for ammo object
Battleship.GameState.drawAmmoSprites = function() {
  // player ammo
    for (var a = 0; a < 6; a++) {
      var ammoSprite = this.ammo.create(this.game.world.centerX - 170 + (30 * a), this.game.world.centerY + 335, 'bullet');
      ammoSprite.anchor.setTo(0.5);
      ammoSprite.angle = 270;
      ammoSprite.alpha = 0.85;
    }
  // enemy ammo
    for (var e = 0; e < 6; e++) {
      var enemyAmmoSprite = this.enemyAmmo.create(this.game.world.centerX - 170 + (30 * e), this.game.world.centerY + 335, 'bullet');
      enemyAmmoSprite.anchor.setTo(0.5);
      enemyAmmoSprite.angle = 270;
      enemyAmmoSprite.alpha = 0.85;
    }
};

// placing the enemy ships
Battleship.GameState.shipPlacement = function (target, cell, ship, isVisible, index) {
  switch (ship) {

    case 2: 
      if (target.ship2.placed !== true) {
        if (this.levels.ships[index].ship2.angle === 90) {
          target.ship2.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship2');
        } else if (this.levels.ships[index].ship2.angle === 0) {
          target.ship2.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship2');
        }
        target.ship2.location.angle = this.levels.ships[index].ship2.angle;
        target.ship2.location.visible = isVisible;
        target.ship2.placed = true;
      }
      break;

    case 3: 
      if (target.ship3.placed !== true) {
        if (this.levels.ships[index].ship3.angle === 90) {
          target.ship3.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship3');
        } else if (this.levels.ships[index].ship3.angle === 0) {
          target.ship3.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship3');
        }
        target.ship3.location.angle = this.levels.ships[index].ship3.angle;
        target.ship3.location.visible = isVisible;
        target.ship3.placed = true;
      }
      break;

      case 4: 
      if (target.ship4.placed !== true) {
        if (this.levels.ships[index].ship4.angle === 90) {
          target.ship4.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship4');
        } else if (this.levels.ships[index].ship4.angle === 0) {
          target.ship4.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship4');
        }
        target.ship4.location.angle = this.levels.ships[index].ship4.angle;
        target.ship4.location.visible = isVisible;
        target.ship4.placed = true;
      }
      break;

      case 5: 
      if (target.ship5.placed !== true) {
        if (this.levels.ships[index].ship5.angle === 90) {
          target.ship5.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship5');
        } else if (this.levels.ships[index].ship5.angle === 0) {
          target.ship5.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship5');
        }
        target.ship5.location.angle = this.levels.ships[index].ship5.angle;
        target.ship5.location.visible = isVisible;
        target.ship5.placed = true;
      }
      break;

      case 6: 
      if (target.ship6.placed !== true) {
        if (this.levels.ships[index].ship6.angle === 90) {
          target.ship6.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship6');
        } else if (this.levels.ships[index].ship6.angle === 0) {
          target.ship6.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship6');
        }
        target.ship6.location.angle = this.levels.ships[index].ship6.angle;
        target.ship6.location.visible = isVisible;
        target.ship6.placed = true;
      }
      break;
  }
};

Battleship.GameState.switchTurn = function(player) {
  // switches turn from current user [player -> enemy, enemy -> player]
  if (player === "player") {
    this.reservedBullets = 6;
    this.game.data.turn = "player";
    this.bannerMessage();
    this.viewMessage();
  } else if (player === "enemy") {
    this.reservedBullets = 6;
    this.game.data.turn = "enemy";
    this.bannerMessage();
    this.viewMessage();
  }
};

Battleship.GameState.viewMessage = function() {
  if (this.game.data.turn == "player") {
    // change visibility of message before switching boards
    this.bar.visible = true;
    this.msg.visible = true;
    changeBoardsToEnemys(false);
    //this.cells.ignoreChildInput = false;
    setTimeout(function(){
      Battleship.GameState.bar.visible = false;
      Battleship.GameState.msg.visible = false;
    }, 2000);
  } else if (this.game.data.turn == "enemy") {
    // change visibility of message before switching boards
    this.bar.visible = true;
    this.msg.visible = true;
    changeBoardsToEnemys(true);
    //this.cells.ignoreChildInput = true;
    setTimeout(function(){
      Battleship.GameState.bar.visible = false;
      Battleship.GameState.msg.visible = false;
      Battleship.game.data.isShooting = false;
    }, 2000);
  }
};

function changeBoardsToEnemys(isEnemys) {
  // player variables are hidden when enemy plays
  Battleship.GameState.score.visible = !isEnemys;
  Battleship.GameState.cells.visible = !isEnemys;
  Battleship.GameState.hitGroup.visible = !isEnemys;
  // Delay ammo visibility to switch to appropriate board
  setTimeout(function(){ Battleship.GameState.ammo.setAll('visible', !isEnemys); }, 500);

  // enemy's board and hit markers are shown
  Battleship.GameState.playerCells.visible = isEnemys;
  // Delay ammo visibility to switch to appropriate board
  setTimeout(function(){ Battleship.GameState.enemyAmmo.setAll('visible', isEnemys); }, 500);
  Battleship.GameState.hitEnemyGroup.visible = isEnemys;
  // if players turn, show all sunken enemy ships and hide the rest along with the enemys' board ships, else hide all enemy ships and show all players ships
  if (Battleship.GameState.cells.visible) {
    for (var i = 2; i < 7; i++) {
      Battleship.GameState.playerShips['ship' + i].location.visible = false;
      Battleship.GameState.enemyShips['ship' + i].location.visible = Battleship.GameState.enemyShips['ship' + i].sunken;
    }
  } else {
    for (var j = 2; j < 7; j++) {
      Battleship.GameState.playerShips['ship' + j].location.visible = true;
      Battleship.GameState.enemyShips['ship' + j].location.visible = false;
    }
  }
}

Battleship.GameState.GameOverPlayer = function() {
  var board = {};
  var boardScore = 0;

  board = this.cells.children;
  for (var i = 0; i < board.length; i++) {
    boardScore += board[i].marker;
  }

  if (boardScore <=0 && this.game.data.turn == "player") {
    this.gameOver = true;
    this.game.data.loser = "enemy";
  } else {
    this.gameOver = false;
  }
};
