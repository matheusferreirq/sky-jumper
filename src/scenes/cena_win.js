class CenaWin extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaWin'})
    }

    preload() {
        // Carregando assets necessários
        this.load.image('win', 'assets/screens/screenWon.png')
        this.load.image('playAgainButton', 'assets/buttons/playAgainButton.png')
        this.load.image('menuButton', 'assets/buttons/menuButton.png')
    }

    create() {
        // Inicia a cena com um Fade In        
        this.cameras.main.fadeIn(1000)
        
        // Adicionando a tela "Vitória"
        this.add.image(180, 270, 'win')

        // Adiciondo botão "Menu" e atribuindo interatividade a ele.
        var menuButton = this.add.image(180, 420, 'menuButton').setScale(0.35);
        menuButton.setInteractive();

        // Animação de hover
        menuButton.on("pointerover", () => {
            this.tweens.add({
                targets: menuButton,
                scaleX: 0.39,
                scaleY: 0.39, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        menuButton.on("pointerout", () => {
            this.tweens.add({
                targets: menuButton,
                scaleX: 0.35,
                scaleY: 0.35, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        // Ação do clique do botão
        menuButton.on("pointerdown", () => {
            this.tweens.add({
                targets: menuButton,
                scaleX: 0.35,
                scaleY: 0.35,
                duration: 100,
                repeat: 0, 
                ease: "Sine.easeOut",
            });
            if (!this.clicado) {
                this.clicado = true;
                // Fade out da câmera
                this.cameras.main.fadeOut(650);
                this.proximaCena = "CenaMenu"
            }
        });

        menuButton.on("pointerup", () => {
            this.tweens.add({
                targets: menuButton,
                scaleX: 0.39,
                scaleY: 0.39,
                duration: 100, 
                repeat: 0,
                ease: "Sine.easeIn"
            })
        })
        
        // Adicionando botão "Jogar novamente" e atribuindo interatividade a ele
        var playAgainButton = this.add.image(180, 345, 'playAgainButton').setScale(0.35);
        playAgainButton.setInteractive();

        // Animação de hover
        playAgainButton.on("pointerover", () => {
            this.tweens.add({
                targets: playAgainButton,
                scaleX: 0.39,
                scaleY: 0.39, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        playAgainButton.on("pointerout", () => {
            this.tweens.add({
                targets: playAgainButton,
                scaleX: 0.35,
                scaleY: 0.35, 
                duration: 300,
                repeat: 0,
                ease: "Sine.easeOut"
            });
        });

        // Ação do clique do botão
        playAgainButton.on("pointerdown", () => {
            this.tweens.add({
                targets: playAgainButton,
                scaleX: 0.35,
                scaleY: 0.35,
                duration: 100,
                repeat: 0, 
                ease: "Sine.easeOut",
            });
            if (!this.clicado) {
                this.clicado = true;
                // Fade out da câmera
                this.cameras.main.fadeOut(650);
                this.proximaCena = "CenaJogo"
            }
        });

        playAgainButton.on("pointerup", () => {
            this.tweens.add({
                targets: playAgainButton,
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
            this.scene.start(this.proximaCena); 
        });
    }
}