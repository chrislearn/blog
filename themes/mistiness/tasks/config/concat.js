module.exports = function(grunt) {
  grunt.config.set('concat', {
    // Concat all javascript file into `mistiness.js`
    devJs: {
      src: ['src/scripts/**/*.js'],
      dest: 'static/scripts/mistiness.js',
      options: {
        separator: ';'
      }
    },
    // Concat all stylesheets file into `style.css`
    prodCss: {
      src: ['static/styles/*.css'],
      dest: 'static/styles/style.css'
    },
    // Concat all javascript file in `script.js`
    prodJs: {
      src: require('../pipeline').mistinessJsFilesToInject,
      dest: 'static/scripts/script.js',
      options: {
        separator: ';'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
