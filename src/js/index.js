let stars = 100;
const screenW = window.innerWidth;
const screenH = window.innerHeight;

function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}

function animation(event){
    document.querySelector('.stars').style.left = `-${event.clientX / 3}px`;
    document.querySelector('.stars').style.top = `-${event.clientY / 3}px`;
}

for(let i = 1; i<= stars; i++){
  document.querySelector('.stars').innerHTML += `
    <div class="star star-${i}" style="left:${Math.round(Math.random() * 100)}%; top:${Math.round(Math.random() * 100)}%;"></div>
  `;
}

document.addEventListener('mousemove',throttled(1000, animation));
