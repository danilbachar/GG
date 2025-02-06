'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balls = function () {
  function Balls(context, buffer) {
    _classCallCheck(this, Balls);

    this.context = context;
    this.buffer = buffer;
  }

  _createClass(Balls, [{
    key: 'setup',
    value: function setup() {
      this.gainNode = this.context.createGain();
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
      this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    }
  }, {
    key: 'play',
    value: function play() {
      this.setup();
      this.source.start(this.context.currentTime);
    }
  }, {
    key: 'stop',
    value: function stop() {
      var ct = this.context.currentTime + 1;
      this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
      this.source.stop(ct);
    }
  }]);

  return Balls;
}();

var Buffer = function () {
  function Buffer(context, urls) {
    _classCallCheck(this, Buffer);

    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  _createClass(Buffer, [{
    key: 'loadSound',
    value: function loadSound(url, index) {
      var request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      var thisBuffer = this;
      request.onload = function () {
        thisBuffer.context.decodeAudioData(request.response, function (buffer) {
          thisBuffer.buffer[index] = buffer;
          if (index == thisBuffer.urls.length - 1) {
            thisBuffer.loaded();
          }
        });
      };
      request.send();
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer() {
      var _this = this;

      this.urls.forEach(function (url, index) {
        _this.loadSound(url, index);
      });
    }
  }, {
    key: 'loaded',
    value: function loaded() {
      _loaded = true;
    }
  }, {
    key: 'getSound',
    value: function getSound(index) {
      return this.buffer[index];
    }
  }]);

  return Buffer;
}();

var balls = null,
    preset = 0,
    _loaded = false;
var path = 'audio/';
var sounds = [path + 'sound1.mp3', path + 'sound2.mp3', path + 'sound3.mp3', path + 'sound4.mp3', path + 'sound5.mp3', path + 'sound6.mp3', path + 'sound7.mp3', path + 'sound8.mp3', path + 'sound9.mp3', path + 'sound10.mp3', path + 'sound11.mp3', path + 'sound12.mp3', path + 'sound13.mp3', path + 'sound14.mp3', path + 'sound15.mp3', path + 'sound16.mp3', path + 'sound17.mp3', path + 'sound18.mp3', path + 'sound19.mp3', path + 'sound20.mp3', path + 'sound21.mp3', path + 'sound22.mp3', path + 'sound23.mp3', path + 'sound24.mp3', path + 'sound25.mp3', path + 'sound26.mp3', path + 'sound27.mp3', path + 'sound28.mp3', path + 'sound29.mp3', path + 'sound30.mp3', path + 'sound31.mp3', path + 'sound32.mp3', path + 'sound33.mp3', path + 'sound34.mp3', path + 'sound35.mp3', path + 'sound36.mp3'];
var context = new (window.AudioContext || window.webkitAudioContext)();

function playBalls() {
  var index = parseInt(this.dataset.note) + preset;
  balls = new Balls(context, buffer.getSound(index));
  balls.play();
}

function stopBalls() {
  balls.stop();
}

var buffer = new Buffer(context, sounds);
var ballsSound = buffer.getBuffer();
var buttons = document.querySelectorAll('.b-ball_bounce');
buttons.forEach(function (button) {
  button.addEventListener('mouseenter', playBalls.bind(button));
  button.addEventListener('mouseleave', stopBalls);
});

function ballBounce(e) {
  var i = e;
  if (e.className.indexOf(" bounce") > -1) {
    return;
  }
  toggleBounce(i);
}

function toggleBounce(i) {
  i.classList.add("bounce");
  function n() {
    i.classList.remove("bounce");
    i.classList.add("bounce1");
    function o() {
      i.classList.remove("bounce1");
      i.classList.add("bounce2");
      function p() {
        i.classList.remove("bounce2");
        i.classList.add("bounce3");
        function q() {
          i.classList.remove("bounce3");
        }
        setTimeout(q, 300);
      }
      setTimeout(p, 300);
    }
    setTimeout(o, 300);
  }
  setTimeout(n, 300);
}

var array1 = document.querySelectorAll('.b-ball_bounce');
var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right');

for (var i = 0; i < array1.length; i++) {
  array1[i].addEventListener('mouseenter', function () {
    ballBounce(this);
  });
}

for (var i = 0; i < array2.length; i++) {
  array2[i].addEventListener('mouseenter', function () {
    ballBounce(this);
  });
}

var l = ["49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220"];
var k = ["90", "88", "67", "86", "66", "78", "77", "188", "190", "191"];
var a = {};
for (var e = 0, c = l.length; e < c; e++) {
  a[l[e]] = e;
}
for (var _e = 0, _c = k.length; _e < _c; _e++) {
  a[k[_e]] = _e;
}

document.addEventListener('keydown', function (j) {
  var i = j.target;
  if (j.which in a) {
    var index = parseInt(a[j.which]);
    balls = new Balls(context, buffer.getSound(index));
    balls.play();
    var ball = document.querySelector('[data-note="' + index + '"]');
    toggleBounce(ball);
  }
});




(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "01/01/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

       
        if (distance < 0) {
          document.getElementById("headline").innerText = "С новым годом!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
       
      }, 0)
  }());





  document.querySelector(".card-container").addEventListener("click", () => {
    document.querySelector(".card").classList.toggle("is-opened");;
});







