(function() {
  'use strict';

  ss.views.SlidesView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model, 'change:slide', this.slideChange);
    },
  
    template: _.template($('.slides-template').html()),

    className: 'slides',
    
    slideChange: function(model, slideId) {
      var slide = this.collection.at(slideId);
      
      if (this.currentSlide) {
        this.currentSlide.trigger('exit');
      }
      this.currentSlide = slide;

      this.renderSlide(slide, slideId);
    },

    renderSlide: function(slide, id) {
      var slideView = new ss.views.SlideView({model: slide, className: 'slide slide-' + id});
      this.$el.html(slideView.render().el);
      slide.trigger('enter');
    },
    
    renderSlides: function() {
      var view = this;
      this.collection.each(function(slide) {
        view.renderSlide(slide);
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      this.renderSlide(this.collection.at(this.model.get('slide')), this.model.get('slide'));
      
      return this;
    }
  })
})();
