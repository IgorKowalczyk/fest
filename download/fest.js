/* (c) IGOR KOWALCZYK 2018-2019. All rights reserved.
*
* AUTHOR - IGOR KOWALCZYK
* https://igorkowalczyk.github.io/fest/
*
* SRC OF THE FILE:
* https://igorkowalczyk.github.io/fest/download/fest.css
*
* RELASED UNDER THE MIT
* https://igorkowalczyk.github.io/fest/LICENSE.txt
*
* RELASE DATE OF THE VERSION:
* 2019-08-19
*
*/

/* INDETERMINATE CHECKBOX */

document.querySelectorAll('.indeterminate > label > input').forEach((item) => item.indeterminate = true);

/* /INDETERMINATE CHECKBOX */

/* MODAL */

const modalTriggers = document.querySelectorAll('.modal-open')
const modalCloseTrigger = document.querySelector('.modal-close')
const bodyBlackout = document.querySelector('.body-blackout')
modalTriggers.forEach(trigger => {
trigger.addEventListener('click', () => {
const { popupTrigger } = trigger.dataset
const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)
popupModal.classList.add('is-visible')
bodyBlackout.classList.add('is-blacked-out')
popupModal.querySelector('.modal-close').addEventListener('click', () => {
popupModal.classList.remove('is-visible')
bodyBlackout.classList.remove('is-blacked-out')
})
bodyBlackout.addEventListener('click', () => {
popupModal.classList.remove('is-visible')
bodyBlackout.classList.remove('is-blacked-out')
})
})
})

/* /MODAL */

/* /NAV (JQUERY REQUIRED) */

/* Without Jquery (Need HTML) */
// const menuIconEl = document.querySelector('.menu-icon');
// const sidenavEl = document.querySelector('.sidenav');
// const sidenavCloseEl = document.querySelector('.sidenav-close-icon');
// const onclick = e => sidenavEl.classList.toggle( 'active' );
// menuIconEl.addEventListener( 'click', onclick );
// sidenavCloseEl.addEventListener( 'click', onclick );

const menuIconEl = $('.menu-icon');
const sidenavEl = $('.sidenav');
const sidenavCloseEl = $('.sidenav-close-icon');
function toggleClassName(el, className) {
if (el.hasClass(className)) {
el.removeClass(className);
} else {
el.addClass(className);
}}
menuIconEl.on('click', function() {
toggleClassName(sidenavEl, 'active');
});
sidenavCloseEl.on('click', function() {
toggleClassName(sidenavEl, 'active');
});

/* /NAV (JQUERY REQUIRED) */

/* RANGE */

const settings={
fill: '#00a3a3',
background: '#d7dcdf',
}
const sliders = document.querySelectorAll('.range-slider');
Array.prototype.forEach.call(sliders,(slider)=>{
slider.querySelector('input').addEventListener('input', (event)=>{
slider.querySelector('span').innerHTML = event.target.value;
applyFill(event.target);
});
applyFill(slider.querySelector('input'));
});
function applyFill(slider) {
const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
slider.style.background = bg;
}

/* /RANGE */

/* CAROUSEL */