window.onload = function () {
  var firework = JS_FIREWORKS.Fireworks({
      id : 'fireworks-canvas',
      hue : 120,
      particleCount : 50,
      delay : 0,
      minDelay : 20,
      maxDelay : 20,
      boundaries : {
          top: 0,
          bottom: 150,
          left: 50,
          right: 590
      },
      fireworkSpeed : 1,
      fireworkAcceleration : 1.05,
      particleFriction : .95,
      particleGravity : 1.5
  });
  firework.start();
};


/**
* @required: 
*/


var JS_FIREWORKS = JS_FIREWORKS || {};

JS_FIREWORKS.Fireworks = function (options) {

  'use strict';

  if (!(this instanceof JS_FIREWORKS.Fireworks)) {
      return new JS_FIREWORKS.Fireworks(options);
  }

  options = options || {};

  var _self   = this,
      _NS     = JS_FIREWORKS,
      _Class  = _NS.Fireworks,
      _proto  = _Class.prototype,
      _canvas = document.getElementById(options.id || 'fireworks-canvas'),
      _ctx    = _canvas.getContext ? _canvas.getContext('2d') : null,
      _width  = _canvas.width,
      _height = _canvas.height,
      _hue        = options.hue || 120,
      _isRunning  = false,
      _fireworks  = [],
      _particles  = [],
      _particleCount = options.particleCount || 50,
      _tick       = 0,
      _delay      = options.delay || 30,
      _minDelay   = options.minDelay || 30,
      _maxDelay   = options.maxDelay || 90,
      _boundaries = options.boundaries || {
          top    : 50,
          bottom : _height * .5,
          left   : 50,
          right  : _width - 50
      },
      _loop         = _NS.getRenderLoop(),
      _randRange    = _NS.randomRange,
      _randIntRange = _NS.randomIntRange,
      _Firework     = _NS.Firework,
      _Particle     = _NS.Particle;


  _Class.settings = {
      fireworkSpeed : options.fireworkSpeed || 2,
      fireworkAcceleration : options.fireworkAcceleration || 1.05,
      particleFriction : options.particleFriction || .95,
      particleGravity : options.particleGravity || 1.5
  };

  _Class.version = '1.0.2';


  _self.start = function () {
      _isRunning = true;
      _fireworks = [];
      _particles = [];
      _render();
  };

  _self.stop = function () {
      _isRunning = false;
      _self.clear();
  };

  _self.isRunning = function () {
      return _isRunning;
  };

  _self.clear = function () {
      if (!_ctx) {
          return;
      }
      _ctx.globalCompositeOperation = 'source-over';
      _ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      _ctx.fillRect(0, 0, _width, _height);
  };



  var _render = function () {
      if (!_ctx || !_isRunning) {
          return;
      }
      var tmp, count;
      _loop(_render);
      _hue += 0.5;
      _ctx.globalCompositeOperation = 'destination-out';
      _ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      _ctx.fillRect(0, 0, _width, _height);
      _ctx.globalCompositeOperation = 'lighter';
      tmp = _fireworks.length;

      while (tmp--) {
          _fireworks[tmp].draw();
          _fireworks[tmp].update( function (x, y, hue) {
              count = _particleCount;
              while (count--) {
                  _particles.push(_Particle(x, y, _ctx, hue));
              }
              _fireworks.splice(tmp, 1);
          });
      }
  
      tmp = _particles.length;
      while (tmp--) {
          _particles[tmp].draw();
          _particles[tmp].update( function () {
              _particles.splice(tmp, 1);
          });
      }
 
      if (_tick === _delay) {
          _fireworks.push(_Firework(
              _width * .5,
              _height,
              _randIntRange(_boundaries.left, _boundaries.right),
              _randIntRange(_boundaries.top, _boundaries.bottom),
              _ctx,
              _hue
          ));
          _delay = _randIntRange(_minDelay, _maxDelay);
          _tick = 0;
      }
      _tick++;
  };


  return _self;

};

