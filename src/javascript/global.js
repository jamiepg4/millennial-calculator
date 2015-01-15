var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
// require('./autoNumeric');

window.jQuery = $;

Backbone.$ = $;

var app = {};
var jQuery = $.noConflict();

var autoNumericOptions = {'aDec': '.', 'aSign': '$', 'wEmpty': 'sign', 'aPad': false, 'mRound': 'B'};

(function($){

    'use strict';

    var CalculatorModel = Backbone.Model.extend();

    var CalculatorCollection = Backbone.Collection.extend({
        model: CalculatorModel,
        url: 'data.json'
    });

    var CalculatorView = Backbone.View.extend({

        el: '#calculator',
        events: {
            'change input#income': 'updateIncome',
            'keyup input#income': 'updateIncome'
        },

        initialize: function() {
            console.log('initalize view');

            $('#income').val('123');
        },

        updateIncome: function() {
            console.log('update income');
        }

    });

    var calculatorCollection = new CalculatorCollection();
    calculatorCollection.fetch({reset:true});

    var calculatorView = new CalculatorView({el: $('#calculator')});

})($);