(function (root, factory) {
if (typeof define === 'function' && define.amd) {
define(factory);
} else {
root.Dragdealer = factory();
}
}(this, function () {
var Dragdealer = function(wrapper, options) {
this.options = this.applyDefaults(options || {});
this.bindMethods();
this.wrapper = this.getWrapperElement(wrapper);
if (!this.wrapper) {
return;
}
this.handle = this.getHandleElement(this.wrapper, this.options.handleClass);
if (!this.handle) {
return;
}
this.init();
this.bindEventListeners();
};
Dragdealer.prototype = {
defaults: {
disabled: false,
horizontal: true,
vertical: false,
slide: true,
steps: 0,
snap: false,
loose: false,
speed: 0.1,
xPrecision: 0,
yPrecision: 0,
handleClass: 'handle',
css3: true,
activeClass: 'active',
tapping: true
},
init: function() {
if (this.options.css3) {
triggerWebkitHardwareAcceleration(this.handle);
}
this.value = {
prev: [-1, -1],
current: [this.options.x || 0, this.options.y || 0],
target: [this.options.x || 0, this.options.y || 0]
};
this.offset = {
wrapper: [0, 0],
mouse: [0, 0],
prev: [-999999, -999999],
current: [0, 0],
target: [0, 0]
};
this.dragStartPosition = {x: 0, y: 0};
this.change = [0, 0];
this.stepRatios = this.calculateStepRatios();
this.activity = false;
this.dragging = false;
this.tapping = false;
this.reflow();
if (this.options.disabled) {
this.disable();
}
},
applyDefaults: function(options) {
for (var k in this.defaults) {
if (!options.hasOwnProperty(k)) {
options[k] = this.defaults[k];
}
}
return options;
},
getWrapperElement: function(wrapper) {
if (typeof(wrapper) == 'string') {
return document.getElementById(wrapper);
} else {
return wrapper;
}
},
getHandleElement: function(wrapper, handleClass) {
var childElements,
handleClassMatcher,
i;
if (wrapper.getElementsByClassName) {
childElements = wrapper.getElementsByClassName(handleClass);
if (childElements.length > 0) {
return childElements[0];
}
} else {
handleClassMatcher = new RegExp('(^|\\s)' + handleClass + '(\\s|$)');
childElements = wrapper.getElementsByTagName('*');
for (i = 0; i < childElements.length; i++) {
if (handleClassMatcher.test(childElements[i].className)) {
return childElements[i];
}
}
}
},
calculateStepRatios: function() {
var stepRatios = [];
if (this.options.steps >= 1) {
for (var i = 0; i <= this.options.steps - 1; i++) {
if (this.options.steps > 1) {
stepRatios[i] = i / (this.options.steps - 1);
} else {
stepRatios[i] = 0;
}
}
}
return stepRatios;
},
setWrapperOffset: function() {
this.offset.wrapper = Position.get(this.wrapper);
},
calculateBounds: function() {
var bounds = {
top: this.options.top || 0,
bottom: -(this.options.bottom || 0) + this.wrapper.offsetHeight,
left: this.options.left || 0,
right: -(this.options.right || 0) + this.wrapper.offsetWidth
};
bounds.availWidth = (bounds.right - bounds.left) - this.handle.offsetWidth;
bounds.availHeight = (bounds.bottom - bounds.top) - this.handle.offsetHeight;
return bounds;
},
calculateValuePrecision: function() {
var xPrecision = this.options.xPrecision || Math.abs(this.bounds.availWidth),
yPrecision = this.options.yPrecision || Math.abs(this.bounds.availHeight);
return [
xPrecision ? 1 / xPrecision : 0,
yPrecision ? 1 / yPrecision : 0
];
},
bindMethods: function() {
if (typeof(this.options.customRequestAnimationFrame) === 'function') {
this.requestAnimationFrame = bind(this.options.customRequestAnimationFrame, window);
} else {
this.requestAnimationFrame = bind(requestAnimationFrame, window);
}
if (typeof(this.options.customCancelAnimationFrame) === 'function') {
this.cancelAnimationFrame = bind(this.options.customCancelAnimationFrame, window);
} else {
this.cancelAnimationFrame = bind(cancelAnimationFrame, window);
}
this.animateWithRequestAnimationFrame = bind(this.animateWithRequestAnimationFrame, this);
this.animate = bind(this.animate, this);
this.onHandleMouseDown = bind(this.onHandleMouseDown, this);
this.onHandleTouchStart = bind(this.onHandleTouchStart, this);
this.onDocumentMouseMove = bind(this.onDocumentMouseMove, this);
this.onWrapperTouchMove = bind(this.onWrapperTouchMove, this);
this.onWrapperMouseDown = bind(this.onWrapperMouseDown, this);
this.onWrapperTouchStart = bind(this.onWrapperTouchStart, this);
this.onDocumentMouseUp = bind(this.onDocumentMouseUp, this);
this.onDocumentTouchEnd = bind(this.onDocumentTouchEnd, this);
this.onHandleClick = bind(this.onHandleClick, this);
this.onWindowResize = bind(this.onWindowResize, this);
},
bindEventListeners: function() {
addEventListener(this.handle, 'mousedown', this.onHandleMouseDown);
addEventListener(this.handle, 'touchstart', this.onHandleTouchStart);
addEventListener(document, 'mousemove', this.onDocumentMouseMove);
addEventListener(this.wrapper, 'touchmove', this.onWrapperTouchMove);
addEventListener(this.wrapper, 'mousedown', this.onWrapperMouseDown);
addEventListener(this.wrapper, 'touchstart', this.onWrapperTouchStart);
addEventListener(document, 'mouseup', this.onDocumentMouseUp);
addEventListener(document, 'touchend', this.onDocumentTouchEnd);
addEventListener(this.handle, 'click', this.onHandleClick);
addEventListener(window, 'resize', this.onWindowResize);
this.animate(false, true);
this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame);
},
unbindEventListeners: function() {
removeEventListener(this.handle, 'mousedown', this.onHandleMouseDown);
removeEventListener(this.handle, 'touchstart', this.onHandleTouchStart);
removeEventListener(document, 'mousemove', this.onDocumentMouseMove);
removeEventListener(this.wrapper, 'touchmove', this.onWrapperTouchMove);
removeEventListener(this.wrapper, 'mousedown', this.onWrapperMouseDown);
removeEventListener(this.wrapper, 'touchstart', this.onWrapperTouchStart);
removeEventListener(document, 'mouseup', this.onDocumentMouseUp);
removeEventListener(document, 'touchend', this.onDocumentTouchEnd);
removeEventListener(this.handle, 'click', this.onHandleClick);
removeEventListener(window, 'resize', this.onWindowResize);
this.cancelAnimationFrame(this.interval);
},
onHandleMouseDown: function(e) {
Cursor.refresh(e);
preventEventDefaults(e);
stopEventPropagation(e);
this.activity = false;
this.startDrag();
},
onHandleTouchStart: function(e) {
Cursor.refresh(e);
stopEventPropagation(e);
this.activity = false;
this.startDrag();
},
onDocumentMouseMove: function(e) {
Cursor.refresh(e);
if (this.dragging) {
this.activity = true;
preventEventDefaults(e);
}
},
onWrapperTouchMove: function(e) {
Cursor.refresh(e);
if (!this.activity && this.draggingOnDisabledAxis()) {
if (this.dragging) {
this.stopDrag();
}
return;
}
preventEventDefaults(e);
this.activity = true;
},
onWrapperMouseDown: function(e) {
Cursor.refresh(e);
preventEventDefaults(e);
this.startTap();
},
onWrapperTouchStart: function(e) {
Cursor.refresh(e);
preventEventDefaults(e);
this.startTap();
},
onDocumentMouseUp: function(e) {
this.stopDrag();
this.stopTap();
},
onDocumentTouchEnd: function(e) {
this.stopDrag();
this.stopTap();
},
onHandleClick: function(e) {
if (this.activity) {
preventEventDefaults(e);
stopEventPropagation(e);
}
},
onWindowResize: function(e) {
this.reflow();
},
enable: function() {
this.disabled = false;
this.handle.className = this.handle.className.replace(/\s?disabled/g, '');
},
disable: function() {
this.disabled = true;
this.handle.className += ' disabled';
},
reflow: function() {
this.setWrapperOffset();
this.bounds = this.calculateBounds();
this.valuePrecision = this.calculateValuePrecision();
this.updateOffsetFromValue();
},
getStep: function() {
return [
this.getStepNumber(this.value.target[0]),
this.getStepNumber(this.value.target[1])
];
},
getStepWidth: function () {
return Math.abs(this.bounds.availWidth / this.options.steps);
},
getValue: function() {
return this.value.target;
},
setStep: function(x, y, snap) {
this.setValue(
this.options.steps && x > 1 ? (x - 1) / (this.options.steps - 1) : 0,
this.options.steps && y > 1 ? (y - 1) / (this.options.steps - 1) : 0,
snap
);
},
setValue: function(x, y, snap) {
this.setTargetValue([x, y || 0]);
if (snap) {
this.groupCopy(this.value.current, this.value.target);
this.updateOffsetFromValue();
this.callAnimationCallback();
}
},
startTap: function() {
if (this.disabled || !this.options.tapping) {
return;
}
this.tapping = true;
this.setWrapperOffset();

this.setTargetValueByOffset([
Cursor.x - this.offset.wrapper[0] - (this.handle.offsetWidth / 2),
Cursor.y - this.offset.wrapper[1] - (this.handle.offsetHeight / 2)
]);
},
stopTap: function() {
if (this.disabled || !this.tapping) {
return;
}
this.tapping = false;
this.setTargetValue(this.value.current);
},
startDrag: function() {
if (this.disabled) {
return;
}
this.dragging = true;
this.setWrapperOffset();
this.dragStartPosition = {x: Cursor.x, y: Cursor.y};
this.offset.mouse = [
Cursor.x - Position.get(this.handle)[0],
Cursor.y - Position.get(this.handle)[1]
];
if (!this.wrapper.className.match(this.options.activeClass)) {
this.wrapper.className += ' ' + this.options.activeClass;
}
this.callDragStartCallback();
},
stopDrag: function() {
if (this.disabled || !this.dragging) {
return;
}
this.dragging = false;
var deltaX = this.bounds.availWidth === 0 ? 0 :
((Cursor.x - this.dragStartPosition.x) / this.bounds.availWidth),
deltaY = this.bounds.availHeight === 0 ? 0 :
((Cursor.y - this.dragStartPosition.y) / this.bounds.availHeight),
delta = [deltaX, deltaY];
var target = this.groupClone(this.value.current);
if (this.options.slide) {
var ratioChange = this.change;
target[0] += ratioChange[0] * 4;
target[1] += ratioChange[1] * 4;
}
this.setTargetValue(target);
this.wrapper.className = this.wrapper.className.replace(' ' + this.options.activeClass, '');
this.callDragStopCallback(delta);
},
callAnimationCallback: function() {
var value = this.value.current;
if (this.options.snap && this.options.steps > 1) {
value = this.getClosestSteps(value);
}
if (!this.groupCompare(value, this.value.prev)) {
if (typeof(this.options.animationCallback) == 'function') {
this.options.animationCallback.call(this, value[0], value[1]);
}
this.groupCopy(this.value.prev, value);
}
},
callTargetCallback: function() {
if (typeof(this.options.callback) == 'function') {
this.options.callback.call(this, this.value.target[0], this.value.target[1]);
}
},
callDragStartCallback: function() {
if (typeof(this.options.dragStartCallback) == 'function') {
this.options.dragStartCallback.call(this, this.value.target[0], this.value.target[1]);
}
},
callDragStopCallback: function(delta) {
if (typeof(this.options.dragStopCallback) == 'function') {
this.options.dragStopCallback.call(this, this.value.target[0], this.value.target[1], delta);
}
},
animateWithRequestAnimationFrame: function (time) {
if (time) {
this.timeOffset = this.timeStamp ? time - this.timeStamp : 0;
this.timeStamp = time;
} else {
this.timeOffset = 25;
}
this.animate();
this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame);
},
animate: function(direct, first) {
if (direct && !this.dragging) {
return;
}
if (this.dragging) {
var prevTarget = this.groupClone(this.value.target);
var offset = [
Cursor.x - this.offset.wrapper[0] - this.offset.mouse[0],
Cursor.y - this.offset.wrapper[1] - this.offset.mouse[1]
];
this.setTargetValueByOffset(offset, this.options.loose);
this.change = [
this.value.target[0] - prevTarget[0],
this.value.target[1] - prevTarget[1]
];
}
if (this.dragging || first) {
this.groupCopy(this.value.current, this.value.target);
}
if (this.dragging || this.glide() || first) {
this.updateOffsetFromValue();
this.callAnimationCallback();
}
},
glide: function() {
var diff = [
this.value.target[0] - this.value.current[0],
this.value.target[1] - this.value.current[1]
];
if (!diff[0] && !diff[1]) {
return false;
}
if (Math.abs(diff[0]) > this.valuePrecision[0] ||
Math.abs(diff[1]) > this.valuePrecision[1]) {
this.value.current[0] += diff[0] * Math.min(this.options.speed * this.timeOffset / 25, 1);
this.value.current[1] += diff[1] * Math.min(this.options.speed * this.timeOffset / 25, 1);
} else {
this.groupCopy(this.value.current, this.value.target);
}
return true;
},
updateOffsetFromValue: function() {
if (!this.options.snap) {
this.offset.current = this.getOffsetsByRatios(this.value.current);
} else {
this.offset.current = this.getOffsetsByRatios(
this.getClosestSteps(this.value.current)
);
}
if (!this.groupCompare(this.offset.current, this.offset.prev)) {
this.renderHandlePosition();
this.groupCopy(this.offset.prev, this.offset.current);
}
},
renderHandlePosition: function() {
var transform = '';
if (this.options.css3 && StylePrefix.transform) {
if (this.options.horizontal) {
transform += 'translateX(' + this.offset.current[0] + 'px)';
}
if (this.options.vertical) {
transform += ' translateY(' + this.offset.current[1] + 'px)';
}
this.handle.style[StylePrefix.transform] = transform;
return;
}
if (this.options.horizontal) {
this.handle.style.left = this.offset.current[0] + 'px';
}
if (this.options.vertical) {
this.handle.style.top = this.offset.current[1] + 'px';
}
},
setTargetValue: function(value, loose) {
var target = loose ? this.getLooseValue(value) : this.getProperValue(value);
this.groupCopy(this.value.target, target);
this.offset.target = this.getOffsetsByRatios(target);
this.callTargetCallback();
},
setTargetValueByOffset: function(offset, loose) {
var value = this.getRatiosByOffsets(offset);
var target = loose ? this.getLooseValue(value) : this.getProperValue(value);
this.groupCopy(this.value.target, target);
this.offset.target = this.getOffsetsByRatios(target);
},
getLooseValue: function(value) {
var proper = this.getProperValue(value);
return [
proper[0] + ((value[0] - proper[0]) / 4),
proper[1] + ((value[1] - proper[1]) / 4)
];
},
getProperValue: function(value) {
var proper = this.groupClone(value);
proper[0] = Math.max(proper[0], 0);
proper[1] = Math.max(proper[1], 0);
proper[0] = Math.min(proper[0], 1);
proper[1] = Math.min(proper[1], 1);
if ((!this.dragging && !this.tapping) || this.options.snap) {
if (this.options.steps > 1) {
proper = this.getClosestSteps(proper);
}
}
return proper;
},
getRatiosByOffsets: function(group) {
return [
this.getRatioByOffset(group[0], this.bounds.availWidth, this.bounds.left),
this.getRatioByOffset(group[1], this.bounds.availHeight, this.bounds.top)
];
},
getRatioByOffset: function(offset, range, padding) {
return range ? (offset - padding) / range : 0;
},
getOffsetsByRatios: function(group) {
return [
this.getOffsetByRatio(group[0], this.bounds.availWidth, this.bounds.left),
this.getOffsetByRatio(group[1], this.bounds.availHeight, this.bounds.top)
];
},
getOffsetByRatio: function(ratio, range, padding) {
return Math.round(ratio * range) + padding;
},
getStepNumber: function(value) {
return this.getClosestStep(value) * (this.options.steps - 1) + 1;
},
getClosestSteps: function(group) {
return [
this.getClosestStep(group[0]),
this.getClosestStep(group[1])
];
},
getClosestStep: function(value) {
var k = 0;
var min = 1;
for (var i = 0; i <= this.options.steps - 1; i++) {
if (Math.abs(this.stepRatios[i] - value) < min) {
min = Math.abs(this.stepRatios[i] - value);
k = i;
}
}
return this.stepRatios[k];
},
groupCompare: function(a, b) {
return a[0] == b[0] && a[1] == b[1];
},
groupCopy: function(a, b) {
a[0] = b[0];
a[1] = b[1];
},
groupClone: function(a) {
return [a[0], a[1]];
},
draggingOnDisabledAxis: function() {
return (!this.options.horizontal && Cursor.xDiff > Cursor.yDiff) ||
(!this.options.vertical && Cursor.yDiff > Cursor.xDiff);
}
};
var bind = function(fn, context) {
return function() {
return fn.apply(context, arguments);
};
};
var addEventListener = function(element, type, callback) {
if (element.addEventListener) {
element.addEventListener(type, callback, false);
} else if (element.attachEvent) {
element.attachEvent('on' + type, callback);
}
};
var removeEventListener = function(element, type, callback) {
if (element.removeEventListener) {
element.removeEventListener(type, callback, false);
} else if (element.detachEvent) {
element.detachEvent('on' + type, callback);
}
};
var preventEventDefaults = function(e) {
if (!e) {
e = window.event;
}
if (e.preventDefault) {
e.preventDefault();
}
e.returnValue = false;
};
var stopEventPropagation = function(e) {
if (!e) {
e = window.event;
}
if (e.stopPropagation) {
e.stopPropagation();
}
e.cancelBubble = true;
};
var Cursor = {
x: 0,
y: 0,
xDiff: 0,
yDiff: 0,
refresh: function(e) {
if (!e) {
e = window.event;
}
if (e.type == 'mousemove') {
this.set(e);
} else if (e.touches) {
this.set(e.touches[0]);
}
},
set: function(e) {
var lastX = this.x,
lastY = this.y;
if (e.clientX || e.clientY) {
this.x = e.clientX;
this.y = e.clientY;
} else if (e.pageX || e.pageY) {
this.x = e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft;
this.y = e.pageY - document.body.scrollTop - document.documentElement.scrollTop;
}
this.xDiff = Math.abs(this.x - lastX);
this.yDiff = Math.abs(this.y - lastY);
}
};


var Position = {
get: function(obj) {
var rect = {left: 0, top: 0};
if (obj.getBoundingClientRect !== undefined) {
rect = obj.getBoundingClientRect();
}
return [rect.left, rect.top];
}
};
var StylePrefix = {
transform: getPrefixedStylePropName('transform'),
perspective: getPrefixedStylePropName('perspective'),
backfaceVisibility: getPrefixedStylePropName('backfaceVisibility')
};
function getPrefixedStylePropName(propName) {
var domPrefixes = 'Webkit Moz ms O'.split(' '),
elStyle = document.documentElement.style;
if (elStyle[propName] !== undefined) return propName;
propName = propName.charAt(0).toUpperCase() + propName.substr(1);
for (var i = 0; i < domPrefixes.length; i++) {
if (elStyle[domPrefixes[i] + propName] !== undefined) {
return domPrefixes[i] + propName;
}
}
};
function triggerWebkitHardwareAcceleration(element) {
if (StylePrefix.backfaceVisibility && StylePrefix.perspective) {
element.style[StylePrefix.perspective] = '1000px';
element.style[StylePrefix.backfaceVisibility] = 'hidden';
}
};
var vendors = ['webkit', 'moz'];
var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;
for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!requestAnimationFrame) {
requestAnimationFrame = function (callback) {
return setTimeout(callback, 25);
};
cancelAnimationFrame = clearTimeout;
}
return Dragdealer;
}));
new Dragdealer('image-carousel', {
steps: 4,
speed: 0.3,
loose: true,
requestAnimationFrame: true
});

