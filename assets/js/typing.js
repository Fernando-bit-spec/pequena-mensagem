// Efeito máquina de escrever minimal
function typeText(element, text, speed=40){
  element.textContent = ''
  let i=0
  const t = setInterval(()=>{
    element.textContent += text.charAt(i)
    i++
    if(i>text.length-1) clearInterval(t)
  }, speed)
}

document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('typing')
  if(!el) return
  const txt = 'Você é a razão do meu sorriso.'
  typeText(el, txt, 40)
})
