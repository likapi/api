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
}

crypto()

function trace() {
	var trace = $_GET('trace')
	var ip = $_GET('ip')
	if (trace == "yes" && ip == null) {
		console.log("Obtention de vos informations publiques")
		call('https://freegeoip.app/json/')
	} else {
		if (trace == "no") {
			console.log("Entrez yes en paramètre dans l'url pour obtenir vos informations...")
		}
		if (trace == "yes" && ip) {
			call('https://freegeoip.app/json/'+ip+'')
		}
	}
}

trace()

function ip() {
	var ip = $_GET('ip')
	if (ip == "yes") {
		console.log("Obtention de votre ip publique")
		call('https://api.ipify.org/?format=json')
	} else {
		if (ip == "no") {
			console.log("Entrez yes en paramètre dans l'url pour obtenir votre ip...")
		}
	}
}

ip()

function custom() {
	var custom = $_GET('custom')
	if (custom != null) {
		call(custom)
	} else {
		console.log("Entrez une url dans le paramètre custom...")
	}
}

custom()