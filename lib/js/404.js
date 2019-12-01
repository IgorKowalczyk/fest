/* (c) IGOR KOWALCZYK 2018-2019. All rights reserved. */

/* CONSOLE AND PRELOADER */

var str = document.getElementsByTagName('div')[0].innerHTML.toString(); var i = 0; document.getElementsByTagName('div')[0].innerHTML = "";  setTimeout(function() { var se = setInterval(function() { i++; document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + ""; if (i == str.length) { clearInterval(se); document.getElementsByTagName('div')[0].innerHTML = str; } }, 15); },0); var preload = document.createElement('div'); preload.className = "preloader-site"; preload.innerHTML = '</div><div class="spinner-site"></div>'; document.body.appendChild(preload); window.addEventListener('load', function() { preload.className +=  ' fade'; setTimeout(function(){ preload.style.display = 'none'; },500); }) 

/* /CONSOLE AND PRELOADER */

/* ANIMATION */

$(document).on('click', '.link-fade', function (event) {event.preventDefault();var link = this;$('body').fadeOut(function () {location.href = link.href;});});

/* /ANIMATION */
