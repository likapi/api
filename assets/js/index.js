function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function HideScrollbar() {
  var style = document.createElement("style");
  style.innerHTML = `body::-webkit-scrollbar {display: none;}`;
  document.head.appendChild(style);
}

if(window.location.href.indexOf("?") > -1) {
	document.body.style.background = "#FFF";
	document.title = "Endpoint - API Likapi";
} else {
	HideScrollbar()
	document.body.style.background = "#101118";
	document.getElementById("app").style.display = "flex"
	document.title = "Liste des APIs - Likapi";
}

function call(api) {
	if(typeof api === "undefined") {
		console.log("Erreur aucune url n'a été définie...")
	} else {
		fetch(api)
  			.then(function(response) {
  				if(response.ok) {
    				response.text().then(function(json) {
      					var data = json;
       					document.getElementById("api").innerHTML = data
    				});
    			} else {
				console.error("Erreur 404 avec la librairie Likapi...");
				console.log("Impossible d'appeler l'API : ("+response.url+")...")
  			}
  		});
	}
}

function crypto() {
	var crypto = $_GET('crypto');
	var currency = $_GET('currency');
	var service = $_GET('service');
	if (service == "coinbase") {
		console.log("Vous avez choisi Coinbase")
		if (crypto != null && currency != null) {
			call('https://api.gdax.com/products/'+crypto+'-'+currency+'/book')
		} else {
			console.log("Vous n'avez pas définie crypto ou currency dans l'url...")
		}
	}
	console.log(window.location.href)
}

crypto()