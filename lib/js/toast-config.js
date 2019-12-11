/* (c) IGOR KOWALCZYK. All rights reserved. */

/* TOAST */

function alerttoast() {
alert("You undo the action");
}
function showtoast(){
toast.create({
title: 'Toast Title',
text: 'Some toast description',
});
};
function showtoastwithalert(){
toast.create({
title: 'Toast Title',
text: 'Some toast description <button onclick="alerttoast()">Undo</button>',
});
};

/* /TOAST */
