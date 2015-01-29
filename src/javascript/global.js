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
            var numericOptions = {'aDec': '.', 'lZero': 'deny', 'aSign': '$', 'wEmpty': 'sign', 'aPad': false, 'mRound': 'B', 'vMax': 10000000};
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

    var calculatorView = new CalculatorView({el: $('#calculator')});

})($);