test("it creates a form", function() {
  var form = EF.Form.create({
    template: Ember.Handlebars.compile(
      '{{ field name label="Your name" }}'+
      '{{ field email as="textarea" }}' +
      '{{ form buttons submitName="Create" }}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  equal(form.$('.input input').length, 1, "it has a text field");
  equal(form.$('.input textarea').length, 1, "it has a text area");

  equal(form.$('.input label:first').text(), "Your name", "it sets the label");

  equal(form.$('button[type=submit]').text(), "Create", "it overrides the button name");

  Ember.run(function(){
    form.destroy();
  });
});

test("it populates a form with content's values", function() {
  EF.SomeObjectClass = Ember.Object.extend();
  var content = EF.SomeObjectClass.create({
    name: 'Rafael Nadal',
    email: 'rafa@capybara.com',
    password: 'test1234'
  });

  var form = EF.Form.create({
    content: content,
    template: Ember.Handlebars.compile(
      '{{ field name placeholder="Your name"}}'+
      '{{ field email as="textarea"}}' +
      '{{ field password as="password" }}' +
      '{{ form buttons }}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  var data = form.get('data');
  equal(form.$("input:first").val(), "Rafael Nadal");
  equal(data.name, 'Rafael Nadal');
  equal(form.$("input:first").attr('placeholder'), "Your name");
  equal(form.$("textarea").val(), "rafa@capybara.com");
  equal(data.email, 'rafa@capybara.com');
  equal(form.$("input[type=password]").val(), "test1234");
  equal(form.get('name'), 'some_object_class', "it sets the class name");
});

test("it select without options", function(){
  var form = EF.Form.create({
    numbers: Ember.A([1, 2, 3]),
    template: Ember.Handlebars.compile(
      '{{ field age as="select" contentBinding="formView.numbers"}}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  equal(form.$("option:first").text(), "1");

  Ember.run(function(){
    form.destroy();
  });
});

test("it allows options for a select", function(){
  var form = EF.Form.create({
    names: Ember.A([{id: 1, fullName: 'John'}]),
    template: Ember.Handlebars.compile(
      '{{ field age as="select" contentBinding="formView.names" optionValuePath="id" optionLabelPath="fullName"}}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  equal(form.$("option:first").text(), "John");

  Ember.run(function(){
    form.destroy();
  });
});

test("it correctly sets a select's selected value", function(){
  var form = EF.Form.create({
    names: Ember.A([{id: 1, fullName: 'John'}, {id: 2, fullName: 'Peter'}]),
    content: Ember.Object.create({
      father: 2
    }),
    template: Ember.Handlebars.compile(
      '{{ field father as="select" contentBinding="formView.names" optionValuePath="id" optionLabelPath="fullName"}}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  equal(form.get('data').father, 2);

  Ember.run(function(){
    form.destroy();
  });
});
