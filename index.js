var path = require('path');
var url = require('url');
var fs   = require('fs');
var jade = require('jade');

module.exports = function (rootPath) {
    return function (req, res) {

        req.parse = url.parse(req.url);

        var parts = req.parse.pathname ? req.parse.pathname.split('/').splice(1) : [];
        var klassName = typeof parts[0] !== 'undefined' && parts[0] !== '' ? parts[0] : 'index';
        var method = typeof parts[1] !== 'undefined' && parts[1] !== '' ? parts[1] : 'index';
        var remaining = parts.splice(2);

        var klassPath = path.join(rootPath, 'classes', klassName);
        var tmplPath = path.join(rootPath, 'templates', klassName + '.jade');

        console.log('-->', req.url, klassName + '.' + method);

        var klass = require(klassPath);
        var out = {};
        if (klass && method && klass.hasOwnProperty(method)) {
            out = klass[method].apply(this, [req, res].concat(remaining));
        } else {
            out = {
                error: 404
            };
        }

        if (!fs.existsSync(tmplPath)) {
            tmplPath = path.join(rootPath, 'templates', '404.jade');
        }
        if (!fs.existsSync(tmplPath)) {
            return res.send('{"error": 500}');
        }

        // console.log('-->', req.url, tmplPath);
        var html;
        try {
            var options = {
                globals: out
            };
            html = jade.renderFile(tmplPath, options);
        } catch (e) {
            console.log('x===>', tmplPath, e);
            html = '{"error": 404}';
        }

        console.log('-->', req.url, 'out:', out, 'html:', html);
        res.send(html);
    };
};
