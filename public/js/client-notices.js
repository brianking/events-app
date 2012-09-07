var notification = function(){
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
			if(typeof type === 'undefined') {
				type = types[0];
			}
			$('#notice-icon').attr('src', icons_dir + type + '.png').attr('alt', type + ' notice');
			
			$('#notice-header').html(heading);
			
			if(typeof details !== 'undefined') {
				$('#notice-details').show().html(details);
			} else {
				$('#notice-details').hide();
			}
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
	 (function($){
	 	// appends needed element to display notices in to body
	 	$(window.document.body).append('<section id="notice">\
	 		<article>\
	 			<img src="img/icons/{notice type}.png" alt="{notice type icon}" id="notice-icon" />\
	 			<h4 id="notice-header">{notice heading}</h4>\
	 			<p id="notice-details">{notice details}</p>\
	 		</article>\
	 	</section>');
	 })($);
};

window.notification = new notification();
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