/* /CAROUSEL */

/* (CONSOLE LOG) */

window.addEventListener('load', consolelog());
function consolelog() {
console.log("[Aurolia.css Message]\nThis site using Aurolia.css https://aurolia-css.github.io");
}

/* / (CONSOLE LOG) */

/* TYPEWRITER */

var TxtType = function(el, toRotate, period) {
this.toRotate = toRotate;
this.el = el;
this.loopNum = 0;
this.period = parseInt(period, 10) || 2000;
this.txt = '';
this.tick();
this.isDeleting = false;
};
TxtType.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];
if (this.isDeleting) {
this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
this.txt = fullTxt.substring(0, this.txt.length + 1);
}
this.el.innerHTML = '<span class="typewriter-line">'+this.txt+'</span>';
var that = this;
var delta = 200 - Math.random() * 100;
if (this.isDeleting) { delta /= 2; }
if (!this.isDeleting && this.txt === fullTxt) {
delta = this.period;
this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
this.isDeleting = false;
this.loopNum++;
delta = 500;
}
setTimeout(function() {
that.tick();
}, delta);
};
window.onload = function() {
var elements = document.getElementsByClassName('typewriter');
for (var i=0; i<elements.length; i++) {
var toRotate = elements[i].getAttribute('data-type');
var period = elements[i].getAttribute('data-period');
if (toRotate) {
new TxtType(elements[i], JSON.parse(toRotate), period);
}
}
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".typewriter > .typewriter-line { border-right: 0.08em solid #00a3a3} /* This is not working in .css file */ input[type='radio']:not(:disabled):active, input[type='radio']:not(:disabled):not(:checked):active, input[type='radio']:not(:disabled):not(:checked):focus {box-shadow: 0 0 0 10px rgba(204, 204, 204, 0.5) !important; transition: box-shadow 200ms !important; transition-property: all !important;}";
document.body.appendChild(css);
};

