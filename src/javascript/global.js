var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

window.jQuery = $;

require('./autoNumeric');

Backbone.$ = $;
var jQuery = $.noConflict();

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
            var numericOptions = {'aDec': '.', 'aSign': '$', 'wEmpty': 'sign', 'aPad': false, 'mRound': 'B'};
            $('#income').autoNumeric('init', numericOptions);
        },

        updateIncome: function() {
            var calculatorBand;
            var income = parseInt($('#income').autoNumeric('get'), 10);

            calculatorCollection.each(function(band) {
                if (income >= band.get('salaryBand')) {
                    calculatorBand = band;
                }
            });

            $("#message").text(calculatorBand.get("message"));

        }

    });

    var calculatorCollection = new CalculatorCollection();
    calculatorCollection.fetch({reset:true});

    var calculatorView = new CalculatorView({el: $('#calculator')});

})($);