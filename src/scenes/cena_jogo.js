class CenaJogo extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaJogo' });
    }

    preload() {
        // Carregando assets necessários       
        this.load.image('map', 'assets/backgrounds/MAP.png');
        this.load.image('puffle', 'assets/puffle.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 16, frameHeight: 16 }); 
        this.load.spritesheet('emerald', 'assets/emerald.png', { frameWidth: 16, frameHeight: 16 }); 
        this.load.image('puffle2', 'assets/puffle2.png')
    }

    create() {
        // Criando variáveis para armazenar os valores string do placar e int da pontuação
        var pontuacao = 0;
        var placar;
        
        // Inicia a cena com animação de Fade In e adicionando fundo
        this.cameras.main.fadeIn(1000);
        this.mapImg = this.add.image(180, -300, 'map').setScale(0.73);

        // Adicionando o placar, contento o texto "Pontuação: " e o valor variável "pontuação"
        placar = this.add.text(30, 40, 'PONTUAÇÃO: ' + pontuacao, {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            color: '000000',
            fontWeight: '900'
        });
        
        // Torna a posição do placar fixa na tela 
        placar.setScrollFactor(0);

        // Definindo os limites do mundo
        this.physics.world.setBounds(0, 0, this.mapImg.width * this.mapImg.scaleX, this.mapImg.height * this.mapImg.scaleY);
        
        // Verificando orientação da tela e mudando o puffle de acordo
        if(game.scale.orientation === Phaser.Scale.LANDSCAPE){
            this.player = this.physics.add.sprite(180, 50, 'puffle').setScale(0.2);        
        } else if(game.scale.orientation === Phaser.Scale.PORTRAIT){
            this.player = this.physics.add.sprite(180, 50, 'puffle2').setScale(0.2);
        };

        // Criando a animação da esmeralda, adicionando-a e reproduzindo a animação
        this.anims.create({
            key: 'emeraldSpin',
            frames: this.anims.generateFrameNumbers('emerald', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        
        let emerald = this.physics.add.staticSprite(180, -1215, 'emerald').setScale(4)
        .play('emeraldSpin'); // Aplica a animação de rotação

        // Função para destruir a moeda e iniciar nova cena ao tocar na esmeralda
        this.physics.add.overlap(this.player, emerald, () => {
            emerald.destroy();
            this.scene.start('CenaWin')
        });
        
        // Criar array de nuvens e de moedas
        this.nuvens = [];
        this.moedas = [];

        // Determinando posição das nuvens
        const cloudPositions = [
            { x: 180, y: 300 },  
            { x: 100, y: 100 },  
            { x: 250, y: -150 },  
            { x: 150, y: -400 },  
            { x: 200, y: -650 },
            { x: 80, y: -900 }   
        ];

        // Criando animação da moeda
        this.anims.create({
            key: 'coinSpin',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });

        // Criando múltiplas nuvens 
        cloudPositions.forEach(pos => {
            let nuvem = this.physics.add.staticSprite(pos.x, pos.y, 'cloud')
                .setScale(0.1);
            
            // Ajustando a hitbox da nuvem
            let largura = nuvem.width * 0.1; 
            let altura = nuvem.height * 0.1 * 0.4; 

            nuvem.setSize(largura, altura);
            nuvem.setOffset((nuvem.width - largura) / 2, (nuvem.height - altura) / 2);

            // Adicionando colisão do puffle com todas as nuvens e determinando a velocidade vertical do "bounce" do player
            this.physics.add.collider(this.player, nuvem, () => {
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-400);
                }
            });

            // Adicionando as nuvens criadas ao array
            this.nuvens.push(nuvem);

            // Criando uma moeda acima de cada nuvem e reproduzindo a animação de girar
            let moeda = this.physics.add.staticSprite(pos.x, pos.y - 50, 'coin').setScale(1.4)
            .play('coinSpin'); 

            // Função para destruir a moeda e aumentar a pontuação em 10 ao tocar na moeda
            this.physics.add.overlap(this.player, moeda, () => {
                moeda.destroy();
                pontuacao += 10;        
                placar.setText('PONTUAÇÃO: ' + pontuacao); 
            });

            // Adicionando as moedas criadas ao array
            this.moedas.push(moeda);  // Adiciona a moeda ao array de moedas
        });

        // Criando controles do teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Definir a posição inicial da câmera
        this.initialCameraY = this.cameras.main.scrollY;
    }

    update() {
        this.player.setVelocityX(0);
    
        // Condicionais que possiblitam a movimentação dos personagens ao pressionar cada tecla
        if (this.cursor.left.isDown || this.keys.A.isDown) {
            this.player.setVelocityX(-160);
        } 
        else if (this.cursor.right.isDown || this.keys.D.isDown) {
            this.player.setVelocityX(160);
        }
    
        // Definindo o limite máximo que a câmera pode subir
        let maxCameraY = this.mapImg.height * this.mapImg.scaleY - this.cameras.main.height;
    
        //         // Adicionando limitação para não ultrapassar o limite do mapa
        if (this.player.y < this.cameras.main.scrollY + 180) {
            this.cameras.main.scrollY = Math.max(this.player.y - 180, maxCameraY * -2);
        }

        // Adicionando condição para gameover a partir da posição do scroll
        let limiteQueda = this.cameras.main.scrollY + this.game.config.height;
        if (this.player.y > limiteQueda) {
            this.scene.start('CenaGameOver')
        }
    }
    
}
