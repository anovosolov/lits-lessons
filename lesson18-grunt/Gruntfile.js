/*
//------------------- Basic Gruntfile ---------------------------//
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  // Load the plugins
  grunt.loadNpmTasks("");

  // Default task(s).
  grunt.registerTask("");
};

*/




/*//------------------- Lets concatenate files  ---------------------------//
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'public/js/libs/*.js',
          'public/js/*.js'
        ],
        dest: 'build/js/main.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask("build", ['concat']);
};*/



/*
//------------------- Lets uglify code  ---------------------------//
module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'public/js/libs/!*.js',
          'public/js/!*.js'
        ],
        dest: 'build/js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {'build/js/main.js': ['build/js/main.js']}
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask("build", ['concat', 'uglify']);
};*/




//------------------- Lets start working with sass  ---------------------------//
/*module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'public/js/libs/!*.js',
          'public/js/!*.js'
        ],
        dest: 'build/js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {'build/js/main.js': ['build/js/main.js']}
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/styles/main.css': 'public/styles/sass/main.scss'
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask("build", ['concat', 'uglify']);
  grunt.registerTask('default', ['sass']);
};*/






//------------------- Lets add watcher for sass and js files  ---------------------------//
/*
module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'public/js/libs/!*.js',
          'public/js/!*.js'
        ],
        dest: 'build/js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {'build/js/main.js': ['build/js/main.js']}
      }
    },


    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/styles/main.css': 'public/styles/sass/main.scss'
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/js/!*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },

      css: {
        files: ['**!/!*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask("build", ['concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
 };
*/






