'use strict';

var gulp        = require('gulp');
const browserSync = require('browser-sync');
var browserSyncMain = browserSync.create();
var browserSyncSsl = browserSync.create();


let defaultOptions = {
	files: [
                "*.html",
                "*.css",
        ],
        watchEvents: [
                        "add",
                        "change",
                        "unlink",
        ],
	https: false,
	tunnel: false,
        logLevel: "debug",
        logFileChanges: true,
        logConnections: true,
        open: false,
        cors: true,
        reloadDebounce: 2000,
        xip: false,
        local:false,
        notify: true,
        middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
        },
        codeSync: true,
        injectChanges: true,
        reloadOnRestart: true,
        injectNotification: true,
}

gulp.task('main', function() {

	browserSyncMain.init({
		ui: {
			port: 8082,
		},
		proxy: {
			target:'http://'+process.env.SERVERADDRESS+':3333',
			proxyRes: [
				function(proxyRes, req, res) {
					//console.log(proxyRes.headers);
				}
			],
			ws: true,
			proxyReq: [
				function(proxyReq) {
					proxyReq.setHeader('browsersync', 'foobar');
				}
			]
		},
		port: 8080,
		...defaultOptions
	});
});

gulp.task('ssl', function() {

	browserSyncSsl.init({
		ui: {
			port: 8085,
		},
		proxy: {
			target:'https://'+process.env.SERVERADDRESS+':4444',
			proxyRes: [
				function(proxyRes, req, res) {
					//console.log(proxyRes.headers);
				}
			],
			ws: true,
			proxyReq: [
				function(proxyReq) {
					proxyReq.setHeader('browsersync', 'foobar');
				}
			]
		},
		https: true,
		port: 8083,
		...defaultOptions
	});
});


gulp.task('default', gulp.parallel('main','ssl'));

