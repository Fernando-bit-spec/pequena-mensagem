// Efeito simples: adiciona corações flutuantes como elementos DOM (leve)
function spawnHeart(){
  const heart = document.createElement('div')
  heart.textContent = '❤️'
  heart.style.position = 'fixed'
  heart.style.left = Math.random()*100 + '%'
  heart.style.bottom = '-30px'
  heart.style.fontSize = (12+Math.random()*28)+'px'
  heart.style.pointerEvents = 'none'
  heart.style.transform = 'translateY(0)'
  heart.style.transition = 'transform 4s linear, opacity 4s'
  document.body.appendChild(heart)
  requestAnimationFrame(()=>{
    heart.style.transform = 'translateY(-120vh)'
    heart.style.opacity = '0'
  })
  setTimeout(()=> heart.remove(), 4200)
}
setInterval(spawnHeart, 900)
