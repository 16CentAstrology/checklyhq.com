/**
 * Docs Menu
 */

$(document).ready(() => {
  const docsMenuTitleClass = '.docs-menu-title'
  const docsMenuHeader = $(docsMenuTitleClass)

  docsMenuHeader.click(function () {
    const id = $(this).attr('id')
    const docMenuId = '#docs-menu-' + id
    if ($(this).attr('class') === 'docs-menu-title') {
      $(this).addClass('active')
      $(docMenuId).addClass('menu-display')
    } else {
      $(this).removeClass('active')
      $(docMenuId).removeClass('menu-display')
    }
  })
})

/**
 * Docs TOC Sidebar
 */

$(document).ready(() => {
  if ($('#TableOfContents ul').length === 0) {
    $('.docs-toc-on-this-page').css({
      display: 'none'
    })
  }
})

/**
 * Docs Mobile Menu
 */

$(document).ready(() => {
  $('#navbar-hamburger').click(function () {
    $('.docs-menu').css({
      left: '0'
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'block'
    })
    $('#sideMenu').removeClass('left-transform')
    $('#sideMenu').addClass('right-transform')
    // flag = false
  })

  $('.docs-menu-mobile-right-space').click(function () {
    $('.docs-menu').css({
      left: '-100%'
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'none'
    })
    $('#sideMenu').removeClass('right-transform')
    $('#sideMenu').addClass('left-transform')
    // flag = true
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
 * Sidemenu fixed position after some scroll-up
 */

const sideMenu = $('#sideMenu')
const tocMenu = $('#tocMenu')
let sideMenuDistance

if (sideMenu.length) {
  sideMenuDistance = sideMenu.offset().top - 10
} else if (tocMenu.length) {
  sideMenuDistance = tocMenu.offset().top - 10
}

$(window).on('scroll', function () {
  if ($(window).scrollTop() >= sideMenuDistance) {
    $('#sideMenu').css({
      position: 'fixed',
      top: '0px'
    })
    $('#tocMenu').css({
      position: 'fixed',
      top: '0px'
    })
  } else {
    $('#sideMenu').css({
      position: 'relative'
    })
    $('#tocMenu').css({
      position: 'relative'
    })
  }
})

window.docsearch({
  apiKey: 'b2b616fdea14b860ff00c72fa72bf267',
  indexName: 'checkly_docs',
  appId: 'LCMJSZN73Z',
  container: '#docsearch',
  debug: true
})
