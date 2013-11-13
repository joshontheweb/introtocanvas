(function() {
  'use strict';

  ss.models.App = Backbone.Model.extend({
    initialize: function() {
      this.presentation = new ss.models.Presentation();
    },

    
    start: function() {
      Backbone.history.start({pushState: true, hashChange: false});
    },

    router: new ss.routers.Main
  });
  
})();
