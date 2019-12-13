/* (c) IGOR KOWALCZYK. All rights reserved. */

/* LAST COMMIT */

var apiURL = 'https://api.github.com/repos/igorkowalczyk/fest/commits?per_page=1&sha='
var auroliacommits = new Vue({
el: '#commit',
data: {
branches: ['master'],
currentBranch: 'master',
commits: null
},
created: function () {
this.fetchData()
},
watch: {
currentBranch: 'fetchData'
},
filters: {
truncate: function (v) {
var newline = v.indexOf('\n')
return newline > 0 ? v.slice(0, newline) : v
},
formatDate: function (v) {
return v.replace(/T|Z/g, ' ')
}
},
methods: {
fetchData: function () {
var xhr = new XMLHttpRequest()
var self = this
xhr.open('GET', apiURL + self.currentBranch)
xhr.onload = function () {
self.commits = JSON.parse(xhr.responseText);
for (let entry of self.commits) {
entry.formattedDateDelta = moment(entry.commit.author.date).fromNow();
}
}
xhr.send()
}
}
})

/* /LAST COMMIT */

/* PARTICLES */

particlesJS("particles", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#000000"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.4489553770423464,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#000000","opacity":0.5852454022159158,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"bounce","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});

/* /PARTICLES */
