'use strict';

var d3 = require('d3'),
    HazardResponse = require('HazardResponse'),
    HazardCurveGraphView = require('HazardCurveGraphView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var el,
    view;

el = document.querySelector('#example');
el.innerHTML = '<div class="graph"></div>' +
    '<div class="controls"></div>';

// create view
view = HazardCurveGraphView({
  el: el.querySelector('.graph'),
  title: 'Example HazardCurveGraphView',
  xAxisLabel: 'Ground Motion (g)',
  yAxisLabel: 'Annual Frequency of Exceedence',
  width: 640,
  height: 400,
  paddingLeft: 70,
  paddingRight: 16,
  paddingTop: 30,
  yLines: [
    {
      anchor: 'right',
      classes: ['rate', 'rate-5p50'],
      label: '5% in 50 years',
      value: -Math.log(.95) / 50
    },
    {
      anchor: 'right',
      classes: ['rate', 'rate-2p100'],
      label: '2% in 100 years',
      value: -Math.log(.98) / 100
    }
  ]
});

// example of selected curve
view.curves.on('select', function (curve) {
  console.log('selected curve');
  console.log(curve.get());
});

// load curves
Xhr.ajax({
  url: 'data.json',
  success: function (data) {
    var curves = [];
    data.response.forEach(function (r) {
      var response = HazardResponse(r);
      // update labels, suppress render; curves reset will render
      view.model.set({
        xAxisLabel: response.get('xlabel'),
        yAxisLabel: response.get('ylabel')
      }, {silent: true});
      response.get('curves').data().forEach(function (c) {
        curves.push(c);
      });
    });
    view.curves.reset(curves);
  }
});
