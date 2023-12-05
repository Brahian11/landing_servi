var nav = document.getElementById('main-nav');
nav.addEventListener('click', function(){
	nav.classList.toggle('mostrar');
});

const imgs = document.querySelectorAll('.imgg');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function layout() {
  const xOffsetStep = 100;
  const count = imgs.length;
  const scaleStep = 0.6;
  const opacityStep = 0.1;
  
  for(let i = 0; i < imgs.length; i++){
    imgg = imgs[i];
    const sign = Math.sign(i - index);

    let xOffset = (i - index) * xOffsetStep;
    if(i!==index) {
      xOffset = xOffset + 80 * sign;
    }
    const scale = scaleStep ** Math.abs(i - index);
    const rotateY = i === index ? 0 : 30 * -sign;
    imgg.style.transform = `perspective(800px) translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
    
    let opacity = opacityStep ** Math.abs(i - index);
    if(Math.abs(i - index) > 2) {
      opacity = 0
    }
    imgg.style.opacity = opacity;
    
    imgg.style.zIndex = count - Math.abs(index - i);
    
  }
}
layout();

next.addEventListener('click', ()=>{ 
  index++;
  if(index > imgs.length-1){
    index = imgs.length-1;
  }
  layout();
})

prev.addEventListener('click', ()=>{ 
  index--;
  if(index < 0){
    index = 0;
  }
  layout();
})

console.log(index)



const track = document.getElementById("image-track");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt == "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, -15), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({transform: `translate(${nextPercentage}%, -50%)`},{ duration: 1200, fill: "forwards" });

  let children = document.getElementById("image-track").childElementCount;

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${nextPercentage / children + (50+50/children)}% center`}, { duration: 1200, fill: "forwards"});
  }
}




function toggleImage(smallImage) {
    const bigImage = document.getElementById('big-image');
    const smallImages = document.querySelectorAll('.product-small-image img');
    bigImage.classList.add('fade-out');
    setTimeout(() => {
        bigImage.src = smallImage.src;
        bigImage.classList.remove('fade-out');
    }, 500);
    smallImages.forEach((image) => {
        if (image !== smallImage) {
            image.classList.remove('active');
        }
    });
    smallImage.classList.add('active');
}

