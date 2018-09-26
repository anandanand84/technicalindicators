import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';

var fs = require('fs');

async function doBuild() {
  try {
    let bundle = await rollup({
      entry: 'index.js',
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        builtins(),
        resolve({
          jsnext: true,
          main: true,
          browser: true
        }),
        commonjs({
        }),
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
        minify({
          comments : false
        })
      ],
      external: ["@babel/polyfill", "@tensorflow/tfjs"]
    });

    await bundle.write({
      'banner': '/* APP */',
      dest: 'dist/browser.js',
      format: 'iife',
      moduleName: 'window',
      globals : {
        "@babel/polyfill" : 'window',
        "@tensorflow/tfjs" : 'tf'
      }
    })

    let bundleES6 = await rollup({
      entry: 'index.js',
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        builtins(),
        resolve({
          jsnext: true,
          main: true,
          browser: true
        }),
        commonjs({
        }),
        minify({
          comments : false
        })
      ],
      external: ["@babel/polyfill", "@tensorflow/tfjs"],
    });

    await bundleES6.write({
      'banner': '/* APP */',
      dest: 'dist/browser.es6.js',
      format: 'iife',
      moduleName: 'window',
      globals : {
        "@babel/polyfill" : 'window',
        "@tensorflow/tfjs" : 'tf'
      }
    })

    let bundleNode = await rollup({
      entry: 'index.js',
      external: ["@babel/polyfill", "@tensorflow/tfjs"],
    });

    await bundleNode.write({
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

doBuild().then(()=> {
  var data = fs.readFileSync('dist/browser.js')
  var fd = fs.openSync('dist/browser.js', 'w+')
  var insert = Buffer.from("var tf = window.tf || {};")
  fs.writeSync(fd, insert, 0, insert.length, 0)
  fs.writeSync(fd, data, 0, data.length, insert.length)
  fs.close(fd, (err) => {
    if (err) throw err;
  });
  

  var data = fs.readFileSync('dist/browser.es6.js')
  var fd = fs.openSync('dist/browser.es6.js', 'w+')
  var insert = Buffer.from("var tf = window.tf || {};")
  fs.writeSync(fd, insert, 0, insert.length, 0)
  fs.writeSync(fd, data, 0, data.length, insert.length)
  fs.close(fd, (err) => {
    if (err) throw err;
  });
  console.log('Completed build for node and browser');
});