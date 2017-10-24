module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// "general" removes the production folder when you go to do a new release
		// "node_mods" removes the node_modules folder after a new release is created
		clean: {
			general: ['production/'],
			global: ['production/_global/']
		},
		// Copy creates a copy within the production folder after all commands are run
		copy: {
			slides: {
				expand: true,
				cwd: 'src/',
				src: ['**/*'],
				dest: 'production/'
			},
			globalFiles: {
				expand: true,
				cwd: 'src/_global',
				src: ['**'],
				dest: 'production/'
			},
			images: {
				expand: true,
				cwd: 'src/_global/images/',
				src: ['**/*.{png,jpg,gif,svg}'],
				dest: 'production/'
			},
			js: {
				expand: true,
				cwd: 'src/_global/js/',
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
	
	// "default" is for use when developing the theme
	// "release" is for when you want your final files for deployment
	// "releasecopy" is only used within "release" and you won't use this on its own
	grunt.registerTask('default', ['clean:general', 'copy:slides', 'multidest:globals', 'clean:global', 'replace:updateGlobalPaths', 'zip_directories:irep']);
	//grunt.registerTask('release', ['clean:general', 'sass', 'cssmin', 'imagemin', 'uglify', 'releasecopy', 'clean:node_mods']);
	//grunt.registerTask('releasecopy', ['copy:videos', 'copy:pdfs', 'copy:vendorjs', 'copy:fonts', 'copy:favicons', 'copy:copyphp']);
	
}