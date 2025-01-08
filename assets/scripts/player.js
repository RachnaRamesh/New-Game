class Player {
    constructor(game){
        this.game = game;
        this.x = 20;
        this.y = 60;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = 200;
        this.height = 200;
        this.speedY = 0;  // Initialize with 0 to avoid initial upward movement
        this.flapSpeed;
    }

    draw(){
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (!this.isTouchingBottom()){
            this.speedY += this.game.gravity;  // Apply gravity continuously
            this.y += this.speedY;  // Update position
        } else {
            this.y = this.game.height - this.height;  // Ensure it stays at the bottom
            this.speedY = 0;  // Reset speedY to avoid upward movement
        }
    }

    resize(){
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5; 
        this.speedY = 0;  // Reset speed on resize to avoid immediate upward movement
        this.flapSpeed = 5 * this.game.ratio;
    }

    isTouchingTop(){
        return this.y <=0;
    }

    isTouchingBottom() {
        return this.y >= this.game.height - this.height;
    }

    flap() {
        if(!this.isTouchingTop()){
            this.speedY = -this.flapSpeed;
    }
}
}