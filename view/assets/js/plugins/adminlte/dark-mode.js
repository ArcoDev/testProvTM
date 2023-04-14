const check = document.getElementById('checkbox')
const body = document.querySelector('.sidebar-mini')
const navbarTop = document.querySelector('.navbar')
const themeDevExpress = document.getElementById('theme-devExpress')
const bot = document.getElementById('bot')
const bot404 = document.getElementById('boti404')
$(() => {
    $('#sw-theme').dxSwitch({
        value: false,
        switchedOffText: 'Light',
        switchedOnText: 'Dark',
        width: '50px',
        onValueChanged(event) {
            const valueSwitch = event.value
            const urlIndex = window.location.search
            body.classList.add('dark-mode')
            navbarTop.classList.remove('navbar-light')
            navbarTop.classList.add('navbar-dark')
            themeDevExpress.innerHTML = '<link rel="stylesheet" href="./view/assets/devExpress/css/dx.dark.css">'
            $('.head-title').addClass('text-white')
            if (valueSwitch) {
                if (urlIndex == '' || urlIndex == 'index.php') {
                    bot.innerHTML = '<img src="./view/assets/img/boti-dark.gif" class="img-fluid" style="width: 650px">'
                }
            } else if (!valueSwitch) {
                body.classList.remove('dark-mode')
                navbarTop.classList.remove('navbar-dark')
                navbarTop.classList.add('navbar-light')
                themeDevExpress.innerHTML = '<link rel="stylesheet" href="./view/assets/devExpress/css/dx.light.css">'
                $('.head-title').addClass('head-dark')
                $('.head-title').removeClass('text-white')
                if (urlIndex == '' || urlIndex == 'index.php') {
                    bot.innerHTML = '<img src="./view/assets/img/boti-light.gif" class="img-fluid" style="width: 650px">'
                }
            }
        }
    })
})