window.$ = jQuery;

var data = [
   {
       name: "Restaurant Reviews",
       icon: "",
       submenu: [
           {
               name: "By Author",
               icon: "",
               submenu: [
                   {
                       name: "Sabyasachi",
                       link: "http://www.foodaholix.in/search/label/Sabyasachi?max-results=6"
                   },
                   {
                       name: "Soumabha",
                       link: "http://www.foodaholix.in/search/label/Soumabha?max-results=6"
                   },
                   {
                       name: "Naman",
                       link: "http://www.foodaholix.in/search/label/Naman?max-results=6"
                   },
                   {
                       name: "Guest Authors",
                       link: "http://www.foodaholix.in/search/label/GuestPosts?max-results=6"
                   }
               ]
           },
           {
               name: "By Cities",
               icon: "",
               submenu: [
               {
                   name: "Bangalore",
                   link: "http://www.foodaholix.in/search/label/Bangalore?max-results=6"
               },
               {
                   name: "Delhi NCR",
                   link: "http://www.foodaholix.in/search/label/Delhi%20NCR?max-results=6"
               },
               {
                   name: "Hyderabad",
                   link: "http://www.foodaholix.in/search/label/Hyderabad?max-results=6"
               },
               {
                   name: "Kolkata",
                   link: "http://www.foodaholix.in/search/label/Kolkata?max-results=6"
               },
               {
                   name: "Other Cities",
                   link: "http://www.foodaholix.in/search/label/Other%20Cities?max-results=6"
               }
               ]
           },
           {
               name: "By Categories",
               icon: "",
               submenu: [
               {
                   name: "Street Food",
                   link: "http://www.foodaholix.in/search/label/Street%20food?max-results=6"
               },
               {
                   name: "Quick Bytes",
                   link: "http://www.foodaholix.in/search/label/Quick%20Bytes?max-results=6"
               },
               {
                   name: "Traveller's Food Diary",
                   link: "http://www.foodaholix.in/search/label/Travel?max-results=6"
               }
               ]
           }
       ]
   },
   {
       name: "Product Reviews",
       icon: "",
       link: "http://www.foodaholix.in/search/label/Product%20Reviews?max-results=6",
   },
   {
       name: "Events and Festivals",
       icon: "",
       submenu: [
           {
               name: "Food Festivals",
               icon: "",
               link: "http://www.foodaholix.in/search/label/Food%20Festivals?max-results=6"
           },
           {
               name: "Events and Menu Launches",
               icon: "",
               link: "http://www.foodaholix.in/search/label/Events?max-results=6"
           }
           ]
   },
   {
       name: "Contributors",
       icon: "",
       link: "http://www.foodaholix.in/p/our-contributers.html",
   },
   {
       name: "Contact Us",
       icon: "",
       link: "http://www.foodaholix.in/p/contact-us.html",
   }
];

var constants = {
    arrowDown: "",
	arrowRight: ""
};

function createSubMenu(menuItem, isTopListItem) {
	if(!menuItem.submenu) {
		return "";
	}

	var extraClass = isTopListItem ? "topMenu" : "sideMenu";

	var subMenu = "<div class='submenu "+extraClass+"' id='"+menuItem.name.replace(/ /g, "_")+"'><ul>";

	var subMenuData = menuItem.submenu;

	for(var i=0, len=subMenuData.length; i<len; i++) {
		var menuItemInternal = subMenuData[i];
		var href = menuItemInternal.link || "#";
		var htmlString = "<li class='item' data-name='"+menuItemInternal.name+"'><a href='"+href+"'>";

		if(menuItemInternal.icon) {
			htmlString += "<span class='MG_Icons24'>"+menuItemInternal.icon+"</span>";
		}

		htmlString += menuItemInternal.name;

		if(menuItemInternal.submenu) {
			htmlString += "<span class='MG_Icons24 arrow'>"+constants.arrowRight+"</span>";
		}

		htmlString += "</a>"+createSubMenu(menuItemInternal)+"</li>";
		subMenu +=  htmlString;
		
	}
	subMenu += "</ul></div>";

	return subMenu;
}

function displaySubMenu (targetEl) {
	var name = targetEl.getAttribute("data-name");
	var $listItem = $(targetEl);
	$listItem.addClass('active');
	var $submenu = $("#" + name.replace(/ /g, "_"));

	if(!$submenu.length) {
		return;
	}

	var isTopListItem = $listItem.closest("ul").parent()[0].id === "MyMenu1";

	if(isTopListItem) {
		var top = $listItem.outerHeight();
		var left = 0;

		$submenu.css({
			visibility: 'visible',
			top: top +'px',
			left: left +'px'
		});
	} else {
		var top = 0;
		var left = $listItem.outerWidth();

		$submenu.css({
			visibility: 'visible',
			top: top +'px',
			left: left +'px'
		});
	}

}

function hideSubMenu (targetEl) {
	var $targetEl = $(targetEl);

	$targetEl.removeClass('active');

	var name = $targetEl.data("name");

	$("#"+name.replace(/ /g, "_")).css('visibility', 'hidden');

}

function init () {
	var myMenuDiv = document.getElementById("MyMenu1");

	var topMenu = document.createElement("ul");

	myMenuDiv.appendChild(topMenu);
	
	for(var i=0, len = data.length; i<len; i++) {
		var menuItem = data[i];
		var href = menuItem.link || "#";
		var htmlString = "<li class='item' data-name='"+menuItem.name+"'><a href='"+href+"'>";

		if(menuItem.icon) {
			htmlString += "<span class='MG_Icons24'>"+menuItem.icon+"</span>";
		}

		htmlString += menuItem.name;

		if(menuItem.submenu) {
			htmlString += "<span class='MG_Icons24 arrow'>"+constants.arrowDown+"</span>";
		}

		htmlString += "</a>"+createSubMenu(menuItem, true);+"</li>";
		topMenu.innerHTML = topMenu.innerHTML + htmlString;
	}

	$(window).on("mouseenter", ".item", function(e){
		var target = e.currentTarget;
			displaySubMenu(target);
	});

	$(window).on("mouseleave", ".item", function(e){
		var target = e.currentTarget;
			hideSubMenu(target);
	});

  $(window).scroll(function(e){
    var $menu = $('#MyMenu1');
    var $parent = $menu.parent();
    var $imgHeader = $('#sticky-header-img');
    if($parent.offset().top <= $(window).scrollTop()){
      $menu.addClass("sticky");
    } else {
      $menu.removeClass("sticky");
    }
    if($parent.offset().top <= $(window).scrollTop() + 50){
      $imgHeader.removeClass("hidden");
    } else {
      $imgHeader.addClass("hidden");
    }
  });
}

init();