'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('appName', {
      type: String,
      required: false
    });
    this.argument('whatItDoes', {
      type: String,
      required: false
    });
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-sflightning') + ' app generator!'
    ));

    var prompts = [];

    if (!this.appName) {
      prompts.push({
        type: 'input',
        name: 'appName',
        message: 'What do you want to name your app?',
      });
    }

    if (!this.whatItDoes) {
      prompts.push({
        type: 'input',
        name: 'whatItDoes',
        message: 'What does your app do? (Describe it in one short sentence)',
      });
    }

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.appName = _.capitalize(_.camelCase(this.props.appName || this.appName));
      this.props.whatItDoes = this.props.whatItDoes || this.whatItDoes;

      Object.assign(this, this.props);
    }.bind(this));
  },

  writing: function () {
    var that = this;
    (['App.auradoc', 'App.app', 'AppController.js']).forEach(function (suffix) {
      that.copy(
        that.templatePath(suffix),
        that.destinationPath(['metadata/aura/', that.props.appName, 'App/', that.props.appName, suffix].join(''))
      );
    });
  },

  install: function () {
    this.installDependencies();
  }
});
