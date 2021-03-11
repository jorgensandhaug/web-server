const fruitIMG = document.getElementById("fruitIMG");

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function () {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        for (let i = 0; i < snake.tail.length; i++) {
            if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                fruit.pickLocation();
            }
        }
    }

    this.draw = function () {
        ctx.drawImage(fruitIMG, this.x, this.y, scale, scale);
    }
}