#Plugin Methods
The methods unique to this plugin are listed below. Because this plugin is an extension of the [imgViewer](https://github.com/waynegm/imgViewer) it also has all of the  [imgViewer methods](https://github.com/waynegm/imgViewer/plugindocs/methods.md) as well.
##addNote
  * Add a note to the image. 
	* Triggers the "onAdd" callback to insert the markup for the marker
	* Stores the note location and text into the marker element
	* Binds the click event of the marker element to trigger the onShow or onEdit callbacks dependant on the canEdit option.
  * Arguments:
	* note: a javascript object which must have at least a note.x, note.y and note.note properties where x and y is the relative image location of the note and note is the associated text.
  * Returns the marker element
  * Example

```javascript
elem = $("#image1").imgNotes("addNote",{x: 0.4, y: 0.3, note: "Note <b>Text</b>"});
```
  
##count
  * Get the number of notes in the widget
  * Arguments: none
  * Returns: the number of notes in the widget
  *  Example

```javascript
count = $("#image1").imgNotes("count");
```
  
##clear
  * Delete all the notes from the widget
  * Arguments: none
  * Returns: none
  * Example

```javascript
$("#image1").imgNotes("clear");
```

##destroy
  * Delete all the notes and removes the widget
  * Arguments: none
  * Returns: nothing
  * Example
```javascript
$("#image1").imgNotes("destroy");
```

##import
  * Add notes from a javascript array to the widget
  * Arguments - a javascript array of note objects. Each note object must have at least an x, y and note property where x and y is the relative image location of the note and note is the associated text.
   
```javascript
[
	{
   		x: relative x image coordinate,
   		y: relative y image coordinate,
		note: the note text
	},...
]
```

  * Returns: the widget object for chainability
  * Example
```javascript
$("#image1").imgNotes("import", [ {x: "0.5", y:"0.5", note:"AFL Grand Final Trophy"}, 
								      {x: "0.322", y:"0.269", note: "Brisbane Lions Flag"},
								      {x: "0.824", y: "0.593", note: "Fluffy microphone"}]);
```
  
##export
  * Export notes in the widget to a javascript array
  * Arguments: none
  * Returns - a javascript array of note objects:
    ```javascript
    [{  x: relative x image coordinate,
    	y: relative y image coordinate,
		note: the note text },
     ...
    ]
    ```
  * Example:
```javascript
notes = $("#image1").imgNotes("export");
```

##panTo
  * Pan the view to be centred at the given relative image coordinates
  * Arguments:
	relx: relative x image coordinate
	rely: relative y image coordinate
  * Returns a javascript object with the relative image coordinates of the view centre after snapping the edges of the zoomed image to the view boundaries.
```javascript
	{ 
        x: view center relative x image coordinate, 
        y: view center relative y image coordinate
    }
```
  * Returns null if the relative image coordinates are not >=0 and <=1 and the view is not changed.
  * Example:
```javascript
$("#image1").imgNotes("panTo", 0.5,0.0);
```
