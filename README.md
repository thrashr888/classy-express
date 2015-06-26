
# Classy Express

A super-simple module-based framework for Express. Sort-of inspired by Jenkins' class-based views where the urls match the class hierarchy. This might not be the best idea, I just wanted to try it out.

# Install

    > npm install classy-express

# Use

Once the middleware is installed, it handles all urls.

```javascript
// server.js
var express = require('express');
var classy = require('classy-express');
var app = express();
app.use(classy(__dirname));
app.listen(8080);
```

The url points directly to a module and method.

```javascript
// classes/user.js
module.exports = {
    // /user/
    index: function (req, res) {
        return { text: 'Hello World!' }
    },
    // /user/id/4
    id: function (req, res, id) {
        return { text: 'User ' + (id ? id : 'not found') }
    }
}
```

The object automatically gets sent to a Jade template.

```jade
// templates/user.jade
doctype html
html(lang="en")
  body
    h1 User
    #container.col
      p=text
```

See the `example` folder for more. Run it with `cd example; npm install; npm start;`. The example requests some urls for you to see the output in the console.

MIT License
-----------

Copyright (C) 2015 Paul Thrasher

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.