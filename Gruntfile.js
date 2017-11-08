module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// minifies global and local css files
		cssmin: {
			dynamic: {
				files: [
		        {
					expand: true,
					cwd: 'src/',
					src: ['**/*.css'],
					dest: 'production/',
					ext: '.min.css'
		        },
		      ]
			}
		},
		// minifies all global and local js files
		uglify: {
			dynamic: {
				files: [
		        {
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'production/',
					ext: '.min.js'
		        },
		      ]
			}
		},
		// this optimizes your images for when you are 
		// ready to upload your .zips to salesforce
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
			// cleans production folder before running actions
			general: ['production/'],
			// the delects the _global folder from the production folder 
			// once the _global folder is copied into local slides
			global: ['production/_global/']
		},
		copy: {
			// copys all slides from the src folder to the production folder
			slides: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.html'],
				dest: 'production/'
			},
			// once images, css and js are minified/optimized
			// the _global folder is then copied into all slide folders
			globalFiles: {
				expand: true,
				cwd: 'production/_global/',
				src: ['**'],
				dest: 'production/'
			}
		},
		// this takes copy:globalFiles and performs this action on all slides
		// dest paths need to be created and updated manually to ensure the _global folder makes it into each slide
		multidest: {
			globals: {
				tasks: [
					"copy:globalFiles"
				],
				dest: [ "./production/slide_01/_global/"]
			}
		},
		replace: {
			// this converts global paths to local paths
			// when the _globals folder is moved inside the slides
			updateGlobalPaths: {
				src: ['production/**/*.html'],
				overwrite: true,
				replacements: [{
					from: /..\/_global/g,
					to: '_global'
				}]
			},
			// updates .css extension to relfect the CSS minification
			updateCssExt: {
				src: ['production/**/*.html'],
				overwrite: true,
				replacements: [{
					from: /.css"/g,
					to: '.min.css"'
				}]
			},
			// updates .js extension to relfect the JS minification
			updateJsExt: {
				src: ['production/**/*.html'],
				overwrite: true,
				replacements: [{
					from: /.js"/g,
					to: '.min.js"'
				}]
			}
		},
		// this minifies the html once paths and file extensions are updated 
		minifyHtml: {
	        dist: {
	            files: [{
					expand: true,   
					cwd: 'production/',
					src: ['**/*.html'],
					dest: 'production/'	
				}]
	        }
	    },
		// once the slides are ready this creates individual .zips to upload to salesforce
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
	grunt.loadNpmTasks('grunt-minify-html');
	
	// "default" is the only action you use here
	grunt.registerTask('default', ['clean:general', 'copy:slides', 'imagemin', 'cssmin', 'uglify', 'multidest', 'replace', 'clean:global', 'minifyHtml', 'zip_directories:irep']);
	
}