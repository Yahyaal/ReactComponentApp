//I explored 2 different ways to get the loader CSS to work. 
//The HTML5 version proved to be the best way to go, by far, so that's what's seen here.

// requestAnimationFrame Shim
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 75;
var endPercent = Math.floor(Math.random() * 100);
// var cpuUsage2;
// setInterval(function () {
//     cpuUsage2 = machineObj(10);
//     console.log('cpuUsage22: ', cpuUsage);
// }, 3000);
// console.log('endPercent:', endPercent);
// console.log('cpuUsage: ', cpuUsage); 
// console.log('cpuUsage2: ', cpuUsage2); 
// console.log('machineObj: ', machineObj(10));
var curPerc = 0;
var counterClockwise = false;
var circ = Math.PI * 2;
var quart = Math.PI / 2;

context.lineWidth = 10;
context.strokeStyle = '#ee2247';
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;
context.shadowBlur = 10;
context.shadowColor = '#656565';


function animate(current) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
    context.lineCap = 'round';
    context.stroke();
    curPerc++;
    if (curPerc < endPercent) {

        var percentStr = curPerc + '%';
        // $(".numbers").html(percentStr);
        requestAnimationFrame(function () {
            animate(curPerc / 100)
        });
    }
}

//setTimeout(window.randomize, 200);
//$('#myCanvas').click(window.randomize);
animate();

// $('body').on('click', function () {
//     curPerc = 0;
//     console.log('cpuObj: ', cpuObj);
//     endPercent = cpuObj.cpuUsage //Math.floor(Math.random() * 100);
//     console.log('endPercent55: ', endPercent);

//     animate();
// });
