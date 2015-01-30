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

            $("#main-title").text("You are in the " + percentileBand.get('percentile') + " percentile of millennials");

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

        }

    });

    var calculatorCollection = new CalculatorCollection();
    calculatorCollection.fetch({reset:true});

    var percentileCollection = new PercentileCollection();
    percentileCollection.fetch({reset: true});

    var calculatorView = new CalculatorView({el: $('#calculator')});

})($);