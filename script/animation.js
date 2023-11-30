const sunPath="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"

const moonPath="M10.5 20C10.5 31.0457 20 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C20 0 10.5 8.9543 10.5 20Z"




const darkMode=document.querySelector('.dark-mode')
let toggle=false;

const toggleStr = localStorage.getItem('toggle')
if(toggle===null || toggle ===undefined){
  toggle=false;
}

if(toggleStr==='true') toggle=true;
else toggle=false;

darkMode.addEventListener('click',animate)

function animate(){
  let timeline = anime.timeline({
    duration : 750,
    easing : "easeOutExpo"
  });

  timeline.add({
    targets: ".sun-icon",
    d:(toggle)?[{value: sunPath}]:[{value:moonPath}]
  })

  timeline.add({
    targets: '.dark-mode',
    rotate: (toggle)?0:320,
    paddingBottom:(toggle)?0:30,
  },'-=400')
  timeline.add({
    targets: ".sun-icon",
    fill:(toggle)?"#FFD702":'#f5eae3'
  },'-=400')

  setTimeout(handleDark,1000)
  toggle=!toggle
  console.log(toggle);
  localStorage.setItem('toggle',String(toggle));
}

function handleDark(){
  if(toggle){
    document.querySelector('.top').classList.add('top-dark');
    document.querySelector('body').classList.add('body-dark');

    const divs=document.querySelectorAll('.board div')
    divs.forEach((elem)=>{elem.classList.add('div-dark')})

    const buttons =document.querySelectorAll('.center button');
    buttons.forEach((button)=>{button.classList.add('button-dark')})
  }
  else{
    document.querySelector('.top').classList.remove('top-dark');
    document.querySelector('body').classList.remove('body-dark');

    const divs=document.querySelectorAll('.board div')
    divs.forEach((elem)=>{elem.classList.remove('div-dark')})

    const buttons =document.querySelectorAll('.center button');
    buttons.forEach((button)=>{button.classList.remove('button-dark')})
  }
}

function startingIcon(){
  if(toggle){
    const sunIcon = document.querySelector('.sun-icon');
    sunIcon.setAttribute('d', moonPath);
    sunIcon.setAttribute('fill', '#f5eae3');
    const darkModeElem=document.querySelector('.dark-mode');
    darkModeElem.style.transform = 'rotate(320deg)';
    darkModeElem.style.paddingBottom=30;
  }
}

startingIcon();
handleDark();
console.log(toggle);