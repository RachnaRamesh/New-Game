class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height * 0.5 - this.scaledHeight);
        this.speedY = Math.random() < 0.5 ? -1 : 1;
        this.markedForDeletion = false;
        this.passed = false; // Track if the obstacle has been passed
    }

    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;

        if (this.y <= 0 || this.y >= this.game.height - this.scaledHeight) {
            this.speedY *= -1;
        }

        if (this.isOffScreen()) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    }

    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }

    isOffScreen() {
        return this.x < -this.scaledWidth;
    }
}
