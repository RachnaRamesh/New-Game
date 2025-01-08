class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.player = new Player(this);
        this.gravity;
        this.obstacles = [];
        this.numberOfObstacles = 10;
        this.background = new Background(this);
        this.speed = 3;
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') this.player.flap();
        });

        window.addEventListener('touchstart', e => {
            this.player.flap();
        });

        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();
        });

        // Create obstacles initially
        this.createObstacles();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'blue';
        this.ctx.font = '30px Bungee';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.gravity = 0.20 * this.ratio;
        this.background.resize();
        this.player.resize();

        // Resize existing obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
    }

    formatTimer() {
        return (this.timer * 0.001).toFixed(1); // Format timer to 1 decimal place
    }

    render(deltaTime) {
        this.timer += deltaTime; // Increment timer by deltaTime (ms)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.background.update(); // Update background first
        this.background.draw(); // Draw background first
        this.drawStatusText();
        this.player.update();
        this.player.draw();

        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });

        this.handleObstacles();
    }

    createObstacles() {
        this.obstacles = [];
        const firstX = this.width;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }

    handleObstacles() {
        // Increment score when obstacles are passed
        this.obstacles.forEach(obstacle => {
            if (!obstacle.passed && obstacle.x + obstacle.scaledWidth < this.canvas.width / 2) {
                this.score++;
                obstacle.passed = true;
            }
        });

        // Remove obstacles marked for deletion
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.markedForDeletion);

        if (this.obstacles.length === 0) {
            this.gameOver = true;
        }
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.fillStyle = 'blue';
        this.ctx.font = '30px Bungee';
        this.ctx.fillText('SCORE: ' + this.score, 10, 30);
        this.ctx.fillText('TIMER: ' + this.formatTimer(), 10, 60); // Show the timer formatted
        if(this.gameOver){
            this.ctx.fillText('GAME OVER', this.width * 0.5, this.height *0.5);
        }
        this.ctx.restore();
    }
}
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;
    ctx.fillStyle = 'gold';

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});
