function a(id){return document.getElementById(id)};
var game = {
	replicanti: {
		display: a("replicanti"),
		amount: new Decimal(1),
		chance: new Decimal(10),
		tickspeed: new Decimal(1000),
	},
	upgrades: {
		chance: new Decimal(1000),
		tickspeed: new Decimal(10),
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
		game.upgrades.tickspeedPriceDisplay.innerHTML = game.upgrades.tickspeed + " replicanti";
	},
	replicantiUpdate: function(){
		game.updateHTML()
		if(game.replicanti.amount.lt(100)){
			for(i=0;i<Math.round(game.replicanti.amount.toNumber()).;i++){
				if(Math.random()*100<game.replicanti.chance){
					game.replicanti.amount.plus(1);
					game.updateHTML()
				}
			}
		} else if(game.replicanti.amount.gt(100)) {
			let x = 0
			for(i=0;i<100;i++){
				if(game.replicanti.chance.gt(Math.random()*100)){
					x++
				}
			}
			game.replicanti.amount = game.replicanti.amount.mul(1+x/100).floor()
			game.updateHTML()
		}
	}
}

var gameLoop = window.setInterval(game.replicantiUpdate, game.replicanti.tickspeed)

game.upgrades.chancePriceDisplay.onclick = function(){
	if(game.replicanti.amount.gt(game.upgrades.chance)){
		if(game.replicanti.chance.lt(100)){
			game.replicanti.amount.sub(game.upgrades.chance);
			game.upgrades.chance.mul(10);
			game.replicanti.chance.add(1);
			game.updateHTML();
		}
	}
}

game.upgrades.tickspeedPriceDisplay.onclick = function(){
	if(game.replicanti.amount.gt(game.upgrades.tickspeed)){
		game.replicanti.amount.sub(game.upgrades.tickspeed);
		game.upgrades.tickspeed.mul(10);
		clearInterval(gameLoop)
		game.replicanti.tickspeed = (game.replicanti.tickspeed.div(100)).mul(90);
		game.updateHTML();
		gameLoop = window.setInterval(game.replicantiUpdate, game.replicanti.tickspeed)
	}
}
