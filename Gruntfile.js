module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// "general" removes the production folder when you go to do a new release
		// "node_mods" removes the node_modules folder after a new release is created
		cssmin: {
			dynamic: {
				files: [
		        {
					expand: true,     // Enable dynamic expansion.
					cwd: 'src/',      // Src matches are relative to this path.
					src: ['**/*.css'], // Actual pattern(s) to match.
					dest: 'production/',   // Destination path prefix.
					ext: '.min.css',   // Dest filepaths will have this extension.
		        },
		      ]
			}
		},
		// minifies the main.js file located in /assets/js
		uglify: {
			dynamic: {
				files: [
		        {
					expand: true,     // Enable dynamic expansion.
					cwd: 'src/',      // Src matches are relative to this path.
					src: ['**/*.js'], // Actual pattern(s) to match.
					dest: 'production/',   // Destination path prefix.
					ext: '.min.js',   // Dest filepaths will have this extension.
		        },
		      ]
			}
		},
		// this optimizes your images for when you are ready to release your website
	    imagemin: {                          
			dynamic: {
				options: {
					optimizationLevel: 7
				},                    
				files: [{
					expand: true,                  
					cwd: 'src/',                   
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'production/'
				}]
			}
		},
		clean: {
			general: ['production/'],
			global: ['production/_global/']
		},
		// Copy creates a copy within the production folder after all commands are run
		copy: {
			slides: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.html'],
				dest: 'production/'
			},
			globalFiles: {
				expand: true,
				cwd: 'production/_global/',
				src: ['**'],
				dest: 'production/'
			}
		},
		zip_directories: {
			irep: {
				files: [{
					filter: 'isDirectory',
					expand: true,
					cwd: './production',
					src: ['*'],
					dest: './production'
				}]
			}
		},
		multidest: {
			globals: {
				tasks: [
					"copy:globalFiles"
				],
				dest: [ "./production/slide_01/_global/"]
			}
		},
		replace: {
			updateGlobalPaths: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /..\/_global/g,
					to: '_global'
				}]
			},
			updateCssExt: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /.css"/g,
					to: '.min.css"'
				}]
			},
			updateJsExt: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /.js"/g,
					to: '.min.js"'
				}]
			}
		}
	});
	
	// loadNpmTasks bring in required grunt modules for use within this file
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-multi-dest');
	grunt.loadNpmTasks('grunt-text-replace'); 
	grunt.loadNpmTasks('grunt-zip-directories');
	
	// "default" is the only action you use here
	grunt.registerTask('default', ['clean:general', 'copy:slides', 'imagemin', 'cssmin', 'uglify', 'multidest', 'replace', 'clean:global', 'zip_directories:irep']);
	
}