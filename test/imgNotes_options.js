/*
 * imgNotes_options.js
 */
(function($) {
module("imgNotes: options");
	
test( "canEdit option", 2, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes({
		canEdit: true
	});
	equal(tst.imgNotes("option", "canEdit"), true, "set canEdit option in constructor");
	tst.imgNotes("option", "canEdit", false);
	equal(tst.imgNotes("option", "canEdit"), false, "set canEdit option on built object");
	tst.remove();
});

test( "vAll option", 3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes({
		vAll: 'bottom'
	});
	equal(tst.imgNotes("option", "vAll"), 'bottom', "set vAll option in constructor");
	tst.imgNotes("option", "vAll", 'top');
	equal(tst.imgNotes("option", "vAll"), 'top', "set vAll option on built object");
	tst.imgNotes("option", "vAll", 'crazy');
	equal(tst.imgNotes("option", "vAll"), 'middle', "vAll defaults to middle on bad input");
	tst.remove();
});

test( "hAll option", 3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes({
		hAll: 'left'
	});
	equal(tst.imgNotes("option", "hAll"), 'left', "set hAll option in constructor");
	tst.imgNotes("option", "hAll", 'right');
	equal(tst.imgNotes("option", "hAll"), 'right', "set hAll option on built object");
	tst.imgNotes("option", "hAll", 'crazy');
	equal(tst.imgNotes("option", "hAll"), 'middle', "hAll defaults to middle on bad input");
	tst.remove();
});

}(jQuery));