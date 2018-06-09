//Number formatting stuff, will change to logarithmica_numerus.js later
function nFormatter(num,digits){var si=[{value:1,symbol:""},{value:1E3,symbol:"K"},{value:1E6,symbol:"M"},{value:1E9,symbol:"B"},{value:1E12,symbol:"T"},{value:1E15,symbol:"Qa"},{value:1E18,symbol:"Qt"},{value:1E21,symbol:"Sx"},{value:1E24,symbol:"Sp"},{value:1E27,symbol:"Oc"},{value:1E30,symbol:"No"},{value:1E33,symbol:"Dc"},{value:1E36,symbol:"UDc"},{value:1E39,symbol:"DDc"},{value:1E42,symbol:"TDC"},{value:1E45,symbol:"QaDc"},{value:1E48,symbol:"QtDc"},{value:1E51,symbol:"SxDc"},{value:1E54,symbol:"SpDc"},{value:1E57,symbol:"ODc"},{value:1E60,symbol:"NDc"},{value:1E63,symbol:"Vg"},{value:1E66,symbol:"UVg"},{value:1E69,symbol:"DVg"},{value:1E72,symbol:"TVg"},{value:1E75,symbol:"QaVg"},{value:1E78,symbol:"QtVg"},{value:1E81,symbol:"SxVg"},{value:1E84,symbol:"SpVg"},{value:1E87,symbol:"OVg"},];var rx=/.0+$|(.[0-9]*[1-9])0+$/;var i;for(i=si.length-1;i>0;i--){if(num>=si[i].value){break;}} return(num/si[i].value).toFixed(digits).replace(rx,"$1")+si[i].symbol;}

function a(id){return document.getElementById(id)};
var game = {
	replicanti: {
		display: a("replicanti"),
		amount: 1,
		chance: 10,
		tickspeed: 1000,
	},
	upgrades: {
		chance: 1000,
		tickspeed: 10,
		chanceDisplay: a("replicate_chance"),
		chancePriceDisplay: a("replicate_price"),
		tickspeedDisplay: a("tickspeed"),
		tickspeedPriceDisplay: a("tickspeed_price")
	},
	updateHTML: function(){
		game.replicanti.display.innerHTML = nFormatter(game.replicanti.amount,0)+" ";
		game.upgrades.chanceDisplay.innerHTML = "Replicate Chance: " + game.replicanti.chance + "%";
		game.upgrades.chancePriceDisplay.innerHTML = nFormatter(game.upgrades.chance, 0) + " replicanti";
		game.upgrades.tickspeedDisplay.innerHTML = "Tickspeed: " + game.replicanti.tickspeed;
		game.upgrades.tickspeedPriceDisplay.innerHTML = nFormatter(game.upgrades.tickspeed,0) + " replicanti";
	},
	replicantiUpdate: function(){
		game.updateHTML()
		if(game.replicanti.amount < 100){
			for(i=0;i<game.replicanti.amount;i++){
				if(Math.random()*100<game.replicanti.chance){
					game.replicanti.amount+=1;
					game.updateHTML()
				}
			}
		} else if(game.replicanti.amount>100) {
			let x = 0
			for(i=0;i<100;i++){
				if(Math.random()*100<game.replicanti.chance){
					x++
				}
			}
			game.replicanti.amount = Math.floor(game.replicanti.amount*(1+x/100))
			game.updateHTML()
		}
	}
}

var gameLoop = window.setInterval(game.replicantiUpdate, game.replicanti.tickspeed)

game.upgrades.chancePriceDisplay.onclick = function(){
	if(game.replicanti.amount > game.upgrades.chance){
		if(game.replicanti.chance < 100){
			game.replicanti.amount -= game.upgrades.chance;
			game.upgrades.chance *= 1e4;
			game.replicanti.chance += 1;
			game.updateHTML();
		}
	}
}

game.upgrades.tickspeedPriceDisplay.onclick = function(){
	if(game.replicanti.amount > game.upgrades.tickspeed){
		game.replicanti.amount -= game.upgrades.tickspeed
		game.upgrades.tickspeed *= 10;
		clearInterval(gameLoop)
		game.replicanti.tickspeed = (game.replicanti.tickspeed/100)*90;
		game.updateHTML();
		gameLoop = window.setInterval(game.replicantiUpdate, game.replicanti.tickspeed)
	}
}
