/* (c) IGOR KOWALCZYK. All rights reserved. */

/* PICKERS */

/* All */

$(function() {
$("#dd-mm-yy").datepicker({
dateFormat: "dd-mm-yy",
showButtonPanel: "true",
changeMonth: "true",
changeYear: "true",
showWeek: "true",
firstDay: 1
});
} );

/* /All */

/* Only Day */

$(function() {
$("#dd").datepicker({
dateFormat: "dd",
showButtonPanel: "true",
changeMonth: "true",
changeYear: "true",
showWeek: "true",
firstDay: 1
});
});

/* /Only Day*/

/* Only Month */

$(function() {
$("#mm").datepicker({
dateFormat: "mm",
showButtonPanel: "true",
changeMonth: "true",
changeYear: "true",
showWeek: "true",
firstDay: 1
});
});

/* /Only Month */

/* Only Year */

$(function() {
$("#yy").datepicker({
dateFormat: "yy",
showButtonPanel: "true",
changeMonth: "true",
changeYear: "true",
showWeek: "true",
firstDay: 1
});
});

/* /Only Year */

/* /PICKERS */
