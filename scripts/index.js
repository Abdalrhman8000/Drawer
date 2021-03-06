"use strict";
var drawer = document.getElementById('drawer');
var body = document.querySelector('body');
var tools = document.querySelector('.tools');
var clear = document.querySelector('.clear');
var inputs = document.querySelectorAll('input');
var ponsher = document.querySelector('.ponsher');
var is_drawing = false;
var gomer = false;
var colorData = inputs[0].value;
var widthData = inputs[2].value;
var ctx = drawer.getContext('2d');
drawer.width = window.innerWidth;
drawer.height = body.getClientRects()[0].height - tools.getClientRects()[0].height;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, drawer.width, drawer.height);
drawer.addEventListener('touchstart', start, false);
drawer.addEventListener('touchmove', draw, false);
drawer.addEventListener('mousedown', start, false);
drawer.addEventListener('mousemove', draw, false);
drawer.addEventListener('touchmove', goma, false);
drawer.addEventListener('touchend', gomaEnd, false);
drawer.addEventListener('mousemove', goma, false);
drawer.addEventListener('touchend', end, false);
drawer.addEventListener('touchcancel', end, false);
drawer.addEventListener('mouseout', end, false);
drawer.addEventListener('mouseup', end, false);
clear.addEventListener('click', function (e) {
    ctx.clearRect(0, 0, drawer.width, drawer.height);
    ctx.fillRect(0, 0, drawer.width, drawer.height);
});
ponsher.addEventListener('click', function (e) {
    gomer = true;
    console.log('clicked');
    var ele = e.target;
    ele.style.pointerEvents = 'none';
});
inputs[0].addEventListener('input', function (e) {
    var ele = e.target;
    colorData = ele.value;
});
inputs[1].addEventListener('input', function (e) {
    var ele = e.target;
    ctx.fillStyle = ele.value;
    ctx.fillRect(0, 0, drawer.width, drawer.height);
    document.documentElement.style.setProperty('--backColor', ele.value);
});
inputs[2].addEventListener('input', function (e) {
    var ele = e.target;
    if (+ele.value > 100) {
        ele.value = '';
        e.preventDefault();
    }
    else {
        widthData = ele.value;
    }
});
function start(e) {
    is_drawing = true;
    ctx.beginPath();
    if (e.type == 'touchstart') {
        ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
    }
    else {
        ctx.moveTo(e.clientX, e.clientY);
    }
    ponsher.style.pointerEvents = 'all';
    e.preventDefault();
}
function draw(e) {
    if (is_drawing) {
        if (e.type == 'touchmove') {
            ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        }
        else {
            ctx.lineTo(e.clientX, e.clientY);
        }
        ctx.strokeStyle = colorData;
        ctx.lineWidth = +widthData;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    e.preventDefault();
}
function end(e) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    if (gomer && e.type == 'mouseout') {
        gomer = false;
    }
    else {
        ponsher.style.right = "2%";
        ponsher.style.top = "2%";
        gomer = false;
    }
}
function goma(e) {
    var postionLeft;
    var postionTop;
    if (e.type == 'touchmove') {
        postionLeft = e.touches[0].clientX - (ponsher.getClientRects()[0].width / 2);
        postionTop = e.touches[0].clientY - (ponsher.getClientRects()[0].width / 2);
        console.log(postionLeft);
    }
    else {
        postionLeft = e.offsetX - (ponsher.getClientRects()[0].width / 2);
        postionTop = e.offsetY - (ponsher.getClientRects()[0].width / 2);
    }
    if (gomer) {
        ctx.clearRect(postionLeft, postionTop, 50, 50);
        ponsher.style.left = "".concat(postionLeft, "px");
        ponsher.style.top = "".concat(postionTop, "px");
        is_drawing = false;
    }
    e.preventDefault();
}
function gomaEnd(e) {
    gomer = false;
    e.preventDefault();
}
