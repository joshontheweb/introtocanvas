(function() {
  'use strict';

  window.app = new ss.models.App();
  window.appView = new ss.views.AppView({model: app, el: $('.app')});
  window.appView.render()
  window.app.start();
  
})();
