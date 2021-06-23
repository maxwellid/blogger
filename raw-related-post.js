	var currentURL = &#39;<data:blog.url/>&#39;;
	var post_thumbnail_width = 250;
	var post_thumbnail_height = 150;
	var max_related_entries = 12;

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function replaceAll(str, term, replacement) {
	return str.replace(new RegExp(escapeRegExp(term), "g"), replacement)
}

function display_related_posts(json_feed) {
	for (var defaultnoimage = "https://i.ibb.co/yS6JvBh/no-image.jpg", post_titles = new Array, title_num = 0, post_urls = new Array, post_thumbnail_url = new Array, relatedpoststitle = (window.location.href, "Post Lainnya"), border_color = "#DDDDDD", i = 0; i < json_feed.feed.entry.length; i++) {
		var feed_entry = json_feed.feed.entry[i];
		post_titles[title_num] = feed_entry.title.$t;
		try {
			post_thumbnail_url[title_num] = feed_entry.media$thumbnail.url
		} catch (error) {
			s = feed_entry.content.$t, a = s.indexOf("<img"), b = s.indexOf('src="', a), c = s.indexOf('"', b + 5), d = s.substr(b + 5, c - b - 5), -1 != a && -1 != b && -1 != c && "" != d ? post_thumbnail_url[title_num] = d : "undefined" != typeof defaultnoimage ? post_thumbnail_url[title_num] = defaultnoimage : post_thumbnail_url[title_num] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC"
		}
		for (var k = 0; k < feed_entry.link.length; k++) "alternate" == feed_entry.link[k].rel && (post_urls[title_num] = feed_entry.link[k].href, title_num++)
	}
	var random_entry = Math.floor((post_titles.length - 1) * Math.random()),
		iteration = 0;
	if (post_titles.length > 0) {
		var rp_heading = document.createElement("h2"),
			textnode = document.createTextNode(relatedpoststitle);
		rp_heading.appendChild(textnode), document.getElementById("related-posts").appendChild(rp_heading);
		var rp_container = document.createElement("ul");
		rp_container.setAttribute("style", "clear: both;"), rp_container.setAttribute("id", "rp-container"), document.getElementById("related-posts").appendChild(rp_container)
	}
	for (; iteration < post_titles.length && 20 > iteration && max_related_entries > iteration;)
		if (post_urls[random_entry] != currentURL) {
		    
		    var rp_list = document.createElement("li");
			rp_list.setAttribute("id", "rp-list-" + iteration), rp_list.setAttribute("class", "rp-list ripple"), document.getElementById("rp-container").appendChild(rp_list);
		    
			var rp_anchor = document.createElement("a");
			0 != iteration ? rp_anchor.setAttribute("style", "text-decoration:none") : rp_anchor.setAttribute("style", "text-decoration:none;"), rp_anchor.setAttribute("id", "rp-anchor-" + iteration), rp_anchor.setAttribute("class", "rp-anchor"), rp_anchor.setAttribute("href", post_urls[random_entry]), document.getElementById("rp-list-" + iteration).appendChild(rp_anchor);

			var rp_anchor_title = document.createElement("a");
			rp_anchor_title.setAttribute("id", "rp-anchor-title-" + iteration), rp_anchor_title.setAttribute("class", "rp-anchor-title"), rp_anchor_title.setAttribute("href", post_urls[random_entry]), document.getElementById("rp-list-" + iteration).appendChild(rp_anchor_title);
			
			var rp_img = document.createElement("img");
			rp_img.setAttribute("id", "rp-img-" + iteration);

			var pin = String(post_thumbnail_url[random_entry].match(/\/s72-c\//));
			post_thumbnail_url[random_entry] = replaceAll(post_thumbnail_url[random_entry], pin, "/w" + post_thumbnail_width + "-h" + post_thumbnail_height + "-p/"), rp_img.setAttribute("src", post_thumbnail_url[random_entry]), rp_img.setAttribute("alt", "image"), document.getElementById("rp-anchor-" + iteration).appendChild(rp_img);

			var rp_para = document.createElement("span");
			rp_para.setAttribute("id", "rp-para-" + iteration);

			var textnode = document.createTextNode(post_titles[random_entry]);
			rp_para.appendChild(textnode), document.getElementById("rp-anchor-title-" + iteration).appendChild(rp_para), iteration++, random_entry < post_titles.length - 1 ? random_entry++ : random_entry = 0
		}
	else iteration++, random_entry < post_titles.length - 1 ? random_entry++ : random_entry = 0;
	post_urls.splice(0, post_urls.length), post_thumbnail_url.splice(0, post_thumbnail_url.length), post_titles.splice(0, post_titles.length)
}
