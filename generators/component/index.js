'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('componentName', {
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
      'Welcome to the ' + chalk.red('generator-sflightning') + ' component generator!'
    ));

    var prompts = [];

    if (!this.componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What do you want to name your component?',
      });
    }

    if (!this.whatItDoes) {
      prompts.push({
        type: 'input',
        name: 'whatItDoes',
        message: 'What does your component do? (Describe it in one short sentence)',
      });
    }

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.componentName = _.capitalize(_.camelCase(this.props.componentName || this.componentName));
      this.props.whatItDoes = this.props.whatItDoes || this.whatItDoes;

      Object.assign(this, this.props);
    }.bind(this));
  },

  writing: function () {
    var that = this;
    (['.auradoc', '.cmp', 'Controller.js']).forEach(function (suffix) {
      that.copy(
        that.templatePath(['Component', suffix].join('')),
        that.destinationPath(['metadata/aura/', that.props.componentName, '/', that.props.componentName, suffix].join(''))
      );
    });
  },

  install: function () {
    this.installDependencies();
  }
});
