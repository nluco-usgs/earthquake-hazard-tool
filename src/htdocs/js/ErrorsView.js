'use strict';

var View = require('mvc/View'),
    Events = require('util/Events');

var ErrorsView = function (params) {

  var _this,
      _initialize,

      _errors, // array of errors
      _errorMarkup, // error list html markup

      _addErrors,
      _removeErrors;

  _this = View(params);

  _initialize = function () {

    _errors = {};

    _errorMarkup = document.createElement('div');
    _errorMarkup.className = 'error-list';
    _this.el.appendChild(_errorMarkup);

    Events.on('add-errors', _addErrors);
    Events.on('remove-errors', _removeErrors);
  };

  _addErrors = function (e) {
    // update the errors object
    _errors[e.input] = e.messages;
    _this.render();
  };

  _removeErrors = function (e) {
    if (_errors[e.input]) {
      _errors[e.input] = null;
    }
    _this.render();
  };

  _this.render = function () {
    var markup;

    markup = [];

    // clear div
    if (!_errors.edition && !_errors.location && !_errors.siteClass &&
        !_errors.timeHorizon) {
      _errorMarkup.innerHTML = '';
      _this.el.classList.remove('alert');
      _this.el.classList.remove('error');
      return;
    }

    console.log(_errors);

    // display errors
    _this.el.classList.add('alert');
    _this.el.classList.add('error');

    markup.push('<b>Errors:</b>');
    markup.push('<ul>');

    // maintain the visual order of the inputs with error output
    if (_errors.edition) {
      markup.push('<li>' + _errors.edition.join('</li><li>') + '</li>');
    }

    if (_errors.location) {
      markup.push('<li>' + _errors.location.join('</li><li>') + '</li>');
    }

    if (_errors.siteClass) {
      markup.push('<li>' + _errors.siteClass.join('</li><li>') + '</li>');
    }

    if (_errors.timeHorizon) {
      markup.push('<li>' + _errors.timeHorizon.join('</li><li>') + '</li>');
    }

    markup.push('</ul>');

    _errorMarkup.innerHTML = markup.join('');
  };

  _initialize();
  params = null;
  return _this;

};

module.exports = ErrorsView;