/* /TYPEWRITER */

/* FILE INPUT */

'use strict';
;( function ( document, window, index )
{
var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
var label	 = input.nextElementSibling,
labelVal = label.innerHTML;
input.addEventListener( 'change', function( e )
{
var fileName = '';
if( this.files && this.files.length > 1 )
fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
else
fileName = e.target.value.split( '\\' ).pop();
if( fileName )
label.querySelector( 'span' ).innerHTML = fileName;
else
label.innerHTML = labelVal;
});
input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
});
}( document, window, 0 ));

/* /FILE INPUT  */

/* TOAST  */

(function(root, factory) {
try {
if (typeof exports === 'object') {
module.exports = factory();
} else {
root.toast = factory();
}
} catch(error) {
console.log('[Aurolia.css Error]\nIsomorphic compatibility is not supported at this time for toast.')
}
})(this, function() {
if (document.readyState === 'complete') {
init();
} else {
window.addEventListener('DOMContentLoaded', init);
}
toast = {
create: function() {
console.error([
'[Aurolia.css Error]\nDOM has not finished loading.',
'\tInvoke create method when DOM\s readyState is complete'
].join('\n'))
}
};
var autoincrement = 0;
function init() {
var toastcontainer = document.createElement('div');
toastcontainer.id = 'toastcontainer';
document.body.appendChild(toastcontainer);
toast.create = function(options) {
var toast = document.createElement('div');
toast.id = ++autoincrement;
toast.id = 'toast-' + toast.id;
toast.className = 'toast';
if (options.title) {
var h5 = document.createElement('h5');
h5.className = 'toasttitle';
h5.innerHTML = options.title;
toast.appendChild(h5);
}
if (options.text) {
var ptext = document.createElement('p');
ptext.className = 'toasttext';
ptext.innerHTML = options.text;
toast.appendChild(ptext);
}
if (options.toasticon) {
var img = document.createElement('img');
img.src = options.toasticon;
img.className = 'toasticon';
toast.appendChild(img);
}
if (typeof options.callback === 'function') {
toast.addEventListener('click', options.callback);
}
toast.hide = function() {
toast.className += ' toastfadeout';
toast.addEventListener('animationend', removeToast, false);
};
if (options.timeout) {
setTimeout(toast.hide, options.timeout);
}
setTimeout(toast.hide, 5000);
if (options.type) {
toast.className += ' ' + options.type;
}
toast.addEventListener('click', toast.hide);
function removeToast() {
document.getElementById('toastcontainer').removeChild(toast);
}
document.getElementById('toastcontainer').appendChild(toast);
return toast;
}
}
return toast;
});

