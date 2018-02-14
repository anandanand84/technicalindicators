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
      external: ["@babel/polyfill"]
    });

    bundle.write({
      'banner': '/* APP */',
      dest: 'dist/browser.js',
      format: 'iife',
      moduleName: 'window',
      'sourceMap': true,
      globals : {
        "@babel/polyfill" : 'window'
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
      external: ["@babel/polyfill"],
    });

    bundleES6.write({
      'banner': '/* APP */',
      dest: 'dist/browser.es6.js',
      format: 'iife',
      moduleName: 'window',
      'sourceMap': true,
      globals : {
        "@babel/polyfill" : 'window'
      }
    })

    let bundleNode = await rollup({
      entry: 'index.js'
    });

    bundleNode.write({
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