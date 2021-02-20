dev:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js dev

browsersync:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js browsersync

js-minify:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js jsMinify

css-minify:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js cssMinify

sass:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js sass

sass-components:
	/usr/bin/node /var/www/meast/node_modules/gulp/bin/gulp.js --color --gulpfile /var/www/meast/gulpfile.js sassComponents