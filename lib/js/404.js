/* (c) IGOR KOWALCZYK. All rights reserved. */

/* CONSOLE */

var str = document.getElementsByTagName('div')[0].innerHTML.toString(); var i = 0; document.getElementsByTagName('div')[0].innerHTML = "";  setTimeout(function() { var se = setInterval(function() { i++; document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + ""; if (i == str.length) { clearInterval(se); document.getElementsByTagName('div')[0].innerHTML = str; } }, 15); },0); 

/* /CONSOLE */

/* ANIMATION */

document.addEventListener('click', function (event) {if (!event.target.classList.contains("link-fade")) return; event.preventDefault();var link = event.target;document.body.style.opacity = 0;document.body.addEventListener("transitionend", function () {location.href = link.href;});});

/* /ANIMATION */
