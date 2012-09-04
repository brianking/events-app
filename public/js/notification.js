var notification = function(){
	var queue = [];
	var _ID = 0;
	//var mutex = false;
	
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
	  //while (mutex) {}
	  
	  //mutex = true;
	  var length = queue.length;
	  
	  queue[length] = 
	    {
	      resource : _resource,
	      details : _details,
	      toAll : _toAll,
	      icon : _icon,
	      seqN : 0,
	      noticeId : _ID++
	    };
	  //mutex = false;
	  
	  return queue[length].noticeId;
	};
	
	/**
	 * Get notifications for the resource we've subscribed to and which we haven't already seen
	 *
	 * @param array resources   references to the resources
	 * @param array seen  all the notifications we've already seen
	 * @return array notifications  notification objects with all the details
	 */
	this.get = function(resources, seen) {};

	/**
	 * Remove notification from queue
	 * 
	 * @param	integer	notice_id	the id of the notice to remove
	 * @return	void
	 */
	this.remove = function(notice_id) {
	  //while (mutex) {}
	  
	  //mutex = true;
	  var i = 0;
	  
	  while (queue[i].noticeId != notice_id && i != queue.length) i++;
	  queue[i] = queue[queue.length - 1];
	  queue = queue.slice(0, i).concat(queue.slice(i, -1).sort(function(a,b) { return a-b; }));
	  //mutex = false;
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
	  //while (mutex) {}
	  
	  //mutex = true;
	  var id = notice_id;
	  
	  while (queue[i].noticeId != notice_id && i != queue.length) i++;
	  if (i != queue.length) {
	    queue[i].details = _details;
	    queue[i].toAll = _toAll;
	    queue[i].icon = _icon;
	    queue[i].seqN++;
	    id = ++_ID;
	  }
	  //mutex = false;
	  
	  return id;
	};
};
