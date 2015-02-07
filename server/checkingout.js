Meteor.methods({
	availablechromebook: function(chrome) {
		if ((Chromebooks.findOne({userid: Meteor.userId()}) === undefined) 
	    || (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher']))) {
	      Chromebooks.update(chrome._id, {$set: {status: 1}});
	      Chromebooks.update(chrome._id, {$set: {last_checkout: new Date()}});
	      Chromebooks.update(chrome._id, {$set: {userid: Meteor.userId()}});
	      Chromebooks.update(chrome._id, {$set: {user: Meteor.user().profile.name}});
		}
	},
	checkedoutchromebook: function(chrome) {
	    if (Meteor.userId() === chrome.userid) {
	      Chromebooks.update(chrome._id, {$set: {status: 0}});
	      Chromebooks.update(chrome._id, {$set: {last_checkout: null}});
	      Chromebooks.update(chrome._id, {$set: {userid: null}});
	      Chromebooks.update(chrome._id, {$set: {user: null}});
	    }
	},
	addchromebook: function(chromebook_number, chromebook_serial) {
	    var currNumbers = Chromebooks.find({ number: chromebook_number }).fetch();
	    var currSerials = Chromebooks.find({ serial: chromebook_serial }).fetch();

	    if (Roles.userIsInRole(Meteor.userId(), ['admin']) &&
		    	!((currNumbers.length != 0)
		    	|| (currSerials.length != 0)
		    	|| (chromebook_number == "")
		    	|| (chromebook_serial == ""))) {
		    Chromebooks.insert({
		      "status": 0,
		      "userid": null,
		      "last_checkout": null,
		      "serial": chromebook_serial,
		      "number": chromebook_number
		    });
	    }
	},
	addcart: function(cart_number) {
	    var currCName = carts.find({ number: cart_number }).fetch()
	    if ((currCName.length == 0)
	    	&& (cart_number != "")
	    	&& ((Roles.userIsInRole(Meteor.userId(), ['admin'])))) {

		    carts.insert({
		      "status": 0,
		      "userid": null,
		      "last_checkout": null,
		      "number": cart_number
		    });
	    }
	},

	removechromebook: function(chrome) {
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
	      Chromebooks.remove(chrome._id);
	    }
	},
	removecart: function(chrome) {
	    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
	      carts.remove(chrome._id);
	    }
	},
	yieldchromebook: function(chrome) {
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
	      if (chrome.status === 0) {
	        Chromebooks.update(chrome._id, {$set: {status: 2}});
	        Chromebooks.update(chrome._id, {$set: {user: null}});
	      }
	      else if (chrome.status ===1) {
	        Chromebooks.update(chrome._id, {$set: {status: 2}});
	      }
	      else {
	        Chromebooks.update(chrome._id, {$set: {status: 0}});
	        Chromebooks.update(chrome._id, {$set: {last_checkout: null}});
	        Chromebooks.update(chrome._id, {$set: {userid: null}});
	      }
	    }
	    else {
	      alert("Access Denied");
	    }
	},
	yieldcart: function(chrome) {
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
	      if (chrome.status === 0) {
	        carts.update(chrome._id, {$set: {status: 2}});
	      }
	      else if (chrome.status === 1) {
	        carts.update(chrome._id, {$set: {status: 2}});
	      }
	      else {
	        carts.update(chrome._id, {$set: {status: 0}});
	        carts.update(chrome._id, {$set: {last_checkout: null}});
	        carts.update(chrome._id, {$set: {userid: null}});
	        carts.update(chrome._id, {$set: {user: null}});
	      }
	    }
	    else {
	      alert("Access Denied");
	    }
	},
	availablecart: function(chrome) {
		if ((carts.findOne({userid: Meteor.userId()}) === undefined) 
	    || (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher']))) {
	      carts.update(chrome._id, {$set: {status: 1}});
	      carts.update(chrome._id, {$set: {last_checkout: new Date()}});
	      carts.update(chrome._id, {$set: {userid: Meteor.userId()}});
	      carts.update(chrome._id, {$set: {user: Meteor.user().profile.name}});
	    }
	},
	checkedoutcart: function(chrome) {
		if (Meteor.userId() === chrome.userid) {
	      carts.update(chrome._id, {$set: {status: 0}});
	      carts.update(chrome._id, {$set: {last_checkout: null}});
	      carts.update(chrome._id, {$set: {userid: null}});
	      carts.update(chrome._id, {$set: {user: null}});
	    }
	}

})