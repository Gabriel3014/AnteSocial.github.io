function a(id){return document.getElementById(id)};
var game = {
	replicanti: {
		display: a("replicanti"),
		amount: 1,
		chance: 10
	},
	updateHTML: function(){
		game.replicanti.display.innerHTML = game.replicanti.amount+" ";
	},
	replicantiUpdate: function(){
		window.setInterval(function(){
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
		},1000)
	}	
}

game.replicantiUpdate()

console.log(game.replicanti.amount)
