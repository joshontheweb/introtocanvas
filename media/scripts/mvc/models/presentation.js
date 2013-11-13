(function() {
  'use strict';

  ss.models.Presentation = Backbone.Model.extend({
    initialize: function() {
      this.slides = new ss.collections.Slides([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
    },

    defaults: {
      slide: 0
    }
  });
})();
