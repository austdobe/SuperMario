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
const isJumping = false;

loadRoot('./images/')
loadSprite( 'coin' , 'coin.png' )
loadSprite('shroom1' , 'shroom1.png')
loadSprite('block' , 'block.png' )
loadSprite( 'brick' , 'redBrick.png')
loadSprite('pipe', 'pipe.png')
loadSprite('prize', 'prizeBlock.png')
loadSprite('mario', 'mario.png')
loadSprite('blocked', 'prizedBlocked.png')
loadSprite('mushroom', 'mushroom.png')


// add([
//     sprite('mario')
// ])


scene("game", ({score}) => {
    layers(['bg', 'obj', 'ui'], 'obj' )

    const map =[
       
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '          *%                      ',
        '                                  ','                                  ',
        '     %  =====                     ',
        '                                  ',
        '                                  ',
        '      x                           ',
        '     xxx                          ',
        '    xxxxx         o               ',
        '   xxxxxxx    ^^             x    ',
        'xxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxx'
    ]

    const levelConfig = {
        width: 20,
        height: 20,
        '=' : [sprite( 'block'), solid()],
        'x' : [sprite( 'brick') , solid()],
        '^' : [sprite( 'shroom1'), solid(), 'dangerous'],
        'o' : [sprite( 'pipe'), solid(),scale(1.5)],
        '$' : [sprite( 'coin'), 'coin'],
        '%' : [sprite( 'prize'), solid(),'coin-prize'],
        '*' : [sprite( 'prize'), solid(),'mushroom-prize'],
        '~' : [sprite( 'mushroom'), 'mushroom'],
        '!' : [sprite('blocked'), solid()]     
    }

    const gameLevel = addLevel(map, levelConfig)

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score
        }
    ])

    const big = ()=>{
        let timer = 0;
        let isBig=true;
        return{
            update(){
                if(isBig){
                    currentJumpForce = bigJumpForce
                    timer-=dt();
                    if(timer <= 0){
                        this.smallify()
                    }
                }
            },
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                currentJumpForce = jumpForce
                timer = 0
                isBig = false
            },
            biggify(time){
                this.scale = vec2(2)
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),  
        origin('bot')
    ])

    action('mushroom', (m)=>{
        m.move(30, 0)
    })
    action('dangerous', (d)=>{
        
            d.move(-20,0)
    })

    player.on("headbump", (obj)=>{
        if(obj.is('coin-prize')){
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('!', obj.gridPos.sub(0, 0))
        }
        if(obj.is('mushroom-prize')){
            gameLevel.spawn('~', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('!', obj.gridPos.sub(0,0))

        }
    })

    player.collides('mushroom', (m)=>{
        destroy(m)
        player.biggify(10)
    })
    player.collides('coin', (c)=>{
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    player.collides('dangerous', (d) =>{
        if(player.isJumping){
            destroy(d)
        }else{
            go('lose', {score: score})
        }
    })

    
    keyDown('left', ()=>{
        player.move(-moveSpeed, 0);
    })
    keyDown('right', ()=>{
        player.move(moveSpeed, 0);
    })
    player.action(()=>{
        if(player.grounded()){
            isJumping=false
        }
    })
    keyDown('space', ()=>{
        if(player.grounded()){
            player.jump(currentJumpForce)
            isJumping=true
        };
    })
    
})

scene('lose', ({score})=>{
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
})

start('game', {score:0})