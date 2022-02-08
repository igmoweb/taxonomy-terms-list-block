module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		checktextdomain: {
			options: {
				report_missing: false,
				text_domain: 'taxonomyblock',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d',
				],
			},
			files: {
				src: [
					'./**/*.{php,js}', // Include all files
					'!./vendor/**/*',
					'!./node_modules/**/*',
					'!./svn/**/*',
					'!./assets-wporg/**/*',
					'!./build-wporg/**/*',
				],
				expand: true,
			},
		},

		'regex-replace': {
			placeholders: {
				//specify a target with any name
				src: [
					'./build-wporg/readme.txt',
					'./build-wporg/taxonomy-block.php',
				],
				actions: [
					{
						name: 'version',
						search: '%%version%%',
						replace: '<%= pkg.version %>',
						flags: 'g',
					},
					{
						name: 'testedupto',
						search: '%%testedupto%%',
						replace: '<%= pkg.testedupto %>',
						flags: 'g',
					},
					{
						name: 'requires',
						search: '%%requires%%',
						replace: '<%= pkg.requires %>',
						flags: 'g',
					},
					{
						name: 'requires_php',
						search: '%%requires_php%%',
						replace: '<%= pkg.requires_php %>',
						flags: 'g',
					},
				],
			},
		},

		shell: {
			command:
				'svn co https://plugins.svn.wordpress.org/taxonomy-terms-list-block svn',
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: [
							'**/**.*',
							'!phpunit.xml.dist',
							'!tests/**/*',
							'!.gitignore',
							'!node_modules/**/*',
							'!vendor/**/*',
							'!docker-compose.yml',
							'!bin/**/*',
							'!composer.*',
							'!package.*',
							'!package-lock*',
							'!phpcs.xml',
							'!Gruntfile.js',
							'!build-wporg/**/*',
							'!svn/**/*',
							'!assets-wporg/**/*',
						],
						dest: 'build-wporg/',
					},
				],
			},
			svn: {
				files: [
					{
						expand: true,
						src: ['**/*.*'],
						dest: 'svn/trunk/',
						cwd: 'build-wporg/',
					},
					{
						expand: true,
						src: ['**/*.*'],
						dest: 'svn/tags/<%= pkg.version %>',
						cwd: 'build-wporg/',
					},
					{
						expand: true,
						src: ['**/*.*'],
						dest: 'svn/assets/',
						cwd: 'assets-wporg/',
					},
				],
			},
		},
		clean: {
			build: ['build-wporg'],
			svn: ['svn/tags/<%= pkg.version %>', 'svn/trunk/', 'svn/assets/'],
		},
	});

	grunt.registerTask('default', [
		'checktextdomain',
		'clean:build',
		'copy',
		'regex-replace:placeholders',
		'shell',
		'clean:svn',
		'copy:svn',
	]);

	grunt.registerTask('dopot', 'makepot');
};