JS_FIREWORKS.Firework = function (x1, y1, x2, y2, context, hue) {

  'use strict';

  if (!(this instanceof JS_FIREWORKS.Firework)) {
      return new JS_FIREWORKS.Firework(x1, y1, x2, y2, context, hue);
  }

  var _self     = this,
      _NS       = JS_FIREWORKS,
      _Class    = _NS.Firework,
      _proto    = _Class.prototype,
      _settings = JS_FIREWORKS.Fireworks.settings,
      _x   = x1,
      _y   = y1,
      _sx  = x1,
      _sy  = y1,
      _dx  = x2,
      _dy  = y2,
      _ctx = context,
      _totalDistance   = 0,
      _currentDistance = 0,
      _coordinates     = [],
      _coordinateCount = 3,
      _angle           = 0,
      _speed           = _settings.fireworkSpeed,
      _acceleration    = _settings.fireworkAcceleration,
      _hue             = hue,
      _brightness      = 0,
      _randIntRange = _NS.randomIntRange,
      _distance     = _NS.distance,
      _sin          = Math.sin,
      _cos          = Math.cos;


  _self.update = function (callback) {
      _coordinates.pop();
      _coordinates.unshift([_x, _y]);
      _speed *= _acceleration;
      var vx = _cos(_angle) * _speed,
          vy = _sin(_angle) * _speed;
      _currentDistance = _distance(_sx, _sy, _x + vx, _y + vy);
      if (_currentDistance >= _totalDistance) {
          callback(_dx, _dy, _hue);
      } else {
          _x += vx;
          _y += vy;
      }
  };

  _self.draw = function () {
      var last = _coordinates.length - 1;
      _ctx.beginPath();
      _ctx.moveTo(_coordinates[last][0], _coordinates[last][1]);
      _ctx.lineTo(_x, _y);
      _ctx.strokeStyle = 'hsl(' + _hue + ', 100%, ' + _brightness + '%)';
      _ctx.stroke();
  };


  ( function () {
      _totalDistance = _distance(_sx, _sy, _dx, _dy);
      while (_coordinateCount--) {
          _coordinates.push([_x, _y]);
      }
      _angle = Math.atan2(_dy - _sy, _dx - _sx);
      _brightness = _randIntRange(50, 70);
  })();

  return _self;

};


JS_FIREWORKS.Particle = function (x, y, context, hue) {

  'use strict';

  if (!(this instanceof JS_FIREWORKS.Particle)) {
      return new JS_FIREWORKS.Particle(x, y, context, hue);
  }

  var _self     = this,
      _NS       = JS_FIREWORKS,
      _Class    = _NS.Particle,
      _proto    = _Class.prototype,
      _settings = JS_FIREWORKS.Fireworks.settings,
      _x        = x,
      _y        = y,
      _ctx      = context,
      _coordinates     = [],
      _coordinateCount = 5,
      _angle    = 0,
      _speed    = 0,
      _friction   = _settings.particleFriction,
      _gravity    = _settings.particleGravity,
      _hue        = hue,
      _brightness = 0,
      _alpha      = 1,
      _decay      = 0,
      _randRange    = _NS.randomRange,
      _randIntRange = _NS.randomIntRange,
      _2PI          = Math.PI * 2,
      _sin          = Math.sin,
      _cos          = Math.cos;

  _self.update = function (callback) {
      _coordinates.pop();
      _coordinates.unshift([_x, _y]);
      _speed *= _friction;
      _x += _cos(_angle) * _speed;
      _y += _sin(_angle) * _speed + _gravity;
      _alpha -= _decay;
      if (_alpha <= _decay) {
          callback();
      }
  };

  _self.draw = function () {
      var last = _coordinates.length - 1;
      _ctx.beginPath();
      _ctx.moveTo(_coordinates[last][0], _coordinates[last][1]);
      _ctx.lineTo(_x, _y);
      _ctx.strokeStyle = 'hsla(' + _hue + ', 100%, ' + _brightness + '%, ' + _alpha + ')';
      _ctx.stroke();
  };


  ( function () {
      while (_coordinateCount--) {
          _coordinates.push([_x, _y ]);
      }
      _angle = _randRange(0, _2PI);
      _speed = _randIntRange(1, 10);
      _hue   = _randIntRange(_hue - 20, _hue + 20);
      _brightness = _randIntRange(50, 80);
      _decay = _randRange(.015, .03);
  })();

  return _self;

};

JS_FIREWORKS.randomRange = function (min, max) {
  return (Math.random() * ( max - min ) + min);
};


JS_FIREWORKS.randomIntRange = function (min, max) {
  return JS_FIREWORKS.randomRange(min, max)|0;
};

JS_FIREWORKS.distance = function (x1, y1, x2, y2) {
  var pow = Math.pow;
  return Math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
};


JS_FIREWORKS.getRenderLoop = function () {
  return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      window.msRequestAnimationFrame || 
      function (callback) { 
          return window.setTimeout(callback, 1000 / 60); 
      }
  );
};









