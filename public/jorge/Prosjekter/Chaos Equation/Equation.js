class Equation{
    constructor(equationX, equationY){
        this.color = "black";
        //console.log(equationX)
        this.equationX = new Function("t", equationX);
        this.equationY = new Function("t", equationY);
        //console.log("after", this.equationX.toString())
    }

    draw(context, time){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.equationX(time), this.equationY(time), 5, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}