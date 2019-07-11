/*
 * grunt-prefix-css
 * https://github.com/pechan/grunt-prefix-css
 *
 * Copyright (c) 2015 Peter Chan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var fs = require('fs'), 
  path = require('path'),
  parser = require('../lib/parser');

  grunt.registerTask('prefix_css', 'Grunt task to prefix all rules from css-files with some selector', function() {

      var options = this.options({
            prefix: '',
            fileSrc: '',
            fileDest: '',
            separator: ''
      }),
      result = '',
      file = options.fileSrc, 
          code = fs.readFileSync(file).toString(),
          parsed  = parser.parse(code),
          rules = [];

      if (!parsed) {
          throw('Could not parse: ' + file);
      }

      rules = rules.concat(parsed);

      var printRules = function(rules) {
        for (var i = 0; i < rules.length; i++){
          var rule = rules[i], 
            selectors = [];

          if (rule.directive) {
            result = result.concat('' + rule.directive + rule.body + options.separator);
          } else if (rule.media) {
            result = result.concat(rule.media + '{' + options.separator);
            printRules(rule.rules);
            result = result.concat('}' + options.separator);
          } else if (rule.selectors) {
            for (var s = 0; s < rule.selectors.length; s++){
              selectors.push(options.prefix + ' ' + rule.selectors[s]);
            }

            result = result.concat(selectors.join(', ') + rule.body + options.separator);
          }
        }

        return result;
    };
    grunt.file.write(options.fileDest, printRules(rules));
  });

};
