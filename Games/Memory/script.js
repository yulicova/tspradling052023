Array.prototype.shuffle = function() {
	let i = this.length, j, temp;
	while (--i > 0) {
		j = Math.floor(Math.random() * (1 + i));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
};
localStorage.high = localStorage.high || 0;
localStorage.total = Number(localStorage.total) || 0;
document.querySelector("#masterscore > strong").innerHTML = localStorage.total;
let finalScore;
class Game {
	constructor (elem, theme, size) {
		this.elem = elem;
		this.theme = theme;
		this.size = size;
		this.score;
		this.interval;

		this.array = [];
		this.values = [];
		this.tile_ids = [];
		this.tiles_flipped = 0;

		this.newBoard(this.size);
	}
	updateScore () {
		document.querySelectorAll(".score strong")[0].innerHTML = this.score;
	}
	scoreHandler(size) {
		let fourthScore = 1240;
		let tenthScore = 16000;
		this.score = Math.floor(fourthScore/Math.pow(tenthScore/fourthScore, 2/3) * Math.pow(tenthScore/fourthScore, size/6));
		this.interval = setInterval(() => {
			// The lowest score you can possible get is based on the difficulty
			if (this.score <= size * 200 - 400) {
				this.score = size * 200 - 400;
			} else {
				this.score--;
			}
			this.updateScore();
		}, 100);
	}
	buildArray (size) {
		for (let i = 1; i < size*size/2 + 1; i++) {
			this.array.push(i);
			this.array.push(i);
		}

	}
	lerp (a, b, p) {
	    return (1 - p) * a + p * b;
	}
	flipTile(tile, val) {
		if (tile.innerHTML === "" && this.values.length < 2){
			tile.classList.add("flipped");
			tile.style.backgroundImage = "url(Images/"+val+".gif)";
			if (this.values.length === 0){
				this.values.push(val);
				this.tile_ids.push(tile.id);
			} else if (this.values.length === 1){
				this.values.push(val);
				this.tile_ids.push(tile.id);
				if (this.values[0] === this.values[1] && this.tile_ids[0] !== this.tile_ids[1]){
					let tile_1 = document.getElementById(this.tile_ids[0]);
					let tile_2 = document.getElementById(this.tile_ids[1]);
					tile_1.classList.remove("flipped");
					tile_2.classList.remove("flipped");
					tile_1.classList.add("found");
					tile_2.classList.add("found");

					this.tiles_flipped += 2;
					// Clear both arrays
					this.values = [];
	            	this.tile_ids = [];
					// Check if you win.
					if(this.tiles_flipped == this.array.length){
						let highScore = document.getElementById("hScore");
						this.tiles_flipped = 0;
						clearInterval(this.interval);
						finalScore = this.score;
						if (finalScore > localStorage.high) {
							localStorage.high = finalScore;
							highScore.innerHTML = "<strong>New High Score!</strong>";
						} else {
							highScore.innerHTML = "High Score: " + localStorage.high;
							console.log(localStorage.high);
						}
						document.getElementById("fScore").innerHTML = this.score;
						document.getElementById("modal").style.top = "calc(50vh - 35vmin)";
						localStorage.total = Number(localStorage.total) + Number(finalScore);
						document.querySelector("#masterscore > strong").innerHTML = localStorage.total;
					}
				} else {
					setTimeout(() => {
						let tile_1 = document.getElementById(this.tile_ids[0]);
						let tile_2 = document.getElementById(this.tile_ids[1]);

						tile_1.classList.remove("flipped");
						tile_2.classList.remove("flipped");

						tile_1.style.backgroundImage = "none";
						tile_2.style.backgroundImage = "none";

						this.values = [];
		            	this.tile_ids = [];
					}, 700);
				}
			}
		}
	}
	changeTheme (size) {
		let perc = size/10;
		let hue = this.lerp(140, 320, perc);
		document.querySelector("#desc").innerHTML = "Match " + size*size/2 + " pairs of cards as fast as you can.";
		document.documentElement.style.setProperty('--theme-color', "hsl("+hue+", 100%, 25%)");
	}
	newBoard (size) {
			this.array = [];
			this.values = [];
			this.tile_ids = [];
			this.tiles_flipped = 0;
			this.buildArray(size);
			this.scoreHandler(size);
			this.changeTheme(size);
			document.documentElement.style.setProperty('--columns', size)

			this.tiles_flipped = 0;
			this.array.shuffle();
		setTimeout(() => {
			console.log(this.array);
			for (let i = 0; i < size*size; i++) {
				let card = document.createElement("div");
				card.id = "tile_" + i;
				card.classList.add("card");
				card.addEventListener("click", () => {this.flipTile(card, this.array[i])});
				this.elem.appendChild(card);
			}
		});
	}
}

function openLeaderboard () {
	let lead = document.getElementById("leaderboard");
	lead.classList.toggle("down");
}

function compare(a, b) {
  if (a.score > b.score)
    return -1;
  if (a.score < b.score)
    return 1;
  return 0;
}

let data = [
	{
		name: "Subject A",
		score: 1838
	},
	{
		name: "Subject B",
		score: 2344
	},
	{
		name: "Subject C",
		score: 3565
	},
	{
		name: "Subject D",
		score: 3245
	},
	{
		name: "Subject E",
		score: 483
	},
	{
		name: "Subject A",
		score: 1838
	},
	{
		name: "Subject B",
		score: 2344
	},
	{
		name: "Subject C",
		score: 3565
	},
	{
		name: "Subject D",
		score: 3245
	},
	{
		name: "Subject E",
		score: 483
	},
	{
		name: "Subject A",
		score: 1838
	},
	{
		name: "Subject B",
		score: 2344
	},
	{
		name: "Subject C",
		score: 3565
	},
	{
		name: "Subject D",
		score: 3245
	},
	{
		name: "Subject E",
		score: 483
	},
	{
		name: "Subject A",
		score: 1838
	},
	{
		name: "Subject B",
		score: 2344
	},
	{
		name: "Subject C",
		score: 3565
	},
	{
		name: "Subject FVDHKJSLFKd",
		score: 4236
	},
	{
		name: "Subject E",
		score: 483
	},
	{
		name: "Subject A",
		score: 1838
	},
	{
		name: "Subject B",
		score: 2344
	},
	{
		name: "Subject C",
		score: 3565
	},
	{
		name: "Subject D",
		score: 3245
	},
	{
		name: "Subject E",
		score: 483
	}
];

function dataToLead (data) {
	data.sort(compare);
	let lData = document.getElementById("lData");
	data.forEach((r, i) => {
		let row = document.createElement("tr");
		let id = document.createElement("td");
		let name = document.createElement("td");
		let score = document.createElement("td");

		id.innerHTML = ++i;
		name.innerHTML = r.name;
		score.innerHTML = r.score;

		row.appendChild(id);
		row.appendChild(name);
		row.appendChild(score);

		lData.appendChild(row);
	});
}
dataToLead(data);

let board = document.getElementById('board');
// only even game sizes work
let game = new Game(board, "teal", 2);

let modal = document.getElementById("modal");
let difficulties = document.querySelectorAll(".difficulty");
difficulties.forEach((btn, i) => {
	btn.addEventListener("click", () => {
		document.getElementById("board").innerHTML = "";
		modal.style.top = "-100%";
	});
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyChZ9IggT4iFj8aow4kwtwTBHm5TNLlsd8",
	authDomain: "games-521f9.firebaseapp.com",
	databaseURL: "https://games-521f9.firebaseio.com",
	projectId: "games-521f9",
	storageBucket: "",
	messagingSenderId: "629251321837"
};
firebase.initializeApp(config);

let database = firebase.database();
let ref = database.ref();
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
});
