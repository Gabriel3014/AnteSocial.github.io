function a(id){return document.getElementById(id)};
var game = {
	replicanti: {
		display: a("replicanti"),
		amount: new Decimal(1),
		chance: new Decimal(10)
	},
	updateHTML: function(){
		game.replicanti.display.innerHTML = " " + game.replicanti.amount.floor();
	},
	replicantiUpdate: function(){
		window.setInterval(function(){
			if(game.replicanti.amount.lte(100)){
				for(i=0;game.replicanti.amount.lte(i);i++){
					if(game.replicanti.chance.lt(Math.random()*100)){
						game.replicanti.amount.plus(1);
						game.updateHTML()
					}
				}
			} else if(game.replicanti.amount.gte(100)) {
				let x = 0
				for(i=0;i<100;i++){
					if(game.replicanti.chance.lt(Math.random()*100)){
						x++
					}
				}
				game.replicanti.amount = game.replicanti.amount.mul(1+x/100).floor()
				game.updateHTML()
			}
		},1000)
	}	
}

game.replicantiUpdate()

console.log(game.replicanti.amount)
