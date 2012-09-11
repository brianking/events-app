var notification = function(){
	// notices to display
	var queue = [],
	// where are the notice icons
	icons_dir = 'img/icons/notices/',
	// notice types that have icons, general notice icon must be first
	types = ['general'],
	// indicates if there is an active notice
	active_notice = false;
	// shows a notice
	show_notice = function() {
		if(queue.length > 0) {
			notice = queue[0];
			if(active_notice == false) {
				active_notice = true;
				$('#notice-icon').attr('src', icons_dir + notice.type + '.png').attr('alt', notice.type + ' notice');
				
				$('#notice-header').html(notice.heading);
				
				if(typeof notice.details !== 'undefined') {
					$('#notice-details').show().html(notice.details);
				} else {
					$('#notice-details').hide();
				}
				
				$('#notice').slideToggle('slow');
			}
			return;
		} else {
			active_notice = false;
			return;
		}
	};
	
	/**
	 * Add notification to queue
	 */
	this.add = function(heading, details, type) {
		if(typeof type === 'undefined') {
			type = types[0];
		}
		queue.push({
			'type': type,
			'heading': heading,
			'details': details
		});
		show_notice();
	};
	
	/**
	 * Display notice imediately
	 *
	 * Displays the provided notice imediately regardless of what's 
	 * in the queue. [Notice displays over active notice(s).]
	 */
	this.priority = function(heading, details, type) {
		if(typeof type === 'undefined') {
			type = types[0];
		}
		$('#p-notice-icon').attr('src', icons_dir + type + '.png').attr('alt', type + ' notice');
		
		$('#p-notice-header').html(heading);
		
		if(typeof details !== 'undefined') {
			$('#p-notice-details').show().html(details);
		} else {
			$('#p-notice-details').hide();
		}
		
		$('#p-notice').slideToggle('slow', function(){
			$(this).click(function(){
				$(this).slideToggle('slow');
			});
		});
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
	 			<img src="img/icons/notices/general.png" alt="{notice type icon}" id="notice-icon" />\
	 			<h4 id="notice-header">{notice heading}</h4>\
	 			<p id="notice-details">{notice details}</p>\
	 		</article>\
	 	</section>');
	 	
	 	// appends the needed element to display priority notices
	 	$(window.document.body).append('<section id="p-notice">\
	 		<article>\
	 			<img src="img/icons/notices/general.png" alt="{notice type icon}" id="p-notice-icon" />\
	 			<h4 id="p-notice-header">{notice heading}</h4>\
	 			<p id="p-notice-details">{notice details}</p>\
	 		</article>\
	 	</section>');
	 	
	 	// dissmis notices
	 	$('#notice').click(function(){
	 		active_notice = false;
	 		queue.shift();
	 		$(this).slideToggle('slow', function(){
	 			show_notice();
	 		});
	 	});
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