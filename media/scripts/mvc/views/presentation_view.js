(function() {
  'use strict';

  ss.views.PresentationView = Backbone.View.extend({

    initialize: function() {

    },

    template: _.template($('.presentation-template').html()),

    className: 'presentation',

    renderSlides: function() {
      this.slidesView = new ss.views.SlidesView({collection: this.model.slides, model: this.model});
      this.$el.append(this.slidesView.render().el);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      this.renderSlides();
      
      return this;
    }
  })
})();
