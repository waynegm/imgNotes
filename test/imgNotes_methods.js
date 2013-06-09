/*
 * imgNotes_methods.js
 */
(function($) {
	
module("imgNotes: methods");

test( "destroy",1, function() {
	var $img = $("#qunit-fixture img");
	
	var tst = $img.imgNotes();
	tst.imgNotes("destroy");
	ok($img.contents().length === 0, "elements added are removed");
	tst.remove();
});

asyncTest( "count",2, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes();
	$img.load(function() {
		var res = tst.imgNotes("count");
		ok(res === 0, "found " + res + " notes - expected 0 at startup");
		tst.imgNotes("addNote", 0.5, 0.5, "Test Text 1");
		tst.imgNotes("addNote", 0.6, 0.6, "Test Text 2");
		res = tst.imgNotes("count");
		ok(res === 2, "after adding two notes count says " + res + " notes");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});


asyncTest( "export",3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes();
	$img.load(function() {
		tst.imgNotes("addNote", 0.5, 0.5, "Test Text 1");
		tst.imgNotes("addNote", 0.6, 0.6, "Test Text 2");
		var res = tst.imgNotes("export");
		ok(res.length === 2, "found " + res.length + " notes - expected 2");
		ok(res[0].x === 0.5 && res[0].y === 0.5 && res[0].note === "Test Text 1", "notes added and exported don't match");
		ok(res[1].x === 0.6 && res[1].y === 0.6 && res[1].note === "Test Text 2", "notes added and exported don't match");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "import",3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes();
	$img.load(function() {
		var notes = [{x: 0.5, y: 0.5, note: "Test Text 1"},{x: 0.6, y: 0.6, note: "Test Text 2"}];
		tst.imgNotes("import", notes);
		var res = tst.imgNotes("export");
		ok(res.length === 2, "found " + res.length + " notes - expected 2");
		ok(res[0].x === 0.5 && res[0].y === 0.5 && res[0].note === "Test Text 1", "notes imported and exported don't match");
		ok(res[1].x === 0.6 && res[1].y === 0.6 && res[1].note === "Test Text 2", "notes imported and exported don't match");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "clear",1, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgNotes();
	$img.load(function() {
		tst.imgNotes("addNote", 0.5, 0.5, "Test Text 1");
		tst.imgNotes("addNote", 0.6, 0.6, "Test Text 2");
		tst.imgNotes("clear");
		var res = tst.imgNotes("export");
		ok(res.length === 0, "found " + res.length + " notes - expected 0");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});


}(jQuery));


