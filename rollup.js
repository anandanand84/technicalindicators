import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
var fs = require('fs');

async function doBuild() {
  try {
    let bundle = await rollup({
      entry: 'index.js',
      plugins: [
        babel({
          babelrc: false,
          "presets": [
            [
              "es2015",
              {
                "modules": false
              }
            ]
          ],
          "plugins": [
            "external-helpers"
          ]
        }),
        uglify()
      ]
    });

    bundle.write({
      'banner': '/* APP */',
      dest: 'dist/browser.js',
      format: 'iife',
      moduleName: 'window',
      'sourceMap': true
    })
    bundle.write({
      'banner': '/* APP */',
      dest: 'dist/index.js',
      format: 'cjs',
      'sourceMap': true
    })
  } catch (e) {
    console.error(e);
    console.log(e.message);
  }

};

doBuild().then(console.log.bind(null, 'Completed build for node and browser'));