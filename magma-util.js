var MAGMAUTIL = (function() {

	var Util = {};

	function createMulti(p, ind, noGen, pInd) {
		/** Method on the for creating a multidimensional array. Beware the old array data will be lost.
		  * p is the placeholder value, if it is a function and the noGen flag is a falsy value then it will be passed an array representing the current index and be used as a generator function.
		  * ind stores what dimensions the array has, for example setting ind to [2, 2] will create a 2 by 2 array.
		  * Author-Joshua
		  * Last Updated-2015/8/6
		  */
		if (pInd === undefined || pInd.constructor !== Array) {
			pInd = [];
		}
		if (this.length > 0) {
			this.length = 0;
		}
		ind = Object.create(ind);
		var l = ind.shift();
		if (ind.length === 0) {
			for (var i = 0; i < l; i ++) {
				var pArr = Object.create(pInd);
				pArr.push(i);
				if (p.constructor === Function && !noGen) {
					var v = p(pArr);
					this.push(v);
				} else {
					this.push(p);
				}
			}
		} else {
			for (var i = 0; i < l; i ++) {
				var a = [];
				var pArr = Object.create(pInd);
				pArr.push(i);
				createMulti.call(a, p, ind, noGen, pArr);
				this.push(a);
			}
		}
		return this;
	};

	function shuffleArray() {
		/**
		  * Method for shuffling the contents of an array.
		  * Author-Joshua
		  * Last Updated-2015/8/6
		  */
		//Create a copy of the array we're operating on that DOESN'T pass by reference
	    var prevArray = this.slice();
	    this.length = 0;
	    var val;
	    while (prevArray.length > 0) {
	    	val = prevArray.splice(Math.floor(Util.math.random(0, prevArray.length)), 1)[0];
	    	this.push(val);
	    }
	};

	function mergeObjects() {
		for (var i = 0; i < arguments.length; i ++) {
			for (var prop in arguments[i]) {
				if(this[prop] === undefined) {
					this[prop] = Object.create(arguments[i][prop]);
				}
			}
		}
	};

	
	//This just creates the functions that we expose to the user (with error catching and code to deal with the user passing us bad values)
	Util.array = {
		create:function(p, ind) {
			return createMulti.call([], p, ind);
		},
		shuffle:function(a) {
			shuffleArray.call(a)
		},
	};

	Util.math = {
		random:function(lo, hi) {
			/**
			  * Shortcut method for getting a random number between two values
			  * Author-Joshua
			  * Last Updated-2015/8/6
			  */
			if(arguments.length < 2) {
				hi = lo;
				lo = 0;
			}
			if (typeof lo !== "number" || typeof hi !== "number") {
				//Chose one for the default return because it's a simple number, and it doesn't produce errors when you try to do math with it
				return 1;
			}
			return lo + Math.random() * (hi - lo);
		},
		normalDist:function(sigma, median) {
			//Thanks StackOverflow! http://stackoverflow.com/a/25582948
			return Util.math.random(-1, 1) * sigma / 2 + median;
		},
	};

	Util.object = {
		merge:function(o) {
			var args = [];
			for (var i = 1; i < arguments.length; i ++) {
				args.push(arguments[i]);
			}

			mergeObjects.apply(o, args);
		},
	};

	return Util;
})();

