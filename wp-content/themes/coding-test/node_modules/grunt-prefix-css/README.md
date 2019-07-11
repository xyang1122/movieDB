# grunt-prefix-css

> Grunt task to prefix all rules from css-files with some selector

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prefix-css --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prefix-css');
```

## The "prefix_css" task

### Overview
In your project's Gruntfile, add a section named `prefix_css` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prefix_css: {
    options: {
      // Task-specific options go here.
    }
  },
});
```
     options: {
        prefix: '.test',
        fileSrc: 'test/fixtures/123.css',
        fileDest: 'test/tmp/123result.css',
        separator: '\n'
      }
### Options

#### options.prefix
Type: `String`
Default value: `',  '`

A string value that is used to prefix all of your css with.

#### options.fileSrc
Type: `String`
Default value: `'.'`

A string value pointing to the source .css file.

#### options.fileDest
Type: `String`
Default value: `','`

#### options.separator
Type: `String`
Default value: `','`

### Usage Examples

#### Default Options


```js
grunt.initConfig({
  prefix_css: {
     options: {
        prefix: '.test',
        fileSrc: 'test/fixtures/123.css',
        fileDest: 'test/tmp/123result.css',
        separator: '\n'
      }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
