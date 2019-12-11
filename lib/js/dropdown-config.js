/* (c) IGOR KOWALCZYK. All rights reserved. */

/* DROPDOWN */

var dropdown = document.getElementsByClassName("dropdown-btn")[0];
var dropdowncontent = document.getElementsByClassName("dropdown-content")[0];
dropdown.addEventListener("click", function()
{
dropdowncontent.classList.toggle("show-dropdown");
});
window.onclick = function(event)
{
if (!event.target.matches(".dropdown-btn"))
{
for (var i = 0; i < dropdowncontent.length; i++)
{
if (dropdowncontent[i].classList.contains('show-dropdown'))
{
dropdowncontent[i].classList.remove('show-dropdown');
}
}
}
}

/* /DROPDOWN */
