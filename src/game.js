// Criando as configurações base do jogo
const config = {
    type: Phaser.AUTO,    
    width: 360,
    height: 540, 

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300}, 
            debug: false
        }
    },

    scene: [CenaMenu, CenaJogo, CenaGameOver, CenaWin]
}

// Criando o jogo a partir das configurações estabelecidas
const game = new Phaser.Game(config)