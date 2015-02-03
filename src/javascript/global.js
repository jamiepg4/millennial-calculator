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

    var PercentileModel = Backbone.Model.extend();

    var CalculatorCollection = Backbone.Collection.extend({
        model: CalculatorModel,
        url: 'septiles.json'
    });

    var PercentileCollection = Backbone.Collection.extend({
        model: PercentileModel,
        url: 'percentiles.json'
    });

    var CalculatorView = Backbone.View.extend({

        el: '#calculator',
        events: {
            'change input#income': 'updateIncome',
            'keyup input#income': 'updateIncome'
        },

        initialize: function() {
            var numericOptions = {'aDec': '.', 'lZero': 'deny', 'aSign': '$', 'wEmpty': 'sign', 'aPad': false, 'mRound': 'B', 'vMax': 10000000};
            $('#income').autoNumeric('init', numericOptions);
        },

        updateIncome: function() {
            var calculatorBand;
            var percentileBand;

            var income = parseInt($('#income').autoNumeric('get'), 10);

            calculatorCollection.each(function(band) {
                if (income >= band.get('salaryBand')) {
                    calculatorBand = band;
                }
            });

            percentileCollection.each(function(band) {
                if (income >= band.get('salary')) {
                    percentileBand = band;
                }
            });

            var percentile = percentileBand.get('percentile');
            var text;

            if (percentile > 98) {
                text = "You are part of the Millennial 1%!";
            } else if (percentile === 50) {
                text = "You are in the 50th percentile of Millennials";
            } else if (percentile >= 51) {
                text = "You are in the top " + (100 - percentileBand.get('percentile')) + "% of Millennials";
            } else if (percentile <= 49) {
                text = "You are in the bottom " + (100 - percentileBand.get('percentile')) + "% of Millennials";
            }

            $("#main-title").text(text);

            if (income > 0) {
                if (calculatorBand.get('message')) {
                    $("#message").text(calculatorBand.get("message"));    
                }
            } else {
                $("#message").text('');
            }

            $(".street").removeClass("first second third fourth fifth sixth seventh");
            $(".background").removeClass("first second third fourth fifth sixth seventh");
            $(".street").addClass(calculatorBand.get("grade"));
            $(".background").addClass(calculatorBand.get("grade"));

            $("#subtitle").hide();

        }

    });

    var calculatorCollection = new CalculatorCollection();
    calculatorCollection.fetch({reset:true});

    var percentileCollection = new PercentileCollection();
    percentileCollection.fetch({reset: true});

    var calculatorView = new CalculatorView({el: $('#calculator')});

})($);