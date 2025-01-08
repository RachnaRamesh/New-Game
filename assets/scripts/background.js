class Background {
    constructor(game){
        this.game = game ;
        this.image = document.getElementById('background');
        this.width = 2400;
        this.height = this.game.baseHeight;
        this.x;
    }
    update() {
        this.x -= 0.5; // Move background to the left
        if (this.x <= -this.width) this.x = 0; // Loop the background
    }
    

    draw() {
        this.game.ctx.drawImage(this.image, this.x, 0, this.width, this.height);
        // Draw a second image to create a seamless loop
        this.game.ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    }

    resize() {
        this.x = 0;
    }
}