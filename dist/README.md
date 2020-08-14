## JavaScript file that exposes the River global variable

If you are not using a build environment like webpack, you may include a standalone script in your static files that exposes a global variable.

Download the `river-vx.x.x.js` file from this directory and serve it from your application's static assets. The `River` constructor will be available as a variable in the global scope.

## to build a new file

Using browserify:

```
browserify toGlobal.js > river-version-num.js
```
