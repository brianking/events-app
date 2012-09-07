var notification = (function($){
	// notices to display
	var queue = [],
	// where are the notice icons
	icons_dir = 'img/icons/notices/',
	// notice types that have icons, general notice icon must be first
	types = ['general'],
	// indicates if there is an active notice
	active_notice = false,
	// shows a notice
	show_notice = function() {
		
	};
	
	/**
	 * Add notification to queue
	 */
	this.add = function(heading, details, type) {
		queue.push({
			'type': type,
			'heading': heading,
			'details': details
		});
		
		if(active_notice === false) {
			active_notice = true;
			$('#notice-icon').attr('src', icons_dir + type + '.png').attr('alt', type + ' notice');
		}
	};
	
	/**
	 * Display notice imediately
	 *
	 * Displays the provided notice imediately regardless of what's 
	 * in the queue. [Notice displays over active notice(s).]
	 */
	this.priority = function(heading, details, type) {
		
	};
	
	/**
	 * Initializes the notification system
	 * 
	 * This function is called automatically on all pages
	 */
	 (function(){
	 	// appends needed element to display notices in to body
	 	$(body).append('<section id="notice">\
	 		<article>\
	 			<img src="img/icons/{notice type}.png" alt="{notice type icon}" id="notice-icon" />\
	 			<h4 id="notice-header">{notice heading}</h4>\
	 			<p id="notice-details">{notice details}</p>\
	 		</article>\
	 	</section>');
	 })();
})(jQuery);

window.notification = new notification();

console.log(window.notification);
/*
 ---
 Notification HTML
 ---
 
 <section id="notice">
 	<article>
 		<img src="img/icons/{notice type}.png" alt="{notice type icon}" id="notice-icon" />
 		<h4 id="notice-header">{notice heading}</h4>
 		<p id="notice-details">{notice details}</p>
 	</article>
 </section>
 
*/