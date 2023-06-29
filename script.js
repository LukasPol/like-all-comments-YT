const button = document.querySelector('#likeAll')
const defaultLocale = 'pt-BR'

button.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id},
    function: likeAll,
    args: [defaultLocale]
  })
})

const locales = {
  'pt-BR': 'Marcar este comentário com \"Gostei\"',
  'en': ''
}

const likeAll = (currentLocale) => {
  const buttons = document.querySelectorAll(`[aria-label^=${locales[currentLocale]}]`)

  if (buttons.length === 0) {
    alert('Não achamos botões para Curtir, possa ser que o idioma do seu navegador não esteja configurado para extensão!\ngithub.com/LukasPol/like-all-comments-yt')
  }
  buttons.forEach(btn => {
    btn.click()
  })
}
