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
drawer.addEventListener('touchend', gomaEnd, false);
drawer.addEventListener('mousemove', goma, false);

drawer.addEventListener('touchend', end, false);
drawer.addEventListener('touchcancel', end, false);
drawer.addEventListener('mouseout', end, false);
drawer.addEventListener('mouseup', end, false);



clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, drawer.width, drawer.height);
    ctx.fillRect(0, 0, drawer.width, drawer.height);
});

ponsher.addEventListener('click', (e) => {
    gomer = true;
    console.log('clicked');
    e.target.style.pointerEvents = 'none';
})


inputs[0].addEventListener('input', (e) => {
    colorData = e.target.value;
})
inputs[1].addEventListener('input', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, drawer.width, drawer.height);
    document.documentElement.style.setProperty('--backColor', e.target.value);
})
inputs[2].addEventListener('input', (e) => {
    if (e.target.value > 100) {
        e.target.value = '';
        e.preventDefault();
    } else {
        widthData = e.target.value;
    }
})

function start(e) {
    is_drawing = true;
    ctx.beginPath();
    if (e.type == 'touchstart') {
        ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
    } else {
        ctx.moveTo(e.clientX, e.clientY);
    }
    ponsher.style.pointerEvents = 'all';
    e.preventDefault();
}

function draw(e) {
    if (is_drawing) {
        if (e.type == 'touchmove') {
            ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        } else {
            ctx.lineTo(e.clientX, e.clientY);
        }
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
    let postionLeft;
    let postionTop;
    if (e.type == 'touchmove') {
        postionLeft = e.touches[0].clientX - (ponsher.getClientRects()[0].width / 2);
        postionTop = e.touches[0].clientY - (ponsher.getClientRects()[0].width / 2);
        console.log(postionLeft);

    } else {
        postionLeft = e.offsetX - (ponsher.getClientRects()[0].width / 2);
        postionTop = e.offsetY - (ponsher.getClientRects()[0].width / 2);
    }
    if (gomer) {
        ctx.clearRect(postionLeft, postionTop, 50, 50)
        ponsher.style.left = `${postionLeft}px`;
        ponsher.style.top = `${postionTop}px`;
        is_drawing = false;
    }
    e.preventDefault();
}

function gomaEnd(e) {
    gomer = false;
    e.preventDefault();
}