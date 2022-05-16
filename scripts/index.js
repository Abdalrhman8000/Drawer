const drawer = document.getElementById('drawer');
const body = document.querySelector('body');
const tools = document.querySelector('.tools');
const clear = document.querySelector('.clear');
const inputs = document.querySelectorAll('input');
const ponsher = document.querySelector('.ponsher');
let is_drawing = false;
let gomer = false;
let colorData = inputs[0].value;
let widthData = inputs[2].value;
const ctx = drawer.getContext('2d');
drawer.width = window.innerWidth;
drawer.height = body.getClientRects()[0].height - tools.getClientRects()[0].height;



ctx.fillStyle = 'white';
ctx.fillRect(0, 0, drawer.width, drawer.height);


drawer.addEventListener('touchstart', start, false);
drawer.addEventListener('touchmove', draw, false);
drawer.addEventListener('mousedown', start, false);
drawer.addEventListener('mousemove', draw, false);

drawer.addEventListener('touchmove', goma, false);
drawer.addEventListener('mousemove', goma, false);


drawer.addEventListener('touchend', end, false);
drawer.addEventListener('mouseout', end, false);
drawer.addEventListener('mouseup', end, false);

clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, drawer.width, drawer.height);
    ctx.fillRect(0, 0, drawer.width, drawer.height);
});

ponsher.addEventListener('click', (e) => {
    gomer = true;
    e.target.style.pointerEvents = 'none';
    console.log('test');
})


inputs[0].addEventListener('change', (e) => {
    colorData = e.target.value;
})
inputs[1].addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, drawer.width, drawer.height);
    document.documentElement.style.setProperty('--backColor', e.target.value);
})
inputs[2].addEventListener('change', (e) => {
    widthData = e.target.value;
})


function start(e) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    e.preventDefault();
    ponsher.style.pointerEvents = 'all';
}

function draw(e) {
    if (is_drawing) {
        ctx.lineTo(e.clientX, e.clientY)
        ctx.strokeStyle = colorData;
        ctx.lineWidth = widthData;
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
    } else {
        ponsher.style.rigth = `2%`;
        ponsher.style.top = `2%`;
        gomer = false;
    }
}

function goma(e) {
    let postionLeft = e.offsetX - (ponsher.getClientRects()[0].width / 2);
    let postionTop = e.offsetY - (ponsher.getClientRects()[0].width / 2);
    if (gomer) {
        ctx.clearRect(postionLeft, postionTop, 50, 50)
        ponsher.style.left = `${postionLeft}px`;
        ponsher.style.top = `${postionTop}px`;
        is_drawing = false;
    }
}