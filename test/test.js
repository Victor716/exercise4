const should = require('should')
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    //say()函数的上下文环境是obj，因此this指向obj
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }
    //test函数执行上下文环境是全家作用域，因此this指向window, 但是此时是node环境，全局变量为global
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      //obj.say()虽在return阶段将执行上下文指向obj，但是this.should.equal在它之前执行, 故this指向全局对象
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      //obj.say = function(){...}()是一个立即执行函数，函数里面定义了_say函数，并在return的时候
      //将上下文环境指向了obj，并执行函数，这是this指向obj
      obj.say()
    })
  })
})

