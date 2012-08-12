require("ember-forms/fields/base");
require("ember-forms/controls/unbound_select");

var e = Ember.empty;

EF.DateComponent = Ember.ContainerView.extend({
  childViews: ['dayView', 'monthView', 'yearView'],
  tagName: 'span',
  classNames: ['date'],

  value: Ember.computed(function(key, value){
    var day, month, year;
    if (arguments.length === 1){
      day   = this.get('dayView.value');
      month = this.get('monthView.value');
      year = this.get('yearView.value');
      if(!e(day) && !e(month) && !e(year)){
        return new Date(year, month, day, 12, 0, 0);
      }
    }else if(value){
      day = value.getUTCDate() + '';
      month = value.getUTCMonth() + '';
      year = value.getUTCFullYear() + '';
      this.set('dayView.value', day);
      this.set('monthView.value', month);
      this.set('yearView.value', year);
    }
    return value;
  }).volatile(),

  dayView: EF.UnboundSelect.extend({
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_day';
    }),
    prompt: "- Day -",
    content: Ember.computed(function(){
      var days = [];
      for(var i=1; i<=31; i++){
        days.push(i + '');
      }
      return Ember.A(days);
    }).cacheable()
  }),

  monthView: EF.UnboundSelect.extend({
    prompt: "- Month -",
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_month';
    }),
    content: Ember.computed(function(){
      var months = Ember.A(["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", 
        "December"]);
      return months.map(function(month, index){
        return {value: (index + ''), label: month};
      });
    }).cacheable()
  }),

  yearView: EF.UnboundSelect.extend({
    prompt: "- Year -",
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_year';
    }),
    content: Ember.computed(function(){
      var years = [],
          currentDate = new Date(),
          currentYear = currentDate.getFullYear();
      for(var i=currentYear; i>=1920; i--){
        years.push(i + "");
      }
      return Ember.A(years);
    }).cacheable()
  })
});

EF.DateField = EF.BaseField.extend({
  InputView: EF.DateComponent.extend({}),
  value: Ember.computed(function(key, value){
    if(arguments.length === 1){
      return this.get('inputView.value');
    }else{
      this.set('inputView.value', value);
      return value;
    }
  })
});
