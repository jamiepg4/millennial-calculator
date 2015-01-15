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
        },

        updateIncome: function() {
            var calculatorBand;
            var income = $("#income").val();

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