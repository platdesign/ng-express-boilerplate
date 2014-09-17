var requireDir = require('require-dir');

global.gulp = {
	basepath: __dirname + '/assets'
};

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
