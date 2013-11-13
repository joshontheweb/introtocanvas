(function() {
  'use strict';
  
  ss.routers.Main = Backbone.Router.extend({
    routes: {
      ':slide': 'home'
    },

    home: function(slide) {
      console.log('home');
      app.presentation.set({'slide': slide || 0});
    }
  })
  
})();
