kaboom({
    global: true,
    scale: 1,
    fullscreen: true,
    crisp:false,
    debug: true,
    clearColor: [0,0,0,1]
})
let startSpeed = 0;
let moveSpeed = 100;
const jumpForce = 360;
const bigJumpForce = 550
let currentJumpForce = jumpForce 
let isJumping = true;
let isBig=false;
let enemyXSpeed = -20;
let enemyYSpeed = -20;
const fallDeath = 1000;
let levelSound = null;
const backgroundArray=['levelOneBackground', 'skyImage', 'undergroundBackground','brickBackground', 'bonusBackground'];
const soundArray=['main','sky', 'underground', 'finalMap', 'bonusSound', 'credits']
const rightBtn = document.getElementById('right')
const leftBtn = document.getElementById('left')
const jumpBtn = document.getElementById('jump')
const actionBtn = document.getElementById('action')
//Sprites
loadRoot('./images/')
loadSprite( 'coin' , 'coin.png' )
loadSprite('shroom1' , 'shroom1.png')
loadSprite('block' , 'block.png' )
loadSprite('cloudBlock', 'cloudBlock.png')
loadSprite( 'brick' , 'redBrick.png')
loadSprite('pipe', 'pipe.png')
loadSprite('castle', 'castle.png')
loadSprite('prize', 'prizeBlock.png')
loadSprite('mario', 'marioStanding.png')
loadSprite('marioRight', 'marioRunningRight.png')
loadSprite('marioLeft', 'marioRunningLeft.png')
loadSprite('marioRJump', 'marioJumpRight.png')
loadSprite('marioLJump', 'marioJumpLeft.png')
loadSprite('marioSquat', 'marioSquat.png')
loadSprite('blocked', 'prizedBlocked.png')
loadSprite('mushroom', 'mushroom.png')
loadSprite('bug', 'bug.png')
loadSprite('levelOneBackground', 'levelOneBackground.png')
loadSprite('skyImage', 'skyImage.png')
loadSprite('undergroundBackground', 'undergroundBackground.png')
loadSprite('brickBackground', 'brickBackground.jpg')
loadSprite('blueBlock', 'blueBlock.png')
loadSprite('blueBrick', 'blueBrick2.png')
loadSprite('blueMetal', 'blueMetal.png')
loadSprite('bluePrize', 'bluePrize.png')
loadSprite('blueShroom', 'blueShroom.png')
loadSprite('water', 'water.png')
loadSprite('jumpingFish', 'fishRight.png')
loadSprite('bonusBackground', 'bonusBackground.png')
loadSprite('rightArrow', 'rightArrow.png')
loadSprite('leftArrow', 'leftArrow.png')
loadSprite('jumpArrow', 'jumpArrow.png')
loadSprite('actionArrow', 'actionArrow.png')



//Sounds
loadRoot('./sounds/')
loadSound('bigJump', 'bigJump.wav')
loadSound('smallJump', 'smallJump.wav')
loadSound('dies', 'marioDies.wav')
loadSound('coinSound', 'coin.wav')
loadSound('powerUp', 'powerUp.wav')
loadSound('downPipe', 'downPipe.wav')
loadSound('breakBlock', 'breakBlock.wav')
loadSound('stageClear', 'stageClear.wav')
loadSound('gameOver', 'gameover.wav')
loadSound('main', 'mainMario.mp3')
loadSound('sky', 'theSky.mp3');
loadSound('underground', 'underGround.mp3')
loadSound('stomp', 'stomp.wav')
loadSound('finalMap', 'finalMap.mp3')
loadSound('bonusSound', 'bonusSound.mp3')
loadSound('ending', 'ending.mp3')
loadSound('credits', 'credits.mp3')


