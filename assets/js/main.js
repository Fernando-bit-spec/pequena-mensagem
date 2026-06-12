// Controle de telas simples
(()=>{
  const sections = Array.from(document.querySelectorAll('.screen'))
  function show(id){
    const el = document.getElementById(id)
    if(!el) return
    sections.forEach(s=> s.classList.toggle('active', s.id===id))
    el.scrollIntoView({behavior:'smooth', block:'start'})
  }

  // ordem de navegação usada para tour automático e botões "Próximo"
  const navOrder = ['intro','phrases','photo','surprise','final']

  document.getElementById('open-surprise')?.addEventListener('click', ()=> show('intro'))

  // botão próximo: encontra a seção atual e vai para a próxima na navOrder
  document.querySelectorAll('.next').forEach((btn)=> btn.addEventListener('click', (e)=> {
    const current = e.target.closest('.screen')?.id
    const idx = navOrder.indexOf(current)
    if(idx >= 0 && idx < navOrder.length-1) show(navOrder[idx+1])
  }))

  document.getElementById('restart')?.addEventListener('click', ()=> show('bomdia'))

  const bgMusic = document.getElementById('bg-music')
  const toggleMusicBtn = document.getElementById('toggle-music')
  if(bgMusic && toggleMusicBtn){
    bgMusic.volume = 0.35
    toggleMusicBtn.addEventListener('click', ()=>{
      if(bgMusic.paused){
        bgMusic.play().catch(()=>{})
        toggleMusicBtn.textContent = 'Pausar música'
      } else {
        bgMusic.pause()
        toggleMusicBtn.textContent = 'Tocar música'
      }
    })
  }

  // Carregar frases animadas
  function showPhrases(){
    const container = document.getElementById('phrases-container')
    if(!window.messages || !container) return
    let idx=0
    container.textContent = window.messages[idx]
    setInterval(()=>{ idx=(idx+1)%window.messages.length; container.classList.remove('fade-in'); void container.offsetWidth; container.classList.add('fade-in'); container.textContent=window.messages[idx]}, 3500)
  }
  showPhrases()
  // Abrir / fechar carta surpresa
  const letterBtn = document.getElementById('letterBtn')
  const letter = document.getElementById('letter')
  if(letterBtn && letter){
    letterBtn.addEventListener('click', ()=>{
      const isOpen = letter.classList.toggle('open')
      letterBtn.textContent = isOpen ? '💌 Fechar mensagem' : '💌 Abrir mensagem'
      if(isOpen){
        // Dispara corações mais rápidos por alguns instantes, se spawnHeart existir
        if(typeof spawnHeart === 'function'){
          let ticks = 0
          const iv = setInterval(()=>{ spawnHeart(); ticks++; if(ticks>18) clearInterval(iv) }, 180)
        }
      }
    })
  }

  // Tour automático: percorre as seções na ordem definida
  function playSequence(order = navOrder, perScreen = 6000){
    let i = 0
    let playing = true
    const disable = ()=> document.querySelectorAll('button').forEach(b=>b.disabled = true)
    const enable = ()=> document.querySelectorAll('button').forEach(b=>b.disabled = false)
    disable()
    show(order[0])
    const iv = setInterval(()=>{
      i++
      if(i >= order.length){ clearInterval(iv); enable(); playing = false; show('final'); return }
      show(order[i])
    }, perScreen)
  }

  document.getElementById('start-tour')?.addEventListener('click', ()=> playSequence())
})()
