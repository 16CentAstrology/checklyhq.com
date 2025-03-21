/**
 * Learn Menu
 */

$(document).ready(() => {
  const learnMenuTitleClass = '.learn-menu-title'
  const learnMenuHeader = $(learnMenuTitleClass)

  learnMenuHeader.click(function () {
    const id = $(this).attr('id')
    const learnMenuId = '#learn-menu-' + id
    if ($(this).attr('class') === 'learn-menu-title') {
      $(this).addClass('active')
      $(learnMenuId).addClass('menu-display')
    } else {
      $(this).removeClass('active')
      $(learnMenuId).removeClass('menu-display')
    }
  })
})

/**
 * Learn TOC Sidebar
 */

$(document).ready(() => {
  if ($('#TableOfContents ul').length >= 1) {
    $('#tocMenu').css({
      display: 'block'
    })
  } else {
    $('#tocMenu').css({
      display: 'none'
    })
  }
})

/**
 * Learn Mobile Menu
 */

$(document).ready(() => {
  $('#navbar-hamburger').click(function () {
    $('.learn-menu').css({
      left: '0'
    })
    $('.learn-menu-mobile-right-space').css({
      display: 'block'
    })
    $('#sideMenu').removeClass('left-transform')
    $('#sideMenu').addClass('right-transform')
  })
  $('.learn-menu-mobile-right-space').click(function () {
    $('.learn-menu').css({
      left: '-100%'
    })
    $('.learn-menu-mobile-right-space').css({
      display: 'none'
    })
    $('#sideMenu').removeClass('right-transform')
    $('#sideMenu').addClass('left-transform')
  })
})

/**
 * '/' press for the search
 */

$(document).on('keydown', function (e) {
  if (e.keyCode === 191) { // '/' key code
    e.preventDefault()
    $('#search').focus()
  }
})

/**
 * Hover Dropdown
 */

$(document).ready(function () {
  $('#dropdown-li').mouseenter(function () {
    $('#dropdown-li').addClass('show')
  })
  $('#dropdown-menu, #dropdown-li').mouseleave(function () {
    $('#dropdown-li').removeClass('show')
  })
})

/**
 * Sidemenu fixed position after some scroll-up
 */

$(document).ready(function () {
  const sideMenu = $('#sideMenu')
  if (!sideMenu.length) return
  const sideMenuDistance = $('#sideMenu').offset().top - 10

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= sideMenuDistance) {
      $('#sideMenu').css({
        position: 'fixed',
        top: '0px'
      })
      $('#tocMenu').css({
        position: 'fixed',
        top: '30px'
      })
    } else {
      $('#sideMenu').css({
        position: 'relative'
      })
      $('#tocMenu').css({
        position: 'relative',
        top: '0'
      })
    }
  })
})

/**
 * Handle run in checkly button
 */

const isDev = window.location.host.includes('localhost')
$(document).ready(() => {
  $('.run-in-checkly').on('click', function () {
    const data = $(this).data()
    window.fetch(data.script)
      .then(response => response.text())
      .then(body => {
        const script = encodeURIComponent(btoa(body))
        const link = `${isDev ? 'http://localhost:8081' : 'https://app.checklyhq.com'}/checks/new/browser?framework=${data.framework}&script=${script}`
        window.open(
          link,
          '_blank'
        )
      })
  })
})

window.docsearch({
  apiKey: 'b2b616fdea14b860ff00c72fa72bf267',
  indexName: 'checkly_learn',
  appId: 'LCMJSZN73Z',
  container: '#docsearch'
})
