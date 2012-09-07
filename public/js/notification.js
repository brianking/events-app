// setup database connection
var cradle = require("cradle");
var db = new(cradle.Connection)().database("mozcamp-app");

// create design document for notifications
db.save('_design/notifications', {
  byId: {
    map: function(doc) {
      if (doc.type == 'notification') emit(doc.noticeId, doc);
    }
  },
  byResource: {
    map: function(doc) {
      if (doc.type == 'notification') emit(doc.resource, doc);
    }
  }
});

// import Array.contains method
require("./utils.js");

var notification = function(){
	var _ID = 0;

	/**
	 * Add notification to queue
	 * 
	 * @param string resource   reference to the updated resource
	 * @param	array	details		up-to two items, produces two lines, first line is bold
	 * @param	boolean toAll   if true the notification is seen by everybody, otherwise only those who have subscribed to the resource will see it
	 * @param	string	icon		option, name of an icon to show
	 * @return	integer	notice id, can be used to remove/modify notice
	 */
	this.add = function(_resource, _details, _toAll, _icon) {
	  // create notification object
	  var notice = 
	    {
	      type : 'notification',
	      resource : _resource,
	      details : _details,
	      toAll : _toAll,
	      icon : _icon,
	      seqN : 0,
	      noticeId : _ID++
	    };
	  
	  // add notification in database
	  db.save(notice);
	  
	  // return id
	  return notice.noticeId;
	};
	
	/**
	 * Get notifications for the resource we've subscribed to and which we haven't already seen
	 *
	 * @param array resources   references to the resources
	 * @param array seen  all the notifications we've already seen
	 * @return array notifications  notification objects with all the details
	 */
	this.get = function(_resources, _seens) {
	  var notices = [];
	  var i = 0;
	  
	  // get notifications using byResource view
	  for (var j = 0; j < _resources.length; j++) {
	    db.view('notifications/byResource', {key = _resources[j]}, function(err, doc) {
	      if (err) {
	        //TODO
	      } else if (!_seens.seen(doc)) {
	          notices[i++] = doc;
	      }
	    });
	  }
	  
	  // return new notices to display
	  return notices;
	};

	/**
	 * Remove notification from queue
	 * 
	 * @param	integer	notice_id	the id of the notice to remove
	 * @return	void
	 */
	this.remove = function(notice_id) {
	  
	};
	
	/**
	 * Modify notification in queue
	 *
	 * @param	integer	notice_id	the id of the notice to modify
	 * @param	array	details		optional, up-to two items, produces two lines, first line is bold
	 * @param	boolean toAll   if true the notification is seen by everybody, otherwise only those who have subscribed to the resource will see it
	 * @param	string	icon		option, name of an icon to show
	 * @return	integer	notice id, can be used to remove/modify notice or debug (if new_id = old_id then the notification hasn't changed)
	 */
	this.modify = function(notice_id, _details, _toAll, _icon) {
	  var id = notice_id;
	  
	  while (queue[i].noticeId != notice_id && i != queue.length) i++;
	  if (i != queue.length) {
	    queue[i].details = _details;
	    queue[i].toAll = _toAll;
	    queue[i].icon = _icon;
	    queue[i].seqN++;
	    id = ++_ID;
	  }
	  
	  return id;
	};
};
