module.exports = function(grunt) {
  grunt.config.set('sass', {
    // Compile `mistiness.scss` file into `mistiness.css`
    dev: {
      options: {
        sourceMap: false
      },
      files: {
        'static/styles/mistiness.css': 'src/styles/mistiness.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};
