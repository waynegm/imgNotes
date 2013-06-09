(function() {
  // Default to the local version.
  var path = '../libs/jquery/jquery-ui.js';
  // Get any jquery=___ param from the query string.
  var jquiversion = location.search.match(/[?&]jqueryui=(.*?)(?=&|$)/);
  // If a version was specified, use that version from code.jquery.com.
  if (jquiversion) {
    path = 'http://code.jquery.com/ui/' + jquiversion[1] + '/jquery-ui.js';
  }
  // This is the only time I'll ever use document.write, I promise!
  document.write('<script src="' + path + '"></script>');
}());
