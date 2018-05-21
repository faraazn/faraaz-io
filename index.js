var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.001;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 2 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}


function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}


$(document).ready(function(){
	for (i = 0; i < 25; i++) {
		var $svg = $("#squares");
		var $rect = $(SVG('rect'));
		
		var classes = new Array('small', 'big');
		var class_ind = Math.floor(Math.random()*2);
		
		var maxSideLengths = new Array(100, 200);
		var minSideLengths = new Array(30, 100);
		var multipliers = new Array(1.3, 1.0);
		var maxSideLen = maxSideLengths[class_ind];
		var minSideLen = minSideLengths[class_ind];
		var sideLength = Math.random()*(maxSideLen-minSideLen) + minSideLen;
		var multiplier = multipliers[class_ind];
		var height = sideLength*multiplier;
		var width = sideLength;		

		var maxTimes = new Array(55, 80);
		var minTimes = new Array(25, 50);
		var maxTime = maxTimes[class_ind];
		var minTime = minTimes[class_ind];
		var animationTime = Math.random()*(maxTime-minTime)+minTime;
		
		var maxOpacities = new Array(0.35, 0.2);
		var minOpacities = new Array(0.2, 0.1);
		var maxOpacity = maxOpacities[class_ind];
		var minOpacity = minOpacities[class_ind];
		var opacity = Math.random()*(maxOpacity-minOpacity)+minOpacity;
		
		var colors = new Array('#FFF', '#FFF');
		var color = colors[class_ind];
		var xPos = Math.random()*100;
		var animationDelay = Math.random()*-80;
		$rect.css({
			x: xPos+"%",
			width: width+"px",
			height: height+"px",
			fill: color,
			opacity: opacity,
			animation: "rise "+animationTime+"s infinite "+animationDelay+"s linear"
		});
		$rect.appendTo($svg); 

	}
});



setInterval(updateGradient,10);

