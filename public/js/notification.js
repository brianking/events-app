var notification = function(){
	var queue = [];
	
	/**
	 * Add notification to queue
	 * 
	 * @param	array	details		up-to two items, produces two lines, first line is bold
	 * @param	integer	priority	optional, the priority level of notice
	 * @param	string	icon		option, name of an icon to show
	 * @return	integer	notice id, can be used to remove/modify notice
	 */
	this.add = function(details, priority, icon) {};
	
	/**
	 * Remove notification from queue
	 * 
	 * @param	integer	notice_id	the id of the notice to remove
	 * @return	void
	 */
	this.remove = function(notice_id) {};
	
	/**
	 * Modify notification in queue
	 *
	 * @param	integer	notice_id	the id of the notice to modify
	 * @param	array	details		optional, up-to two items, produces two lines, first line is bold
	 * @param	integer	priority	optional, the priority level of notice
	 * @param	string	icon		option, name of an icon to show
	 * @return	integer	notice id, can be used to remove/modify notice
	 */
	this.modify = function(notice_id, details, priority, icon) {};
	
	/**
	 * Checks if a notification is still queued
	 * 
	 * @param	integer	notice_id	the id of the notice to check for
	 * @return	boolean	TRUE if notice exists still
	 */
	this.exists = function(notice_id) {};
};