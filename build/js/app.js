function changeBoardsToEnemys(t){if(Battleship.GameState.cells.visible=!t,Battleship.GameState.playerCells.visible=t,Battleship.GameState.hitGroup.visible=!t,Battleship.GameState.hitEnemyGroup.visible=t,Battleship.GameState.cells.visible)for(var e=2;e<7;e++)Battleship.GameState.playerShips["ship"+e].location.visible=!1,Battleship.GameState.enemyShips["ship"+e].location.visible=Battleship.GameState.enemyShips["ship"+e].sunken;else for(var e=2;e<7;e++)Battleship.GameState.playerShips["ship"+e].location.visible=!0,Battleship.GameState.enemyShips["ship"+e].location.visible=!1}function callShootAgain(t){Battleship.GameState.simulateShooting(t)}var Battleship=Battleship||{};Battleship.GameState=Battleship.GameState||{},Battleship.GameState.SHOT_DELAY=200,Battleship.GameState.BULLET_SPEED=850,Battleship.GameState.BOARD_COLS,Battleship.GameState.BOARD_ROWS,Battleship.GameState.CELL_SIZE=64,Battleship.GameState.CELL_SPACING=2,Battleship.GameState.CELL_SIZE_SPACED=Battleship.GameState.CELL_SIZE+Battleship.GameState.CELL_SPACING,Battleship.HomeState=Battleship.HomeState||{},Battleship.HomeState.intro_text,Battleship.HomeState.init=function(){},Battleship.HomeState.preload=function(){},Battleship.HomeState.create=function(){this.game.stage.backgroundColor="#4488cc";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};this.intro_text=this.game.add.text(0,0,"Tap Screen to Start",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.HomeState.gameStart=function(t){this.game.data.turn="player",this.game.state.start("GameState")},Battleship.HomeState.shutdown=function(){console.log("shutdown homestate")},Battleship.GameOverState=Battleship.GameOverState||{},Battleship.GameOverState.intro_text,Battleship.GameOverState.init=function(){},Battleship.GameOverState.preload=function(){},Battleship.GameOverState.create=function(){this.game.stage.backgroundColor="#222";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};"player"==this.game.data.loser?(this.intro_text=this.game.add.text(0,0,"You Lost! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)):"enemy"==this.game.data.loser&&(this.intro_text=this.game.add.text(0,0,"You Win! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.GameOverState.gameStart=function(){this.game.state.start("GameState")},Battleship.GameOverState.shutdown=function(){console.log("shutdown game over")},Battleship.GameState.init=function(){this.levels={},this.ship2={},this.ship3={},this.ship4={},this.ship5={},this.ship6={},this.playerShips={ship2:{},ship3:{},ship4:{},ship5:{},ship6:{}},this.enemyShips={ship2:{},ship3:{},ship4:{},ship5:{},ship6:{}},this.gameOver=!1,this.selectedCell=null,this.lastBulletShotAt=void 0,this.cells,this.playerCells,this.selectedCell=null,this.selectedCellStartPos={x:0,y:0},this.game.physics.startSystem(Phaser.Physics.ARCADE),this.reservedBullets=6,this.game.data.loser="",this.matrix=[[[0,0,0,0,0,0,0,0,2,2],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,5,0,0,2,0],[0,0,0,0,0,5,0,0,2,0],[0,0,0,6,0,5,0,0,0,0],[0,0,0,6,0,5,0,0,0,0],[0,0,0,6,0,5,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,6,6,6,6,6,6,0,0],[0,3,0,0,0,0,0,0,0,0],[0,3,0,0,0,0,2,2,0,0],[0,3,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,2,0,0,0],[0,0,0,6,0,0,2,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,4,4,4,4,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,4,4,4,4,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[2,2,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,2,0],[0,5,5,5,5,5,0,0,2,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]]],this.levels.ships=[{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:90},ship6:{angle:90}},{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:0}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}}],this.game.data.isShooting=!0,console.log("Player Score: "+this.game.data.playerScore)},Battleship.GameState.preload=function(){this.load.image("bullet","img/assets/gfx/rocket.png"),this.load.image("player","img/assets/gfx/bullet.png"),this.load.image("enemy","img/assets/gfx/player.png"),this.load.image("ground","img/assets/gfx/ground.png"),this.load.image("ship2","img/assets/gfx/Ship2.png"),this.load.image("ship3","img/assets/gfx/Ship3.png"),this.load.image("ship4","img/assets/gfx/Ship4.png"),this.load.image("ship5","img/assets/gfx/Ship5.png"),this.load.image("ship6","img/assets/gfx/Ship6.png"),this.load.spritesheet("explosion","img/assets/gfx/explosion.png",128,128),this.load.spritesheet("cell","img/assets/gfx/cells.png",64,64),this.load.audio("music",["img/assets/audio/Battleship.mp3","img/assets/audio/Battleship.ogg"]),this.load.audio("explosion","img/assets/audio/Explosion Blast Large 05.mp3"),this.load.audio("sunkenShip","img/assets/audio/Explosion Blast Debris Large 01.mp3"),this.load.audio("shoot","img/assets/audio/Explosion Cannon Fire 01.mp3"),this.load.audio("miss","img/assets/audio/Liquid Water Water Splash Hands Big Splash 02.mp3")},Battleship.GameState.positionData=function(){var t={},e=this.matrix.length,s=this.game.rnd.integerInRange(0,e-1);return t.matrix=this.matrix[s],t.index=s,t},Battleship.GameState.create=function(){this.game.stage.backgroundColor="#4488cc",this.game.data.enemyBoard=this.positionData(),this.spawnEnemyBoard(this.game.data.enemyBoard),setTimeout(function(){Battleship.game.data.playerBoard=Battleship.GameState.positionData(),Battleship.GameState.spawnPlayerBoard(Battleship.game.data.playerBoard),Battleship.GameState.playerCells.visible=!1},1e3),this.gun=this.game.add.sprite(this.game.width/2,this.game.height-10,"player"),this.gun.anchor.setTo(.5,.5),this.bulletPool=this.game.add.group();for(var t=0;t<this.reservedBullets;t++){var e=this.game.add.sprite(0,0,"bullet");this.bulletPool.add(e),e.anchor.setTo(.5,.5),this.game.physics.enable(e,Phaser.Physics.ARCADE),e.kill()}this.bannerMessage(),this.game.input.activePointer.x=this.game.width/2,this.game.input.activePointer.y=this.game.height/2,this.explosionGroup=this.game.add.group(),this.hitGroup=this.game.add.group(),this.hitEnemyGroup=this.game.add.group(),this.music=this.add.audio("music"),this.music.loopFull(.4)},Battleship.GameState.bannerMessage=function(){this.bar=this.add.graphics(),this.bar.beginFill(0,.2),this.bar.drawRect(0,this.game.world.centerY-50,800,100);var t={font:"bold 32px Arial",fill:"#FFF"};"player"==this.game.data.turn?(this.msg=this.add.text(this.game.world.centerX,this.game.world.centerY,"Player's Turn!",t),this.msg.anchor.setTo(.5),this.msg.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)):"enemy"==this.game.data.turn&&(this.msg=this.add.text(this.game.world.centerX,this.game.world.centerY,"Enemy's Turn!",t),this.msg.anchor.setTo(.5),this.msg.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)),this.bar.visible=!1,this.msg.visible=!1},Battleship.GameState.shipPlacement=function(t,e,s,i,a){switch(s){case 2:!0!==t.ship2.placed&&(90===this.levels.ships[a].ship2.angle?t.ship2.location=this.game.add.sprite(e.x+32,e.y-32,"ship2"):0===this.levels.ships[a].ship2.angle&&(t.ship2.location=this.game.add.sprite(e.x-32,e.y-32,"ship2")),t.ship2.location.angle=this.levels.ships[a].ship2.angle,t.ship2.location.visible=i,t.ship2.placed=!0);break;case 3:!0!==t.ship3.placed&&(90===this.levels.ships[a].ship3.angle?t.ship3.location=this.game.add.sprite(e.x+32,e.y-32,"ship3"):0===this.levels.ships[a].ship3.angle&&(t.ship3.location=this.game.add.sprite(e.x-32,e.y-32,"ship3")),t.ship3.location.angle=this.levels.ships[a].ship3.angle,t.ship3.location.visible=i,t.ship3.placed=!0);break;case 4:!0!==t.ship4.placed&&(90===this.levels.ships[a].ship4.angle?t.ship4.location=this.game.add.sprite(e.x+32,e.y-32,"ship4"):0===this.levels.ships[a].ship4.angle&&(t.ship4.location=this.game.add.sprite(e.x-32,e.y-32,"ship4")),t.ship4.location.angle=this.levels.ships[a].ship4.angle,t.ship4.location.visible=i,t.ship4.placed=!0);break;case 5:!0!==t.ship5.placed&&(90===this.levels.ships[a].ship5.angle?t.ship5.location=this.game.add.sprite(e.x+32,e.y-32,"ship5"):0===this.levels.ships[a].ship5.angle&&(t.ship5.location=this.game.add.sprite(e.x-32,e.y-32,"ship5")),t.ship5.location.angle=this.levels.ships[a].ship5.angle,t.ship5.location.visible=i,t.ship5.placed=!0);break;case 6:!0!==t.ship6.placed&&(90===this.levels.ships[a].ship6.angle?t.ship6.location=this.game.add.sprite(e.x+32,e.y-32,"ship6"):0===this.levels.ships[a].ship6.angle&&(t.ship6.location=this.game.add.sprite(e.x-32,e.y-32,"ship6")),t.ship6.location.angle=this.levels.ships[a].ship6.angle,t.ship6.location.visible=i,t.ship6.placed=!0)}},Battleship.GameState.switchTurn=function(t){console.log("Player Score: "+this.game.data.playerScore),console.log("writing message..."),"player"===t?(this.reservedBullets=6,this.game.data.turn="player",this.bannerMessage(),this.viewMessage()):"enemy"===t&&(this.reservedBullets=6,this.game.data.turn="enemy",this.bannerMessage(),this.viewMessage())},Battleship.GameState.viewMessage=function(){console.log("changing boards"),"player"==this.game.data.turn?(this.bar.visible=!0,this.msg.visible=!0,changeBoardsToEnemys(!1),setTimeout(function(){Battleship.GameState.bar.visible=!1,Battleship.GameState.msg.visible=!1},3e3)):"enemy"==this.game.data.turn&&(this.bar.visible=!0,this.msg.visible=!0,changeBoardsToEnemys(!0),setTimeout(function(){Battleship.GameState.bar.visible=!1,Battleship.GameState.msg.visible=!1,Battleship.game.data.isShooting=!1},3e3))},Battleship.GameState.GameOverPlayer=function(){var t={},e=0;t=this.cells.children;for(var s=0;s<t.length;s++)e+=t[s].marker;e<=0&&"player"==this.game.data.turn?(this.gameOver=!0,this.game.data.loser="enemy"):this.gameOver=!1},Battleship.GameOverState=Battleship.GameOverState||{},Battleship.GameOverState.intro_text,Battleship.GameOverState.init=function(){},Battleship.GameOverState.preload=function(){},Battleship.GameOverState.create=function(){this.game.stage.backgroundColor="#222";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};"player"==this.game.data.loser?(this.intro_text=this.game.add.text(0,0,"You Lost! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)):"enemy"==this.game.data.loser&&(this.intro_text=this.game.add.text(0,0,"You Win! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.GameOverState.gameStart=function(){this.game.state.start("GameState")},Battleship.GameOverState.shutdown=function(){console.log("shutdown game over")},Battleship.GameState.spawnPlayerBoard=function(t){this.BOARD_COLS=10,this.BOARD_ROWS=10,this.playerCells=this.game.add.group(),this.playerCells.ship2=0,this.playerCells.ship3=0,this.playerCells.ship4=0,this.playerCells.ship5=0,this.playerCells.ship6=0,this.playerShips.ship2.placed=!1,this.playerShips.ship3.placed=!1,this.playerShips.ship4.placed=!1,this.playerShips.ship5.placed=!1,this.playerShips.ship6.placed=!1;for(var e=0;e<this.BOARD_COLS;e++)for(var s=0;s<this.BOARD_ROWS;s++){var i=this.playerCells.create(e*this.CELL_SIZE_SPACED+this.CELL_SIZE_SPACED/2+2,s*this.CELL_SIZE_SPACED+this.CELL_SIZE/2+64,"cell",0);i.anchor.setTo(.5,.5),i.name="cell: "+e.toString()+"x"+s.toString(),i.enemyContact=0,i.marker=t.matrix[s][e],this.shipPlacement(this.playerShips,i,i.marker,!1,t.index),i.posX=i.x,i.posY=i.y,i.hasEnemy=i.marker>0,i.isHit=!1}this.game.data.currentPlayerBoard=this.playerCells},Battleship.GameState.enemyHit=function(t){t.hasEnemy=!1,t.frame=1,this.game.data.currentEnemyBoard.cellStatus=t.frame,this.shipHit=this.add.audio("explosion"),this.shipHit.play()},Battleship.GameState.sunkEnemyBattleship=function(t){switch(t.enemyContact){case 2:this.cells.ship2+=t.enemyContact,4===this.cells.ship2&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.enemyShips.ship2.location.visible=!0,this.enemyShips.ship2.sunken=!0);break;case 3:this.cells.ship3+=t.enemyContact,9===this.cells.ship3&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.enemyShips.ship3.location.visible=!0,this.enemyShips.ship3.sunken=!0);break;case 4:this.cells.ship4+=t.enemyContact,console.log("Ship 4 current tally: "+this.cells.ship4),16===this.cells.ship4&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.enemyShips.ship4.location.visible=!0,this.enemyShips.ship4.sunken=!0);break;case 5:this.cells.ship5+=t.enemyContact,25===this.cells.ship5&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.enemyShips.ship5.location.visible=!0,this.enemyShips.ship5.sunken=!0);break;case 6:this.cells.ship6+=t.enemyContact,36===this.cells.ship6&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.enemyShips.ship6.location.visible=!0,this.enemyShips.ship6.sunken=!0)}!0===this.enemyShips.ship2.location.visible&&!0===this.enemyShips.ship3.location.visible&&!0===this.enemyShips.ship4.location.visible&&!0===this.enemyShips.ship5.location.visible&&!0===this.enemyShips.ship6.location.visible&&(this.game.data.loser="enemy",this.enemyShips.ship2.location.visible=!1,this.enemyShips.ship3.location.visible=!1,this.enemyShips.ship4.location.visible=!1,this.enemyShips.ship5.location.visible=!1,this.enemyShips.ship6.location.visible=!1)},Battleship.GameState.miss=function(t){t.frame=2,this.game.data.currentEnemyBoard.cellStatus=t.frame,this.missEnemy=this.add.audio("miss"),this.missEnemy.play()},Battleship.GameState.simulateShooting=function(t){if(this.game.data.isShooting=!0,this.reservedBullets>0){var e=this.playerCells.getChildAt(this.game.rnd.integerInRange(0,99));console.log(e.name),e.isHit?this.simulateShooting(this.playerCells):(this.gun.rotation=Math.atan2(e.y-this.gun.y,e.x-this.gun.x),this.selectCell(e))}else setTimeout(function(){console.log("switching turn from enemy"),Battleship.GameState.switchTurn("player")},500)},Battleship.GameState.checkEnemyCollision=function(){this.game.physics.arcade.collide(this.bulletPool,this.playerCells,function(t,e){t.kill(),e.isHit=!0,e.hasEnemy?(this.getExplosion(e,e.posX,e.posY),this.getHitLocation("enemy",e,e.x,e.y),this.enemyHit(e),this.sunkPlayerBattleship(e),this.game.data.playerScore+=e.enemyContact,setTimeout(function(){callShootAgain(this.playerCells)},1e3)):(this.miss(e),setTimeout(function(){callShootAgain(this.playerCells)},1800)),this.gameOver&&(this.cells.forEach(function(t){t.frame=0},this),this.music.stop(),this.gun.destroy(),this.ship2.location.destroy(),this.ship3.location.destroy(),this.ship4.location.destroy(),this.ship5.location.destroy(),this.ship6.location.destroy(),this.game.data.loser="player",this.game.state.start("GameOverState")),e.body.enable&&(e.body.enable=!1)},null,this)},Battleship.GameState.GameOverEnemy=function(){var t={},e=0;t=this.playerCells.children;for(var s=0;s<t.length;s++)e+=t[s].marker;e<=0&&"enemy"==this.game.data.turn?this.gameOver=!0:this.gameOver=!1},Battleship.GameState.spawnEnemyBoard=function(t){this.BOARD_COLS=10,this.BOARD_ROWS=10,this.cells=this.game.add.group(),this.cells.ship2=0,this.cells.ship3=0,this.cells.ship4=0,this.cells.ship5=0,this.cells.ship6=0,this.enemyShips.ship2.placed=!1,this.enemyShips.ship3.placed=!1,this.enemyShips.ship4.placed=!1,this.enemyShips.ship5.placed=!1,this.enemyShips.ship6.placed=!1;for(var e=0;e<this.BOARD_COLS;e++)for(var s=0;s<this.BOARD_ROWS;s++){var i=this.cells.create(e*this.CELL_SIZE_SPACED+this.CELL_SIZE_SPACED/2+2,s*this.CELL_SIZE_SPACED+this.CELL_SIZE/2+64,"cell",0);i.anchor.setTo(.5,.5),i.name="cell: "+e.toString()+"x"+s.toString(),i.inputEnabled=!0,i.enemyContact=0,i.marker=t.matrix[s][e],this.shipPlacement(this.enemyShips,i,i.marker,!1,t.index),i.posX=i.x,i.posY=i.y,i.hasEnemy=i.marker>0,i.events.onInputDown.add(this.selectCell,this)}this.game.data.currentEnemyBoard=this.cells},Battleship.GameState.sunkPlayerBattleship=function(t){switch(t.enemyContact){case 2:return this.playerCells.ship2+=t.enemyContact,4===this.playerCells.ship2&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.playerShips.ship2.sunken=!0,!0);case 3:return this.playerCells.ship3+=t.enemyContact,9===this.playerCells.ship3&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.playerShips.ship2.sunken=!0,!0);case 4:return this.playerCells.ship4+=t.enemyContact,16===this.playerCells.ship4&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.playerShips.ship2.sunken=!0,!0);case 5:return this.playerCells.ship5+=t.enemyContact,25===this.playerCells.ship5&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.playerShips.ship2.sunken=!0,!0);case 6:return this.playerCells.ship6+=t.enemyContact,36===this.playerCells.ship6&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.playerShips.ship2.sunken=!0,!0);default:return!1}!0===this.playerShips.ship2.sunken&&!0===this.playerShips.ship3.sunken&&!0===this.playerShips.ship4.sunken&&!0===this.playerShips.ship5.sunken&&!0===this.playerShips.ship6.sunken&&(this.game.data.loser="player")},Battleship.GameState.shootBullet=function(){if(void 0===this.lastBulletShotAt&&(this.lastBulletShotAt=0),!(this.game.time.now-this.lastBulletShotAt<this.SHOT_DELAY)){this.lastBulletShotAt=this.game.time.now;var t=this.bulletPool.getFirstDead();null!==t&&void 0!==t&&(t.revive(),t.checkWorldBounds=!0,t.outOfBoundsKill=!0,t.reset(this.gun.x,this.gun.y),t.rotation=this.gun.rotation,t.body.velocity.x=Math.cos(t.rotation)*this.BULLET_SPEED,t.body.velocity.y=Math.sin(t.rotation)*this.BULLET_SPEED,this.cannonShot=this.add.audio("shoot"),this.cannonShot.play(),this.reservedBullets-=1)}},Battleship.GameState.update=function(){"player"==this.game.data.turn?this.gun.rotation=this.game.physics.arcade.angleToPointer(this.gun):"enemy"==this.game.data.turn&&(console.log("enemy turn"),this.game.data.isShooting||(console.log("enemy shooting"),this.simulateShooting(this.playerCells))),"player"==this.game.data.turn?(this.GameOverPlayer(),this.checkPlayerCollision()):"enemy"==this.game.data.turn&&(this.GameOverEnemy(),this.checkEnemyCollision())},Battleship.GameState.getExplosion=function(t,e,s){var i=this.explosionGroup.getFirstDead();if(null===i){i=this.game.add.sprite(0,0,"explosion"),i.anchor.setTo(.5,.5);i.animations.add("boom",[0,0,1,2,3],60,!1).killOnComplete=!0,this.explosionGroup.add(i)}return i.revive(),i.x=e,i.y=s,i.angle=this.game.rnd.integerInRange(0,360),i.animations.play("boom"),i},Battleship.GameState.getHitLocation=function(t,e,s,i){var a="player"===t?this.hitGroup.getFirstDead():this.hitEnemyGroup.getFirstDead();return null===a&&(a=this.game.add.sprite(0,0,"cell",1),a.anchor.setTo(.5,.5),"player"===t?this.hitGroup.add(a):this.hitEnemyGroup.add(a)),a.revive(),a.x=s,a.y=i,a},Battleship.GameState.selectCell=function(t){0===t.frame&&"enemy"==this.game.data.turn?(this.shootBullet(),this.game.physics.enable(t,Phaser.Physics.ARCADE),t.body.immovable=!0,t.body.allowGravity=!1,t.hasEnemy&&(t.enemyContact=t.marker,t.marker=0)):t.input.pointerOver&&0===t.frame&&"player"==this.game.data.turn&&this.reservedBullets>0&&(this.shootBullet(),this.game.physics.enable(t,Phaser.Physics.ARCADE),t.body.immovable=!0,t.body.allowGravity=!1,t.hasEnemy&&(t.enemyContact=t.marker,t.marker=0))},Battleship.GameState.checkPlayerCollision=function(){this.game.physics.arcade.collide(this.bulletPool,this.cells,function(t,e){t.kill(),e.body.enable&&(e.body.enable=!1),e.hasEnemy?(this.getExplosion(e,e.posX,e.posY),this.getHitLocation("player",e,e.x,e.y),this.enemyHit(e),this.sunkEnemyBattleship(e),this.game.data.playerScore+=e.enemyContact):this.miss(e),0===this.reservedBullets&&(console.log("switching turn from player"),setTimeout(function(){Battleship.GameState.switchTurn("enemy")},500)),this.gameOver&&(this.cells.forEach(function(t){t.frame=0},this),this.music.destroy(),this.gun.destroy(),this.enemyShips.ship2.location.destroy(),this.enemyShips.ship3.location.destroy(),this.enemyShips.ship4.location.destroy(),this.enemyShips.ship5.location.destroy(),this.enemyShips.ship6.location.destroy(),this.game.data.playerScore+=Math.floor(32*Math.random())+4,console.log("Player Score: "+this.game.data.playerScore),this.game.state.start("GameOverState"))},null,this)},Battleship.game=new Phaser.Game(664,794,Phaser.AUTO,"game-canvas"),Battleship.game.data={},Battleship.game.data.loser="",Battleship.game.data.turn="player",Battleship.game.data.playerScore=0,Battleship.game.data.playerBoard=null,Battleship.game.data.enemyBoard=null,Battleship.game.data.currentEnemyBoard={},Battleship.game.data.currentPlayerBoard={},Battleship.game.data.isShooting=!1,Battleship.game.state.add("HomeState",Battleship.HomeState),Battleship.game.state.add("TurnState",Battleship.TurnState),Battleship.game.state.add("GameState",Battleship.GameState),Battleship.game.state.add("GameOverState",Battleship.GameOverState),Battleship.game.state.start("HomeState");