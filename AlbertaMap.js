window.onload = function(){

var canvas = document.getElementById("canvas");
var grid = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 720;
var img = new Image;
img.src = 'img/alberta.png';

var cities = [];
var citiesPowerData = [];

var draw = [];

function main(){
    setupGrid();
}

function setupGrid(){
    for(var i = 0; i < 10; i++){
        cities.push(Object.create(ElectricNode));
        cities[i].color = "#eeff0a";
        cities[i].x = (Math.random() * 160);
        cities[i].y = (Math.random() * 350);
        cities[i].r = 4;
        cities[i].power = 100;
        citiesPowerData.push(100);
    }
}

var ElectricNode = {
    x : 100,
    y : 200,
    r : 15,
    color : "#fffdf2",
    nodeColor : "#e800b9",
    power : 75,
    draw : function(){
        grid.fillStyle = this.color;
        grid.beginPath();
        grid.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        grid.fill();
    },
    drawConnectionTo : function(otherNode){
        grid.beginPath();
        //grid.shadowColor = "#32f8ff";
        //grid.shadowBlur = 1;
        this.nodeColor = 'rgba(0, 221, 255,' + this.power/100 + ')';
        grid.strokeStyle = this.nodeColor;
        grid.moveTo(this.x, this.y);
        grid.lineTo(otherNode.x, otherNode.y);
        grid.stroke();
        grid.closePath();
    }
}

function drawMap(){
    grid.clearRect(0, 0, canvas.width, canvas.height);
    grid.drawImage(img, 0, 0, 360, 680);
}

window.setInterval(function(){
    for(var i = 0; i < 10; i++){
        citiesPowerData[i] = Math.random() * 100;
    }
}, 200)

window.setInterval(function(){
    for(var i = 0; i < 10; i++){
        cities[i].power = citiesPowerData[i];
    }
}, 200);

window.setInterval(function(){
    drawMap();
    for(var i = 0; i < 10; i++){
        cities[i].draw();
    }

    for(var i = 0; i < 10; i++){
        cities[i].drawConnectionTo(cities[3]);
        cities[i].drawConnectionTo(cities[6]);
        cities[i].drawConnectionTo(cities[7]);
    }
}, 16);


main();

};