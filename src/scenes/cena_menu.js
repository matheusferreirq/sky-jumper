class CenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaMenu' });
    }

    preload() {
        // Carregando assets necessários
        this.load.image('skybg', 'assets/backgrounds/skybackground.jpg');
        this.load.image('logo', 'assets/skyjumper-logo.png');
        this.load.image('playButton', 'assets/buttons/playButton.png');
        this.load.image('tutButton', 'assets/buttons/tutButton.png');
        this.load.image('tutorial', 'assets/screens/tutorial.png');
        this.load.image('entendidoButton', 'assets/buttons/entendidoButton.png')

    }

    create() {
        // Inicia a cena com um Fade In
        this.cameras.main.fadeIn(1000)

        // Adicionando fundo
        this.background = this.add.image(0, 270, 'skybg');
        this.background.setScale(1.5);
        
        // Adicionando logo da tela inicial e atribuindo animação a ele.
        var logoo = this.add.image(180, 150, 'logo').setScale(0.7);
        this.tweens.add({
            targets: logoo,
            scaleX: 0.6, 
            scaleY: 0.6,
            duration: 500, 
            yoyo: true, 
            repeat: -1, 
            ease: "Sine.easeInOut" 
        });

        // Adicionando botão "jogar" e atribuindo interatividade a ele
        var botao = this.add.image(180, 270, 'playButton').setScale(0.35);
        botao.setInteractive();

        // Animação de hover
        botao.on("pointerover", () => {
            this.tweens.add({
                targets: botao,
                scaleX: 0.39,
                scaleY: 0.39, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        botao.on("pointerout", () => {
            this.tweens.add({
                targets: botao,
                scaleX: 0.35,
                scaleY: 0.35, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
            botao.setAlpha(1);
        });

        // Ação do clique do botão
        botao.on("pointerdown", () => {
            this.tweens.add({
                targets: botao,
                scaleX: 0.35,
                scaleY: 0.35,
                duration: 100,
                repeat: 0, 
                ease: "Sine.easeOut",
            });
            if (!this.clicado) {
                this.clicado = true;
                this.cameras.main.fadeOut(1000);
            }
        });

        botao.on("pointerup", () => {
            this.tweens.add({
                targets: botao,
                scaleX: 0.39,
                scaleY: 0.39,
                duration: 100, 
                repeat: 0,
                ease: "Sine.easeIn"
            })
        })

        // Após o fadeOut terminar, começa a próxima cena
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.clicado = false
            this.scene.start("CenaJogo");
        });

        // Botão Tutorial
        var tutButton = this.add.image(180, 340, 'tutButton').setScale(0.35);
        tutButton.setInteractive();

        // Animação de hover
        tutButton.on("pointerover", () => {
            this.tweens.add({
                targets: tutButton,
                scaleX: 0.39,
                scaleY: 0.39, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        tutButton.on("pointerout", () => {
            this.tweens.add({
                targets: tutButton,
                scaleX: 0.35,
                scaleY: 0.35, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        // Ação do clique do botão
        tutButton.on("pointerdown", () => {
            this.tweens.add({
                targets: tutButton,
                scaleX: 0.35,
                scaleY: 0.35,
                duration: 100,
                repeat: 0, 
                ease: "Sine.easeOut",
            });
            tutorialScreen.setVisible(true)
            botaoEntendido.setVisible(true)
            this.tweens.add({
                targets: tutorialScreen,
                y: 270,
                duration: 1000,
                repeat: 0,
                ease: "Sine.easeInOut"
            })
            this.tweens.add({
                targets: botaoEntendido,
                y: 430,
                alpha: 1,
                duration: 1010,
                ease: "Sine.easeInOut"
            })
        });

        tutButton.on("pointerup", () => {
            this.tweens.add({
                targets: tutButton,
                scaleX: 0.39,
                scaleY: 0.39,
                duration: 100, 
                repeat: 0,
                ease: "Sine.easeIn"
            })
        })

        // Adicionando UI que contém o tutorial
        var tutorialScreen = this.add.image(180, 800, 'tutorial').setVisible(false)
        
        //Adicionando o botão de "Entendido" e atribuindo interatividade a ele
        var botaoEntendido = this.add.image(180,800, 'entendidoButton')
        .setVisible(false)
        .setScale(0.35)
        .setAlpha(0)
        .setInteractive()
        .on("pointerdown", ( )=> {
            this.tweens.add({
                targets: botaoEntendido,
                scaleX: 0.30,
                scaleY: 0.30,
                duration: 100,
                repeat: 0, 
                ease: "Sine.easeOut",
            });
            botaoEntendido.setVisible(false)
            tutorialScreen.setVisible(false)
        })

        // Inicializa a variável ida como falsa
        this.ida = false;
    }

    update() {

        // Estrutura de repetição que permite movimentação do fundo
        while (this.background.x <= 475 && this.ida === true) {
            this.background.x += 0.5;
            break;
        }
        
        while (this.background.x > 0 && this.ida === false) {
            this.background.x -= 0.5;
            break; 
        }
    
        // Estrutura de condicionais que estabelece as condições da ida
        if (this.background.x <= 0) {
            this.ida = true;
        } else if (this.background.x >= 475) {
            this.ida = false;
        }    
    }
}
