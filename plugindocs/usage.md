#Using the Plugin
## Dependencies
The plugin has the following dependencies:
- [jQuery](http://jquery.com/) (>=1.8)
- [jQuery UI](http://jqueryui.com/) (>=1.8)
  * [Widget Factory](http://api.jqueryui.com/jQuery.widget/)
- [Hammer.js](http://hammerjs.github.io/) (>=2.0.8)
- [jquery.hammer.js](https://github.com/hammerjs/jquery.hammer.js) (>=2.0.0)
- [jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel) (>=3.0)
- [imgviewer](https://github.com/waynegm/imgViewer) (>=1.0.0)

## Usage
Include either the development version or minified production version of the JS file located
 in the `dist` folder and associated dependencies into your web page:
 
```html
<head>
	...
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" media="screen">
	<style type="text/css" media="all">@import "imgNotes.css";</style>

	<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script src="hammer.min.js"></script>
	<script src="jquery.hammer.js"></script>
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
	<img  id="image1" src="test.jpg" width="80%" />
	...
	<script>
		(function($) {
        	$(document).ready(function(){
				$("#image1").imgNotes();
            });
		})(JQuery);
	</script>
	...
</body>
```
