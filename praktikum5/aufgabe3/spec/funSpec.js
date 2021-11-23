const {findTag, fibonacci, equal } = require('../index');

describe("findTag", function() {
    it("valid tag", function() {
        expect(findTag('<title>Dies ist ein Title-Tag</title>')).toEqual('title');
    })

    it("string(no tags)", function() {
        expect(findTag('hello')).toEqual('');
    })

    it("empty string", function() {
        expect(findTag('')).toEqual('');
    })

    it("missing tag-symbol '>' ", function() {
        expect(findTag('<test')).toEqual('');
    })

    it("missing tag-symbol '<'", function() {
        expect(findTag('test>')).toEqual('');
    })
  })


  describe("Fibonacci", function() {
    beforeEach(function() {
    })

    it("fibonacci n=10", function() {
        expect(fibonacci(10)).toEqual(55);
    })

    it("fibonacci n=20", function() {
        expect(fibonacci(20)).toEqual(6765);
    })

    it("fibonacci n=30", function() {
        expect(fibonacci(30)).toEqual(832040);
    })
  })

  describe("Equal", function() {

    it("2 equal strings", function() {
        expect(equal("test", "test")).toBeTrue()
    })

    it("2 not equal strings", function() {
        expect(equal("test1", "test2")).toBeFalse()
    })


    it("2 equal objects", function() {
        expect(equal({a:1, b:2}, {a:1, b:2})).toBeTrue()
    })

    it("2 not equal objects", function() {
        expect(equal({a:1, b:2}, {a:1, b:3})).toBeFalse()
    })
  })
