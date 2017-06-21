import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'index.js',
  dest : 'dist/browser.js',
  format: 'iife',
  moduleName : 'window',
  plugins: [
    babel({
      babelrc:false,
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
};
