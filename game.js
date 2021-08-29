kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    crisp:true,
    debug: true,
    clearColor: [0,0,0,1]
})

const moveSpeed = 100;
const jumpForce = 360;
const bigJumpForce = 550
let currentJumpForce = jumpForce 
let canBreak = false
let isJumping = true;
let isBig=false;
let enemyXSpeed = -20;
let enemyYSpeed = -20;
const fallDeath = 1000;
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
loadSprite('mario', 'mario.png')
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
            '                                                                                                          ',
            '                                                                                                  xxxxx   ',
            '                                 xxxxxx                                                                   ',
            '                                                                                         xxxxx            ',
            '                      %%                                                                                  ',
            '                xxx                       xxx                                                     xxxxxxxx',
            '                                                                                                          ',
            '          *%          xxxx       xxxxxx                                                                   ',
            '                                                                                          xxxxxx          ',
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
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp', 
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
            'pwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',

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
    let levelSound = null;
    const backgroundArray=['levelOneBackground', 'skyImage', 'undergroundBackground','brickBackground'];
    const soundArray=['main','sky', 'underground', 'finalMap', 'bonusSound']
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
        width: 20,
        height: 20,
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

    const big = ()=>{  
        
        return{
            smallify(){
                player.scale = vec2(1)
                currentJumpForce = jumpForce
                isBig = false
                canBreak = false
            },
            biggify(){
                player.scale = vec2(1.5)
                currentJumpForce = bigJumpForce
                isBig = true
                canBreak= true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(50, 100),
        body(),
        big(),
        determineLevelEffects(), 
        origin('bot')
    ])

    action(player,(isBig)=>{
        if(isBig){
            player.biggify()
        }
    })

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
            if(canBreak){
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
        player.biggify()
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
            player.smallify()
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
    })

    player.collides('nextLevel', ()=>{
        keyDown('down', ()=>{
            play('downPipe', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            levelSound.stop()
            
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value,
                
            })
        })
    })
       
    keyDown('left', ()=>{
        player.move(-moveSpeed, 0);
    })
    keyDown('right', ()=>{
        player.move(moveSpeed, 0);
    })

    player.action(()=>{
        if(player.grounded()){
            isJumping = false
        }else[
            isJumping = true
        ]
    })
    keyDown('space', ()=>{
        if(player.grounded()){
            isJumping=true
            player.jump(currentJumpForce)
            play('bigJump', {
                volume: 1.0,
                speed: 0.8,
                detune: 1200
            })
            
        };
    })
    
})

scene('lose', ({score})=>{
    add([text("You lose!", 32), origin('left'), pos(width()/4, height()/4)]),
    add([text("You had a score of " + score, 32), pos(width()/4, height()/4 + 100)])
    const redo = add([
        text('"click" mouse or hit "space" to play again', 24),
        origin('left'), 
        pos(width()/4, height()/4 + 250),
        color(100, 100, 100)
    ])

    keyDown('space', ()=>{
        go('game', {level: 0, score:0})
    })
    mouseRelease(()=>{
        go('game', {level: 0, score:0})
    })
})
 
const setControllers=()=>{
    const controller = document.getElementById('controller')
    const rightArrow = document.createElement('button')
    const leftArrow = document.createElement('button')
    const spaceBar = document.createElement('button')
    rightArrowClass.createAttribute('class')
    rightArrowClass.value ="fas fa-long-arrow-alt-right"
    rightArrow.setAttributeNode(rightArrowClass)
    controller.appendChild(rightArrow)
}

start('game', {level: 0, score:0})