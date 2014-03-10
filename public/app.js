window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };
  }
};

App.Routers.Main = Backbone.Router.extend({
  routes: {
    ''        : 'main',
    ':search' : 'main'
  },

  main: function(event){
    var view = new App.Views.Index();
    $("#container").append(view.render().el);
  }



});

App.Views.Index = Backbone.View.extend({
  id: 'search',

  template: function(){ return "<input id=\"user_input\" type=\"text\">Search</input>";},

  render: function(){
    $(this.el).html(this.template());
    return this;
  },

  events: {
    "submit #user_input": "find"
  },

  find: function(){
    var word = $("#search_field").val();
    var results = App.autocompleter.complete(word);
    $.each(results, function(index, value){
      $("#titles").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
    });
  }
});


$(document).ready(function(){
  App.initialize();
});

