function Snake() {
    this.x = 0;
    this.y = 0;
    this.dx = scale;
    this.dy = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function () {
        ctx.fillStyle = 'rgb(0, 190, 25)';

        for (let i = 0; i < this.tail.length; i++) {
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, scale, scale)
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale - 1, scale - 1);
        }
        ctx.strokeRect(this.x, this.y, scale, scale)
        ctx.fillRect(this.x, this.y, scale - 1, scale - 1);
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.tail[i].x < 0) this.tail[i].x = canvas.width - scale;
            if (this.tail[i].x >= canvas.width) this.tail[i].x = 0;
            if (this.tail[i].y < 0) this.tail[i].y = canvas.height - scale;
            if (this.tail[i].y >= canvas.height) this.tail[i].y = 0;

            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total] = {
            x: this.x,
            y: this.y
        };

        if (this.x < 0) this.x = canvas.width - scale;
        if (this.x >= canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height - scale;
        if (this.y >= canvas.height) this.y = 0;
    }

    this.changeDirection = function (direction) {
        switch (direction) {
            case 'Up':
                this.dx = 0;
                this.dy = -scale;
                break;
            case 'Down':
                this.dx = 0;
                this.dy = scale;
                break;
            case 'Left':
                this.dx = -scale;
                this.dy = 0;
                break;
            case 'Right':
                this.dx = scale;
                this.dy = 0;
                break;
        }
    }

    this.eat = function (fruit) {
        if (this.x === fruit.x && this.y == fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    this.hit = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
                return true;
            }
        }
        return false;
    }
}