scene('game', ({level, score}) => {
    layers(['bg', 'obj', 'ui'], 'obj' )
    const maps =[
        [
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                          ',
            '                                                                                                     n    ',
            '                                          ====                           =====                            ',
            '                                                                                                  xxxxx   ',
            '                                 xxxxxx         ======         =====              ====                    ',
            '                                                                                         xxxxx            ',
            '                      %%                                                                                  ',
            '                xxx                       xxx            =====                =====               xxxxxxxx',
            '                                                                                                          ',
            '          *%          xxxx       xxxxxx                                                                   ',
            '                                                                     =====                xxxxxx          ',
            '                                         xxxxx                                                            ',
            '     %  =====                        xxxxxxxx                                                             ',
            '                  o                 xxxxxxxxxx                                 xxxxxxxxx                  ',
            'xxx             ^            x   ^xxxxxxxxxxxxxxxx           x       ^         x                          ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxx                          ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxx                          ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxx                          ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxx                          ',

            
        ],
        [
            '                                                                  v                                        ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                   v                       ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                     ccccc                                                 ',
            '           =%=%                                                                                            ',
            '                         v       %=%       cccccc                                                          ',
            '                                                        ccccc                                              ',
            '          ccccc                                                                                            ',
            '                               ccccccc        %=%                ccccc                                     ',
            'ccccc             ccccc                                                                                    ',
            '                          cccc                                            cccccc      %=*               v  ',
            '          cccccc                        ccccccccc                                                          ',
            '*                                                                                                          ',
            '      ccc       cccccccc         ccc                  cccccc       %=%               ccccc                 ',
            '                                                                                                           ',
            'cccc                                  cccc                                                                 ',
            '                           v                                   ccccccc                       cccccc        ',
            '                                                                                                           ',
            '                                                                                                           ',
            '                                                                         cccc         cccccc               ',
            '                                                                                                     n     ',
            '                                                                                                           ',
            '                                                                               ccccc              ccccc    ',
            '                                                                                                           ',
            '                                                                  v                                        ',
            '                                                                                                          ', 
        ],
        [   
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                                                                                                       p', 
            'p                    &#&                                                                                p', 
            'p                                                                         v                             p', 
            'p                                                                                                       p', 
            'p                   ######                                                                              p', 
            'p                                              m                                                        p', 
            'p                                              m                                                        p', 
            'p        @##&##&                            m  m  m                   ######                            p', 
            'p                                        m  m  m  m  m                                                  p', 
            'p                              b         m  m  m  m  m              b                                   p', 
            'ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppwwwwwwpppppppppppppppppp       pppp',
            'pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp       pppp', 
            'p                       pppp                                                                            p',
            'p                       pppp                                                                            p', 
            'p                       pppp                                                                            p', 
            'p                       pppp                                                                            p', 
            'p                       pppp                                                                            p', 
            'p                       pppp                                                                            p', 
            'p                       p++p                                                                            p', 
            'p                       p##p                                            %=%=%=                          p', 
            'p                       p##p                                  $$                                        p', 
            'p                       p##p                                $    $                                      p', 
            'p  n           pppp             pppp                    ppppp   ppppp   ppppppp   pppppppp              p',
            'p       b      pppp             pppp                                                                    p', 
            'pppppppppppppppppppppppppppppppppppppppppppppppppppppp                                       pppppppppppp', 
            'ppppppppppppppppppppppppppppppppppppppppppppppppppppppwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwpppppppppppp', 
            
        ],
        [
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
'                                                                                              ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                                                                  ',
            '                                             x                                    ',
            '                                            xx                                    ',
            '          *%                               xxx               <                    ',
            '                                          xxxx                             h      ',
            '                                         xxxxx                                    ',
            '     %  =====                        xxxxxxxxx                                    ',
            '                                    xxxxxxxxxx                                    ',
            'xxx                          x   ^xxxxxxxxxxxx                i                   ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ',
        ],
        [   
           
            '                                                    ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'x                                                 x ',
            'x   u                                             x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x                                                 x ',
            'x             =%=%=%====         %=%=%=%=%=%=     x ',
            'x                                                 x ',
            'x                                                 x ',
            'x    =*=%=%==  ===%=%=%         =%=%=%===%=%=%    x ',
            'x                                               g x ',
            'x    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$      x ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
           
        ],
    ]
    
    const determineLevelEffects = ()=>{
        add([
            sprite(backgroundArray[level]),
            layer('bg'),

            pos(0, 0)
        ])
        
        if(level > -1){
           levelSound = play(soundArray[level])
           
        } else{
            levelSound = null
        }
    }
    const levelConfig = {
        width: 18,
        height: 18,
        //red objects
        '=' : [sprite( 'block'), solid(), 'nonMovable', 'breakable'],
        'x' : [sprite( 'brick') , solid(), 'nonMovable'],
        '^' : [sprite( 'shroom1'), body(1600), 'dangerous'],
        'v' : [sprite('bug'), solid(), scale(0.10), 'dangerous', 'flyable'],
        'o' : [sprite( 'pipe'), solid(),scale(1.5)],
        '$' : [sprite( 'coin'), 'coin'],
        '%' : [sprite( 'prize'), solid(),'coin-prize'],
        '*' : [sprite( 'prize'), solid(),'mushroom-prize'],
        '~' : [sprite( 'mushroom'), body(), 'mushroom'],
        '!' : [sprite('blocked'), solid()], 
        'n' : [sprite('pipe'), solid(), color(20, 20, 100),'nextLevel'],
        'u' : [sprite( 'pipe'), solid(),scale(1), rotate(3.15)],
        'c' : [sprite('cloudBlock'), scale(2), solid(), 'nonMovable'],
        'h' : [sprite( 'castle'), scale(1.5), 'castle', 'nextLevel'],
        'g' : [sprite('pipe'), solid(), color(20, 20, 100),'win'],
        
        //blue objects
        'm' : [sprite('blueMetal'), solid(), scale(0.5), 'nonMovable'],
        'p' : [sprite('blueBrick'), solid(), scale(0.5), 'nonMovable'],
        '&' : [sprite( 'bluePrize'), solid(), scale(0.5), 'coin-prize'],
        '@' : [sprite( 'bluePrize'), solid(), scale(0.5), 'mushroom-prize'],
        '#' : [sprite('blueBlock'), solid(), scale(0.5), 'nonMovable', 'breakable'],
        'b' : [sprite('blueShroom'), solid(), body(), scale(0.6), 'dangerous'],
        'w' : [sprite('water'), scale(1.5), 'water'],
        '+' : [sprite('blueBlock'), solid(), scale(0.5), 'nonMovable', 'superPurse'],
        '8' : [sprite( 'coin'), color(0,0,1), 'purse'],
        't' : [sprite('water'), scale(1.5)],


    }

    const gameLevel = addLevel(maps[level], levelConfig)

    const scoreLabel = add([
        text(score, 10),
        pos(30, 6),
        layer('ui'),
        {
            value: score
        }
    ])

    add([
        text('level ' + parseInt(level + 1), 10), pos(100, 6)
    ])
    // add([
    //     sprite('rightArrow'),
    //     layer('ui'),
    //     origin('botright'),
    //     pos(100, 6)
    // ])

     
            // const smallify = ()=>{
            //     player.scale = vec2(1),
            //     currentJumpForce = jumpForce,
            //     isBig = false,
               
            // }
            // const biggify = ()=>{
            //     player.scale = vec2(1.5),
            //     currentJumpForce = bigJumpForce,
            //     isBig = true,
                
            // }
    
    
    
          

    const player = add([
        sprite('mario'), solid(),
        pos(50, 100),
        scale(0.33),
        body(),
        // big(),
        determineLevelEffects(), 
        origin('bot')
        
    ])
   


    action('mushroom', (m) => {
        m.move(30, 0)
    })
    action('dangerous', (d) => {
        if(d.pos.x > player.pos.x){
            d.move(enemyXSpeed, 0)
        } else if(d.pos.x < player.pos.x){
            d.move(-enemyXSpeed, 0)
        }
        
    })
    action('flyable', (f) => {
        
        if(f.pos.y > player.pos.y){
            f.move(0, enemyYSpeed)
        } else if(f.pos.y < player.pos.y){
            f.move(0, -enemyYSpeed)
        }
        
    })
    player.action(()=>{
        camPos(player.pos)
        camScale(2)
        if(player.pos.y >= fallDeath){
            levelSound.stop()
            play('gameOver', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            go('lose', {score: scoreLabel.value})
            // play(soundArray[5], {
            //     volume: 1.0,
            //     speed: 0.8,
            //     detune: 1200
            // })
        }
    })
    player.on('update', (isBig)=>{
        if(isBig){
            player.scale = vec2(.6)
            currentJumpForce = bigJumpForce
        }else{
            player.scale = vec2(0.33)
            currentJumpForce = jumpForce
        }
    })

    player.on('headbump', (obj)=>{
        if(obj.is('coin-prize')){
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('!', obj.gridPos.sub(0, 0))
        }
        if(obj.is('superPurse')){
            gameLevel.spawn('8', obj.gridPos.sub(0, 0))
            destroy(obj)
            
        }
        if(obj.is('mushroom-prize')){
            gameLevel.spawn('~', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('!', obj.gridPos.sub(0,0))

        }
        if(obj.is('breakable')){
            if(isBig){
                destroy(obj)
                play('breakBlock', {
                    volume: 1.0,
                    speed: 0.8,
                    detune: 1200
                })
            } 
        }
    })

    player.collides('mushroom', (m)=>{
        isBig = true;
        
        play('powerUp', {
            volume: 1.0,
            speed: 0.8,
            detune: 1200
        })
        destroy(m)
        
    })
    player.collides('coin', (c)=>{
        destroy(c)
        play('coinSound', {
            volume: 1.0,
            speed: 0.8,
            detune: 1200
        })
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })
    player.collides('purse', (c)=>{
        destroy(c)
        play('coinSound', {
            volume: 1.0,
            speed: 0.8,
            detune: 1200
        })
        scoreLabel.value = scoreLabel.value + 10;
        scoreLabel.text = scoreLabel.value
    })

    player.collides('dangerous', (d) =>{
        if(isJumping){
            destroy(d)
            play('stomp', {
                volume: 1,
                speed: 0.8,
                detune: 1200
            })
            player.jump(200)
            scoreLabel.value++
            scoreLabel.text = scoreLabel.value
        }else if(isBig){
            isBig = false
            destroy(d)
        }else{
            go('lose', {score: scoreLabel.value})
            levelSound.stop()
            play('dies', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            
        }
    })

    player.collides('water', ()=>{
        go('lose', {score: scoreLabel.value})
            levelSound.stop()
            play('dies', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            // play(soundArray[5], {
            //     volume: 1.0,
            //     speed: 0.8,
            //     detune: 1200
            // })
    })
    keyDown('down', ()=>{
        player.changeSprite('marioSquat')
    })
    keyDown('s', ()=>{
        player.changeSprite('marioSquat')
    })
    keyRelease('down', ()=>{
        player.changeSprite('mario')
    })
    keyRelease('s', ()=>{
        player.changeSprite('mario')
    })

    player.collides('nextLevel', ()=>{
        keyDown('down', ()=>{
            if(player.collides('castle')){
                play('stageClear', {
                    volume: 1.0,
                    speed: 0.8,
                    detune: 1200
                })
                levelSound.stop()
                
            }else{
            play('downPipe', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            levelSound.stop()
            
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                isBig: false
                
                
            })
        }})
        keyDown('s', ()=>{
            if(player.collides('castle')){
                play('stageClear', {
                    volume: 1.0,
                    speed: 0.8,
                    detune: 1200
                })
                levelSound.stop()

                go('game', {
                    level: (level + 1) % maps.length,
                    score: scoreLabel.value,
                    isBig: false
                    
                    
                })
                
            }else if(player.collides('win')){
               
                levelSound.stop()

                go('win', {score: scoreLabel.value})
                // play(soundArray[5], {
                //     volume: 1.0,
                //     speed: 0.8,
                //     detune: 1200
                // })
                
            
            }else{
                play('downPipe', {
                    volume: 1.0,
                    speed: 0.8,
                    detune: 1200
                   
            })

                levelSound.stop()
                
                go('game', {
                    level: (level + 1) % maps.length,
                    score: scoreLabel.value,
                    isBig: false
                    
                    
                })
            }
        })
    })
    // Left Move 
    keyDown('left', ()=>{
       moveSpeed = 150;
        if(isJumping){
            player.changeSprite('marioLJump')

        }else{
            player.changeSprite('marioLeft')
        }
        player.move(-moveSpeed, 0)

    })
    
    keyRelease('left',()=>{
        player.changeSprite('mario')
    })
   
    keyDown('a', ()=>{
        moveSpeed = 150;
        if(isJumping){
            player.changeSprite('marioLJump')
     
        }else{
            player.changeSprite('marioLeft')
        }
        player.move(-moveSpeed, 0)
 
    })
    
    keyRelease('a',()=>{
        player.changeSprite('mario')
    })
    //Right Move
    keyDown('d', ()=>{
        moveSpeed = 150
        if(isJumping){
            player.changeSprite('marioRJump')
    
        }else{
            player.changeSprite('marioRight')
        }
            player.move(moveSpeed, 0)
    })
    
    keyRelease('d',()=>{
        player.changeSprite('mario')
    })
    
    keyDown('right', ()=>{
    moveSpeed = 150
        if(isJumping){
            player.changeSprite('marioRJump')

        }else{
            player.changeSprite('marioRight')
        }
            player.move(moveSpeed, 0)         
    })
    
    keyRelease('right',()=>{
        player.changeSprite('mario')
    })
    
    player.on('grounded',()=>{
        
        player.changeSprite('mario')
        
    })
    

    player.action(()=>{
        
        if(player.grounded()){
            isJumping = false
            
        }else[
            isJumping = true
        ]
    })

    //Jump Controls
    keyPress('space', ()=>{
        if(player.grounded()){
            isJumping=true
            player.changeSprite('marioRJump')
            player.jump(currentJumpForce)
            play('bigJump', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            
        };
    })
    keyPress('up', ()=>{
        if(player.grounded()){
            isJumping=true
            player.changeSprite('marioRJump')
            player.jump(currentJumpForce)
            play('bigJump', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            
        };
    })
    keyPress('w', ()=>{
        if(player.grounded()){
            isJumping=true
            player.changeSprite('marioRJump')
            player.jump(currentJumpForce)
            play('bigJump', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            
        };
    })
    
    
    // mouseDown(rightBtn, ()=>{
    //     player.move(moveSpeed, 0)
    // }) 


    // mouseDown(leftBtn, ()=>{
    //     player.move(-moveSpeed, 0)
    // }) 

    // mouseDown(jumpBtn, ()=>{
    //     if(player.grounded()){
    //         isJumping=true
    //         player.jump(currentJumpForce)
    //         play('bigJump', {
    //             volume: 1.0,
    //             speed: 0.8,
    //             detune: 1200
    //         }) 
    //     }    
    // }) 

    // mouseDown(actionBtn, ()=>{
    //     if(player.collides('castle')){
    //         play('stageClear', {
    //             volume: 1.0,
    //             speed: 0.8,
    //             detune: 1200
    //         })
    //         levelSound.stop()

    //         go('game', {
    //             level: (level + 1) % maps.length,
    //             score: scoreLabel.value,
    //             isBig: isBig
                
    //         })
            
    //     }else{
    //         play('downPipe', {
    //             volume: 1.0,
    //             speed: 0.8,
    //             detune: 1200
                
    //     })

    //         levelSound.stop()
            
    //         go('game', {
    //             level: (level + 1) % maps.length,
    //             score: scoreLabel.value,
    //             isBig: isBig
                
    //         })
    //     }
    // }) 
 
})

scene('lose', ({score})=>{
    const credit = play('credits', {
        volume: 1.0,
        speed: 0.8,
        detune: 1200
    })
    // add([text('Up/Down controls credits', 16), origin('bot'), pos(width()/9, height())])
    add([text("You Lost", 20), origin('bot'), pos(width()/2, height()), 'credits'], credit),
    add([text("You had a score of " + score, 20), origin('bot'), pos(width()/2, height() + 100), 'credits'])
    add([sprite('mario'), scale(2), origin('bot'), pos(width()/8, height() + 50), 'credits'])
    add([sprite('shroom1'), scale(2), origin('bot'), pos(width() - 200, height() + 150), 'credits'])
    add([text("This game was developed by Austin Dober", 20), origin('bot'), pos(width()/2, height() + 200), 'credits'])
    add([text("Coded using Kaboom.js", 20), origin('bot'), pos(width()/2, height() + 300), 'credits'])
    add([sprite('castle'), scale(2), origin('bot'), pos(width()/8, height() + 250), 'credits'])
    add([sprite('bug'), scale(0.5), origin('bot'), pos(width() - 200, height() + 450), 'credits'])
    add([text("Deployed using Github Pages", 20), origin('bot'), pos(width()/2, height() + 400), 'credits'])
    add([sprite('blueShroom'), scale(1), origin('bot'), pos(width()/8, height() + 425), 'credits'])
    add([sprite('mushroom'), scale(2), origin('bot'), pos(width() - 200, height() + 600), 'credits'])
    add([text("See my portfolio @ austdobe.github.io, link is on landing page", 20), origin('bot'), pos(width()/2, height() + 500), 'credits'])
    add([sprite('prize'), scale(2), origin('bot'), pos(width()/8, height() + 700), 'credits'])
    add([text('Press "space" or "click" to play again', 20), origin('center'), pos(width()/2, height() + 600), 'credits'])
    add([text("Thanks for playing!", 20), origin('bot'), pos(width()/2, height() + 700), 'credits'])
    
    action('credits', (m) => {
        m.move(0, -50)
        keyDown('down', ()=>{
            m.move(0, 1)
        })
        keyDown('up', ()=>{
            m.move(0, -1)
        })
       
    })

   

    keyDown('space', ()=>{
        credit.stop()
        go('game', {level: 0, score:0, isBig: false})
    })
    mouseRelease(()=>{
        credit.stop()
        go('game', {level: 0, score:0, isBig: false})
    })
})
 
scene('win', ({score})=>{
    const credit = play('credits', {
        volume: 1.0,
        speed: 0.8,
        detune: 1200
    })
    // add([text('Up/Down controls credits', 16), origin('bot'), pos(width()/9, height())])
    add([text("Congrats, You won!!", 20), origin('bot'), pos(width()/2, height()), 'credits'], credit),
    add([text("You had a score of " + score, 20), origin('bot'), pos(width()/2, height() + 100), 'credits'])
    add([sprite('mario'), scale(2), origin('bot'), pos(width()/8, height() + 50), 'credits'])
    add([sprite('shroom1'), scale(2), origin('bot'), pos(width() - 200, height() + 150), 'credits'])
    add([text("This game was developed by Austin Dober", 20), origin('bot'), pos(width()/2, height() + 200), 'credits'])
    add([text("Coded using Kaboom.js", 20), origin('bot'), pos(width()/2, height() + 300), 'credits'])
    add([sprite('castle'), scale(2), origin('bot'), pos(width()/8, height() + 250), 'credits'])
    add([sprite('bug'), scale(0.5), origin('bot'), pos(width() - 200, height() + 450), 'credits'])
    add([text("Deployed using Github Pages", 20), origin('bot'), pos(width()/2, height() + 400), 'credits'])
    add([sprite('blueShroom'), scale(1), origin('bot'), pos(width()/8, height() + 425), 'credits'])
    add([sprite('mushroom'), scale(2), origin('bot'), pos(width() - 200, height() + 600), 'credits'])
    add([text("See my portfolio @ austdobe.github.io, link is on landing page", 20), origin('bot'), pos(width()/2, height() + 500), 'credits'])
    add([sprite('prize'), scale(2), origin('bot'), pos(width()/8, height() + 700), 'credits'])
    add([text('Press "space" or "click" to play again', 20), origin('center'), pos(width()/2, height() + 600), 'credits'])
    add([text("Thanks for playing!", 20), origin('bot'), pos(width()/2, height() + 700), 'credits'])
    
    action('credits', (m) => {
        m.move(0, -50)
        keyDown('down', ()=>{
            m.move(0, 1)
        })
        keyDown('up', ()=>{
            m.move(0, -1)
        })
       
    })

   

    keyDown('space', ()=>{
        credit.stop()
        go('game', {level: 0, score:0, isBig: false})
    })
    mouseRelease(()=>{
        credit.stop()
        go('game', {level: 0, score:0, isBig: false})
    })
})


start('game', {level: 0, score:0, isBig: false})