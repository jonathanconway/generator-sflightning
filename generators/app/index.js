'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  // prompting: function () {
  //   this.log(yosay(
  //     'Welcome to the ' + chalk.red('generator-sflightning') + ' generator!'
  //   ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someAnswer',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   return this.prompt(prompts).then(function (props) {
  //     // To access props later use this.props.someAnswer;
  //     this.props = props;
  //   }.bind(this));
  // },

  writing: function () {
    mkdirp.sync('metadata/aura/Component/');
    this.fs.copy(
      this.templatePath('Component.cmp'),
      this.destinationPath('metadata/aura/Component/Component.cmp')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
