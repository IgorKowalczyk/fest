/* (c) IGOR KOWALCZYK. All rights reserved. */

/* CONSOLE */

var str = document.getElementsByTagName('div')[0].innerHTML.toString(); var i = 0; document.getElementsByTagName('div')[0].innerHTML = "";  setTimeout(function() { var se = setInterval(function() { i++; document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + ""; if (i == str.length) { clearInterval(se); document.getElementsByTagName('div')[0].innerHTML = str; } }, 15); },0); 

/* /CONSOLE */

/* ANIMATION */

$(document).on('click', '.link-fade', function (event) {event.preventDefault();var link = this;$('body').fadeOut(function () {location.href = link.href;});});

/* /ANIMATION */
