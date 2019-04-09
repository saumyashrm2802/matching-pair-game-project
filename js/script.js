let x = document.querySelectorAll(".box");
let array = [];
let final_array = [];
let moves = 0;
let smileys = 3;
let final_time = 0;
const pictures = [`<i class="fa fa-diamond"></i>`, `<i class="fa fa-umbrella"></i>`, `<i class="fa fa-rss"></i>`, `<i class="fa fa-diamond"></i>`, `<i class="fa fa-rss"></i>`, `<i class="fa fa-umbrella"></i>`, `<i class="fa fa-heart"></i>`, `<i class="fa fa-coffee"></i>`, `<i class="fa fa-heart"></i>`, `<i class="fa fa-female"></i>`, `<i class="fa fa-tv"></i>`, `<i class="fa fa-leaf"></i>`, `<i class="fa fa-female"></i>`, `<i class="fa fa-tv"></i>`, `<i class="fa fa-coffee"></i>`, `<i class="fa fa-leaf"></i>`];
shuffle(pictures);
change(pictures);
let clickOne = true;
let time;

for (let i = 0; i < x.length; i++) {
	x[i].addEventListener("click", function() {
		movess();
		if (clickOne) {
			start_timer();
			clickOne = false;
		}

		x[i].classList.add("class-click", "disable"); //to disable clicking on an opened card
		array.push(x[i]);
		//not x[i].innerHTML otherwise current.classlist.add will not work ..neither will previos.classlist.add



		if (array.length === 2) {
			let current = this;
			let previous = array[0];
			if (current.innerHTML === previous.innerHTML) {
				current.classList.add("class-match");
				previous.classList.add("class-match");
				array = [];
				final_array.push(current);
				final_array.push(previous);
				check_complete();
			} else {
				setTimeout(function() {
					current.classList.remove("class-click", "disable"); //to enable clicking on the closed card that was earlier opened
					previous.classList.remove("class-click", "disable");

				}, 300);

				array = [];

			}
		}
	});

}

function check_complete() {
	if (final_array.length === 16) {
		stop_timer();
		setTimeout(function() {
			swal("Congratulations :)", "You took " + moves + " moves and " + time.innerHTML + " seconds to win and won " + smileys + " smileys!!", "success");
			//see,no need to call movess function to get the value of moves as we have declared it globally 
			//same with smileys 
		}, 500);
	}
}

function movess() {
	moves++;
	let x = document.querySelector(".number_moves");
	x.innerHTML = moves;
	star_rating();
}

function star_rating() {
	let y = document.querySelectorAll(".star");

	if (moves > 40 && moves <= 52) {
		y[2].innerHTML = `<i class="fa fa-frown-o"></i>`;
		y[2].style.color = "red";
		smileys = 2;
	} else if (moves > 52 && moves <= 60) {
		y[1].innerHTML = `<i class="fa fa-frown-o"></i>`;
		y[1].style.color = "red";
		smileys = 1;
	} else if (moves > 60) {
		y[0].innerHTML = `<i class="fa fa-frown-o"></i>`;
		y[0].style.color = "red";
		smileys = 0;


	}

}

let replay = document.querySelector(".restart");
replay.addEventListener("click", function() {


	array = [];
	final_array = [];
	moves = 0;
	for (let i = 0; i < x.length; i++) {
		x[i].classList.remove("class-click", "class-match", "disable");
	}

	let mov = document.querySelector(".number_moves");
	mov.innerHTML = 0;
	let y = document.querySelectorAll(".star");
	for (let i = 0; i < y.length; i++) {
		y[i].innerHTML = `<i class="fa fa-smile-o"></i>`;
		y[i].style.color = "#AEF420";
	}
	stop_timer();
	time.innerHTML = 0 + " second";
	clickOne = true;


});


function shuffle(array) {
	
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;


}

function change(arr) {
	let t = document.querySelector(".container").childNodes;
	for (let i = 1, j = 0; i < t.length; i += 2, j++) {
		t[i].innerHTML = arr[j];

	}
}

function start_timer() {
	time = document.querySelector(".second");
	let current_time = 0;

	final_time = setInterval(function() {
		current_time++;
		time.innerHTML = current_time + " seconds";
	}, 1000);

}

function stop_timer() {

	clearInterval(final_time);
}
