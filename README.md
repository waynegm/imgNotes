imgNotes
=========

imgNotes is an extension of the jQuery [imgViewer](https://github.com/waynegm/imgViewer) plugin that adds markers and notes to an image 
that can be zoomed in and out with the mousewheel and panned around by click and drag. Try out the [demo](http://waynegm.github.io/imgNotes/)

## Dependencies
The plugin is known to work with the configuration described below:

 * [jQuery](http://jquery.com/) (>=1.8)
 * [jQuery UI](http://jqueryui.com/) (>=1.8)
    * [Widget Factory](http://api.jqueryui.com/jQuery.widget/)
 * [jQuery Mousewheel](http://brandonaaron.net/code/mousewheel/docs) (>=3.0)
 * [jQuery imgViewer](https://github.com/waynegm/imgViewer) (>=0.6.0)

## Usage

Include either the development version or minified production version of the JS file located
 in the `dist` folder and associated dependencies into your web page:

```html
<head>
	...
	<script src="jquery.js"></script>
	<script src="jquery-ui.js"></script>
	<script src="jquery.mousewheel.js"></script>
	<script src="jquery.imgViewer.min.js"></script>
	<script src="jquery.imgNotes.min.js"></script>
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
			$("#image1").imgNotes();
		})(JQuery);
	</script>
	...
</body>
```
## Options



## Public Methods


	
## License

This plugin is provided under the [MIT License](http://opensource.org/licenses/MIT). 
Copyright (c) 2013 Wayne Mogg.

## Release History
### 0.6
First release
