// Js files to inject in `layouts/partials/script.html`
var mistinessJsFilesToInject = [
  'mistiness.js'
];

// Css files to inject in `layouts/partials/head.html`
var mistinessCssFilesToInject = [
  'mistiness.css'
];

module.exports.mistinessCssFilesToInject = mistinessCssFilesToInject.map(function(path) {
  return 'static/styles/' + path;
});

module.exports.mistinessJsFilesToInject = mistinessJsFilesToInject.map(function(path) {
  return 'static/scripts/' + path;
});
