module.exports = function(grunt) {
  // Build (environment : production)
  grunt.registerTask('buildProd', [
    'clean:build',
    'syncAssets',
    'replace:cssMistiness',
    'concat',
    'cssmin',
    'uglify',
    'linkAssetsProd'
  ]);
};
