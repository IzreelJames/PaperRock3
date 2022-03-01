const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
// let yourScoreSpan = [];
// let computerScoreSpan = [];


const SELECTIONS = [
{
    name: 'Rock',
    emoji: '✊',
    beats: 'Scissors',
    score: 2
},
{
    name: 'Scissors',
    emoji: '✌️',
    beats: 'Paper',
    score: 2
},
 {
    name: 'Paper',
    emoji: '✋',
    beats: 'Rock',
    score: 2
 }
]

class Click {
    constructor(){
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
}
}

const click1 = document.createElement('audio');
click1.src = 'sound/bird_poo.flac'

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    // console.log(computerSelection)
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection,yourWinner)

   if(yourWinner) incrementScore(yourScoreSpan)
  
   if(Click.sound == 'sound1'){
       click1.play()

   }else{
               click1.play()
           }
   
   if(computerWinner) incrementScore(computerScoreSpan)
   if(computerWinner.score ==2){
       console.log('Computer Wins')
   }
}


function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}



function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
div.classList.add('result-selection')
if(winner) div.classList.add('winner')

finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}




const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;


window.addEventListener('resize', function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
   
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for ( let i = 0; i < 7; i++){
        particlesArray.push(new Particle());
         }

})


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2)
        ctx.fill();

    }

}

// function init(){
//     for (let i = 0; i < 120; i++){
//         particlesArray.push(new Particle());
//     }
// }
// init();


function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance =  Math.sqrt(dx * dx + dy * dy)
            if (distance < 150){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                // ctx.lineWidth = 0.7;
                ctx.lineWidth = particlesArray[i].size/50;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
       

        }
    }



function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.2)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue+=0.5;
    handleParticles();
    requestAnimationFrame(animate);
}
animate();