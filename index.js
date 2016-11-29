var PIXI = require("pixi.js");
var Tone = require("tone");
var tsne = require("./tsne.js");

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 10;

var canvas = document.getElementById("canvas");
var renderer = new PIXI.WebGLRenderer(width, height, {
	view: canvas,
	antialias: true
});
renderer.backgroundColor = 0xffffff;

var stage = new PIXI.Container();

var circles = [];

for(var key in tsne){
	let xpos = tsne[key].x * width;
	let ypos = tsne[key].y * height;
	let circle = new PIXI.Graphics();
	circle.hitArea = new PIXI.Circle(xpos, ypos, radius);
	circle.interactive = true;
	circle.lineStyle ( 1 , 0x000000,  1);
	circle.beginFill(0x55728A, 0.5);
	circle.drawCircle(xpos, ypos, radius);
	circle.endFill();
	circle.text = new PIXI.Text(key, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
	circle.text.x = xpos;
	circle.text.y = ypos;
	circle.text.renderable = false;
	circle.name = key;

	circle.player = new Tone.Player("./samples/" + tsne[key].fileName.replace(".wav", ".mp3")).toMaster();
	
	circle.on("mouseover", function(){
		if(this.renderable){
			this.player.start();
			this.text.renderable = true;
		}
	});
	circle.on("mouseout", function(){
		if(this.renderable) this.text.renderable = false;
	})
	
	stage.addChild(circle);
	stage.addChild(circle.text);

	circles.push(circle);
}

function filter(term){
	circles.forEach(function(circle){
		if(circle.name.includes(term) || term === ""){
			circle.renderable = true;
		} else {
			circle.renderable = false;
		}
	})
}

var filterField = document.getElementById("text-filter");

filterField.onkeydown = function(e){
	filter(filterField.value);
}

function animate() {
    // Render the stage
    renderer.render(stage);
    requestAnimationFrame(animate);
}

animate();