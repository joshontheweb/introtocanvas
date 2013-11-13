(function() {
  'use strict';

  ss.views.SlideView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(this.model, 'enter', this.enter);
      this.listenTo(this.model, 'exit', this.exit);
      
      this.template = _.template($('.slide-' + this.model.collection.indexOf(this.model) + '-template').html());
    },

    className: 'slide',

    events: {
      'click .draw-line-btn': 'drawLine',
      'click .draw-shape-btn': 'drawShape',
      'click .draw-text-btn': 'drawText',
      'click .draw-arcs-btn': 'drawArcs',
      'click .draw-curves-btn': 'drawCurves',
      'click .draw-graph-btn': 'drawGraph',
      'click .draw-animation-btn': 'drawAnimation',
      'click .draw-performance-btn': 'drawPerformance',
      'click .draw-pixel-width-btn': 'drawPixelWidth'
    },

    drawLine: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-line')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#b63c3c';
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(300,150);
      ctx.stroke();
      ctx.closePath();
    },    

    drawShape: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-shape')[0];
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#b63c3c';
      ctx.beginPath();
      ctx.moveTo(100,100);
      ctx.lineTo(150,50);
      ctx.lineTo(200,100);
      ctx.lineTo(100,100);
      ctx.fill();
      ctx.closePath();
    },

    drawText: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-text')[0];
      var ctx = canvas.getContext('2d');
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.fillStyle = '#b63c3c';
      ctx.font = "40px Georgia";
      ctx.fillText("Hello World!", 35, 90);
    },

    drawArcs: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-arcs')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#b63c3c';
      ctx.arc(150,75,50,0,Math.PI*2,true); // Outer circle
      ctx.moveTo(185,75);
      ctx.arc(150,75,35,0,Math.PI,false);   // Mouth (clockwise)
      ctx.moveTo(140,65);
      ctx.arc(135,65,5,0,Math.PI*2,true);  // Left eye
      ctx.moveTo(170,65);
      ctx.arc(165,65,5,0,Math.PI*2,true);  // Right eye   
      ctx.stroke();
    },

    drawCurves: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-curves')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#b63c3c';
      ctx.beginPath();
      ctx.moveTo(75,25);
      ctx.quadraticCurveTo(25,25,25,62.5);
      ctx.quadraticCurveTo(25,100,50,100);
      ctx.quadraticCurveTo(50,120,30,125);
      ctx.quadraticCurveTo(60,120,65,100);
      ctx.quadraticCurveTo(125,100,125,62.5);
      ctx.quadraticCurveTo(125,25,75,25);
      ctx.stroke(); 
    },

    drawGraph: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-graph')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = '3';
      ctx.fillStyle = '#b63c3c';
      ctx.fillRect(50, 120, 20, 30);
      ctx.fillRect(80, 100, 20, 50);
      ctx.fillRect(110, 75, 20, 75);
      ctx.fillRect(140, 120, 20, 30);
      ctx.fillRect(170, 100, 20, 50);
      ctx.fillRect(200, 75, 20, 75);

      ctx.beginPath();
      ctx.moveTo(60, 100);
      ctx.lineTo(90, 80);
      ctx.lineTo(120, 55);
      ctx.lineTo(150, 100);
      ctx.lineTo(180, 80);
      ctx.lineTo(210, 55);
      ctx.stroke();
      ctx.closePath();
    },

    drawAnimation: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-animation')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#b63c3c';
      ctx.fillStyle = '#b63c3c';

      var x = 0
      var draw = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(x, 50, 50, 50);
        x = (x < canvas.width) ? x + 1 : 0;
        requestAnimationFrame(draw);
      }

      draw();
      
    },

    drawPixelWidth: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-pixel-width')[0];
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#b63c3c';
      ctx.beginPath();
      ctx.moveTo(100,25);
      ctx.lineTo(100, 125);
      ctx.moveTo(200.5, 25);
      ctx.lineTo(200.5, 125);

      ctx.stroke(); 
    },

    drawPerformance: function(e) {
      e.preventDefault();
      var canvas = this.$('.draw-performance')[0];
      var ctx = canvas.getContext('2d');
      
      var fps = 0, now, lastUpdate = (new Date)*1 - 1;

      // The higher this value, the less the FPS will be affected by quick changes
      // Setting this to 1 will show you the FPS of the last sampled frame only
      var fpsFilter = 50;
      
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

      var draw = function(){
        for (var x = 0; x < canvas.width; x++) {
          // for (var y = 0; y < canvas.height; y++) {
            ctx.fillRect(x, 0, 1, 150);
            ctx.fillStyle = (ctx.fillStyle == '#ffffff') ? '#000000' : '#ffffff';
            ctx.font = "40px Georgia";
            ctx.fillText('Text', 100, 75);
          // }
        }

        var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
        fps += (thisFrameFPS - fps) / fpsFilter;
        lastUpdate = now;

        requestAnimationFrame(draw);
      }

      draw();

      var fpsOut = this.$('.fps')[0];
      setInterval(function(){
        fpsOut.innerHTML = fps.toFixed(1) + "fps";
      }, 1000);    
    },

    enter: function() {
      this.$el.css({display: 'none'});
      this.$el.fadeIn();
    },

    exit: function() {
      var view = this;
      this.$el.fadeOut(function() {
        view.remove();
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  })
})();
