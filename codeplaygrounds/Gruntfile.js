module.exports = function(grunt) { 

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	
	grunt.initConfig({ 
		pkg: grunt.file.readJSON('package.json'), 
		less: {
			compile: {
				files: {
					'css/style.css': 'css/less/style.less'
				}
			}
		},
		concat: {
			bar: {
		      src: ['js/parts/a.js','js/parts/b.js','js/parts/c.js','js/parts/d.js','js/parts/e.js'],
		      dest: 'js/script.js',
		    }
		},
		uglify: {
		      options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		      },
		      build: {
		        src: 'js/script.js',
		        dest: 'js/script.min.js'
		      }
	    },
	    
	    htmlmin: {                                     // Task
	        dist: {                                      // Target
	          options: {                                 // Target options
	            removeComments: true,
	            collapseWhitespace: true
	          },
	          files: {                                   // Dictionary of files
	            'dist/index.html': 'index.html',     // 'destination': 'source'
	          }
	        },
	        dev: {                                       // Another target
	          files: {
	            'dist/index.html': 'index.html'
	          }
	        }
        },
		watch: {
			less: {
				files: 'css/less/*.less',
				tasks: 'less'
			},
			concat: {
				files: ['js/parts/a.js','js/parts/b.js','js/parts/c.js','js/parts/d.js','js/parts/e.js'],
				tasks: 'concat'
			},
			uglify: {
				files: 'js/script.js',
				tasks: 'uglify'
			},
			htmlmin: {
				file: "*.html",
				tasks: 'htmlmin'
			}
		}	
	});

}