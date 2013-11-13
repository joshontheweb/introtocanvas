(function() {
  'use strict';

  ss.views.AppView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'handleKeypress');

      $(window).on('keydown', this.handleKeypress);
    
    },

    events: {
      'click .fullscreen': 'toggleFullscreen'
    },
  
    template: _.template($('.app-template').html()),

    className: 'app',
    
    handleKeypress: function(e) {
      console.log(e.keyCode);
      if (e.keyCode == 37) {
        app.router.navigate('/' + (parseInt(this.model.presentation.get('slide')) - 1), {trigger: true});
      }
      if (e.keyCode == 39) {
        app.router.navigate('/' + (parseInt(this.model.presentation.get('slide')) + 1), {trigger: true});
      }
    },

    toggleFullscreen: function(e) {
      var el = $('.presentation')[0];
      if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else {
          el.webkitRequestFullScreen();
        }
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          document.webkitCancelFullScreen();
        }
      }
    },
    
    renderPresentation: function() {
      this.presentationView = new ss.views.PresentationView({model: this.model.presentation});
      this.$el.append(this.presentationView.render().el);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      this.renderPresentation();

      return this;
    }
  })
})();
