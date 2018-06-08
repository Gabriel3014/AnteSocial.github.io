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
		game.replicanti.display.innerHTML = game.replicanti.amount+" ";
		game.upgrades.chanceDisplay.innerHTML = "Replicate Chance: " + game.replicanti.chance + "%";
		game.upgrades.chancePriceDisplay.innerHTML = game.upgrades.chance + " replicanti";
		game.upgrades.tickspeedDisplay.innerHTML = "Tickspeed: " + game.replicanti.tickspeed;
		game.upgrades.tickspeedPriceDisplay.innerHTML = game.upgrades.tickspeed = " replicanti";
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

game.upgrades.chancePriceDisplay.onclick = function(){
	if(game.replicanti.amount > game.upgrades.chance){
		if(game.replicanti.chance < 100){
			game.replicanti.amount -= game.upgrades.chance;
			game.upgrades.chance += 1e4;
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
		game.replicanti.tickspeed /= 10;
		game.updateHTML();
		window.setInterval(gameLoop, game.replicanti.tickspeed)
		
	}
}

var gameLoop = window.setInterval(game.replicantiUpdate, game.replicanti.tickspeed)