/* /TOAST */

/* RIPPLE */

document.addEventListener('mousedown', function(event) {
if (!event.target.classList.contains('ripple')) {
return;
}
var rippleBtn = event.target,
ink = rippleBtn.querySelector('.ink'),
diameter;
if (!ink) {
ink = document.createElement('i');
ink.classList.add('ink');
diameter = Math.max(rippleBtn.clientWidth, rippleBtn.clientHeight);
ink.style.width = diameter + 'px';
ink.style.height = diameter + 'px';
['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'].forEach(function(eventName) {
ink.addEventListener(eventName, function() {
ink.parentNode.removeChild(ink)
});
});
rippleBtn.insertBefore(ink, rippleBtn.firstChild);
} else {
diameter = ink.clientWidth;
}
ink.style.top = (event.offsetY - diameter / 2) + 'px';
ink.style.left = (event.offsetX - diameter / 2) + 'px';
ink.classList.remove('is-animating');
ink.width = ink.clientWidth + 'px';
ink.classList.add('is-animating');
});

/* /RIPPLE */

/* SELECT */

var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("select");
for (i = 0; i < x.length; i++) {
selElmnt = x[i].getElementsByTagName("select")[0];
a = document.createElement("DIV");
a.setAttribute("class", "select-selected");
a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
x[i].appendChild(a);
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 1; j < selElmnt.length; j++) {
c = document.createElement("DIV");
c.innerHTML = selElmnt.options[j].innerHTML;
c.addEventListener("click", function(e) {
var y, i, k, s, h;
s = this.parentNode.parentNode.getElementsByTagName("select")[0];
h = this.parentNode.previousSibling;
for (i = 0; i < s.length; i++) {
if (s.options[i].innerHTML == this.innerHTML) {
s.selectedIndex = i;
h.innerHTML = this.innerHTML;
y = this.parentNode.getElementsByClassName("same-as-selected");
for (k = 0; k < y.length; k++) {
y[k].removeAttribute("class");
}
this.setAttribute("class", "same-as-selected");
break;
}
}
h.click();
});
b.appendChild(c);
}
x[i].appendChild(b);
a.addEventListener("click", function(e) {
e.stopPropagation();
closeAllSelect(this);
this.nextSibling.classList.toggle("select-hide");
this.classList.toggle("select-arrow-active");
});
}
function closeAllSelect(elmnt) {
var x, y, i, arrNo = [];
x = document.getElementsByClassName("select-items");
y = document.getElementsByClassName("select-selected");
for (i = 0; i < y.length; i++) {
if (elmnt == y[i]) {
arrNo.push(i)
} else {
y[i].classList.remove("select-arrow-active");
}
}
for (i = 0; i < x.length; i++) {
if (arrNo.indexOf(i)) {
x[i].classList.add("select-hide");
}
}
}
document.addEventListener("click", closeAllSelect);

/* /SELECT */
