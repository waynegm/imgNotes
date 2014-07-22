imgNotes
=========

imgNotes is an extension of the jQuery [imgViewer](https://github.com/waynegm/imgViewer) plugin that adds markers and notes to an image 
that can be zoomed in and out with the mousewheel and panned around by click and drag. Try out the [demo](http://waynegm.github.io/imgNotes/).

The widget has an edit and a view mode controlled by an option flag (canEdit). 

In edit mode (canEdit: true) the default action associated with clicking on the image is to insert a marker and open a dialog with a 
textarea to enter a note. The "Delete" button on this dialog deletes the marker and note. Callbacks are provided for developers to 
override the default marker and the note editor.

In view mode (canEdit: false) markers cannot be changed. By default, clicking on a marker displays the associated note in a dialog window. 
This default action can be overriden by a callback option.

Methods are provided to import and export notes from and to  a javascript array.

## Dependencies
The plugin is known to work with the configuration described below:

 * [jQuery](http://jquery.com/) (>=1.8)
 * [jQuery UI](http://jqueryui.com/) (>=1.8)
    * [Widget Factory](http://api.jqueryui.com/jQuery.widget/)
 * [toe.js](https://github.com/visiongeist/toe.js) (>=3.0)
 * [Zoetrope](https://github.com/benplum/Zoetrope) (>=3.0)
 * [jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel) (>=3.0)
 * [jQuery imgViewer](https://github.com/waynegm/imgViewer) (>=0.7.1)

## Usage

Include either the development version or minified production version of the JS file located
 in the `dist` folder and associated dependencies into your web page:

```html
<head>
	...
	<script src="jquery.js"></script>
	<script src="jquery-ui.js"></script>
	<script src="jquery.fs.zoetrope.min.js"></script>
	<script src="toe.min.js"></script>
	<script src="jquery.mousewheel.min.js"></script>
	<script src="imgViewer.min.js"></script>
	<script src="imgNotes.min.js"></script>
	...
</head>
```

Put an image element and a javascript block to attach the plugin to the image in the web page body:

```html
<body>
	...
	<img  id="image1" src="test.jpg" width="50%" />              
	...
	<script>
		(function($) {
			$("#image1").imgNotes({canEdit: true});
		})(JQuery);
	</script>
	...
</body>
```
## Options

###canEdit
  * Controls if notes can be added and edited
  * Default: false
  * Example - to put the widget into edit mode:
  
```javascript
$("#image1").imgNotes("option", "canEdit", true);
```  

###vAll
  * Controls the vertical positioning of the marker relative to the marker location
   A change only affects markers subsequently inserted 
  * Valid Values: top, middle or bottom
  * Default: middle 
  * Example - to put the bottom of the marker element at the note location:
  
```javascript
$("#image1").imgNotes("option", "vAll", "bottom");
``` 
  
###hAll
  * Controls the horizontal positioning of the marker relative to the marker location
   A change only affects markers subsequently inserted 
  * Valid Values: left, middle or right
  * Default: middle 
  * Example - to put the left side of the marker element at the note location:
  
```javascript
$("#image1").imgNotes("option", "hAll", "left");
``` 

###zoomStep
  * How much the zoom changes for each mousewheel click - must be a positive number
  * Default: 0.1
  * Example:

```javascript
$("#image1").imgNotes("option", "zoomStep", 0.05);
```

###zoom
  * Get/Set the current zoom level of the image - must be >= 1
  * Default: 1 (ie the entire image is visible)
  * Example - to display the image magnified 3x:

```javascript
$("#image1").imgNotes("option", "zoom", 3);
```

###zoomable
  * Controls if image will be zoomable
  * Default: true
  * Example - to disble image zooming:

```javascript
$("#image1").imgNotes("option", "zoomable", false);
```

###onAdd
  * Callback triggered when a marker/note is added to the widget to allow developers to define their own markers
   This will happen when notes are imported using the "import" method and when the user clicks on the widget in edit mode
   Within the callback "this" refers to the imgNotes widget
  * Default: Inserts a numbered inverted black teardrop image aligned to point at the insertion point
  * Callback Arguments: none
  * Callback Returns: the new marker element
  * Example:
  

```javascript
$("#image1").imgNotes("option", "onAdd", function() {
	this.options.vAll = "bottom";
	this.options.hAll = "middle";
	return  $(document.createElement('span')).addClass("marker black").html(this.noteCount);
});
```
###onEdit
  * Callback triggered by a mouseclick on the image, to insert a new marker/note, or on an exisitng marker to edit the note 
   when the widget is in edit mode (canEdit: true). Please use the default implementation as a guide to implement a custom interface. 
  * Default: Open a dialog box with a simple textarea to add/edit the note
  * Callback Arguments:
	* ev: the click event
	* elem: the marker DOM element 

###onShow
  * Callback triggered by a mouseclick on an existing marker when the widget is in view mode (canEdit: false).
   Please use the default implementation as a guide to implement a custom interface.
  * Default: Open a dialog box to show the note
  * Callback Arguments:
	* ev: the click event
	* elem: the marker DOM element 

## Public Methods

###addNote
  * Add a note to the image. 
	* Triggers the "onAdd" callback to insert the markup for the marker
	* Stores the note location and text into the marker element
	* Binds the click event of the marker element to trigger the onShow or onEdit callbacks dependant on the canEdit option.
  * Arguments:
	* relx: relative x image coordinate for the marker
	* rely: relative y image coordinate for the marker
	* note: the note text which can include html
  * Returns the marker element
  
###count
  * Get the number of notes in the widget
  * Arguments: none
  * Returns: the widget object for chainability
  
###clear
  * Delete all the notes from the widget
  * Arguments: none
  * Returns: the widget object for chainability

###import
  * Add notes from a javascript array to the widget
  * Arguments - a javascript array of note objects:
	* [{
	*		x: relative x image coordinate,
	*		y: relative y image coordinate,
	*		note: the note text
	* }, ...
	* ]
  * Returns: the widget object for chainability
  
###export
  * Export notes in the widget to a javascript array
  * Arguments: none
  * Returns - a javascript array of note objects:
	* [{
	*		x: relative x image coordinate,
	*		y: relative y image coordinate,
	*		note: the note text
	* }, ...
	* ]

## License

This plugin is provided under the [MIT License](http://opensource.org/licenses/MIT). 
Copyright (c) 2013 Wayne Mogg.

## Release History
### 0.6
- First release

### 0.7.1
- Update to work with imgViewer 0.7.1
- Add zoomable option to disable zooming
- Updated Grunfile.js to include tests against latest version (2.1.0) of jQuery.

### 0.7.2
- Bump version number for bug fix in imgViewer
