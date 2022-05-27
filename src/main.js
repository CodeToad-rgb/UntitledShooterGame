/*globals Player Bullet Enemy Particle gsap spawnParticles PowerUp skullB64 Icon*/

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playing = false;

const player = new Player(canvas.width / 2, canvas.height / 2, 10, "#ff007f");
let bullets = [];
let enemies = [];
let particles = [];
let powerUps = [new PowerUp(100, 100, 10, { x: 0, y: 0 })];
let difficulty = 0;
let pColor = "white";

const skullIcon = new Icon(skullB64, canvas.width / 5,
	canvas.height / 40,
	canvas.width / 30
);

// spawnParticles(
//   bullet.x,
//   bullet.y,
//   `hsl(${enemy.color},100%,50%)`,
//   25,
//   particles
// );

const powered = {
	kill: {
		time: 500,
		on: false,
	},
	god: {
		time: 250,
		on: false,
	},
	nuke: {
		on: false,
	},
};

const spawnPowerUp = () => {
	
}

let spawning = false;
let keys = new Set();

let score = 0;
localStorage.setItem("high-score", 0);


if (localStorage.getItem("high-score") === undefined) {
	localStorage.setItem("high-score", 0);
}
document.querySelector("#highScore").textContent =
	localStorage.getItem("high-score");

const upScore = (increase) => {
	score += increase;
	document.querySelector("#score").textContent = score;
};
const getHighestScore = () => {
	if (score > localStorage.getItem("high-score")) {
		localStorage.setItem("high-score", score);
	}
	document.querySelector("#highScore").textContent =
		localStorage.getItem("high-score");
	document.querySelector("#endScore").textContent = score;

	score = 0;
};

document.addEventListener("visibilitychange", (event) => {
	if (document.visibilityState === "visible") {
		spawning = true;
	} else {
		spawning = false;
	}
});

document.addEventListener("keydown", function (e) {
	keys.add(e.key);

	//stop people from zooming in which makes the game look really pixelated and bad
	if (keys.has("Control")) {
		if (keys.has("=")) {
			e.preventDefault();
		} else if (keys.has("-")) {
			e.preventDefault();
		} else if (keys.has("0")) {
			e.preventDefault();
		}
	}
});

document.addEventListener("keyup", (e) => {
	if (keys.has(e.key)) {
		keys.delete(e.key);
	}
});
//gun go boom on click
document.addEventListener("click", (e) => {
	if (playing) {
		//get angle and velocity for bullet to follow

		let angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
		let velocity = {
			x: Math.cos(angle) * 6,
			y: Math.sin(angle) * 6,
		};
		//Bottom

		bullets.push(
			new Bullet(canvas.width / 2, canvas.height / 2, 5, "red", {
				x: velocity.x,
				y: velocity.y,
			})
		);
	}
});
//start button
document.querySelector("#startButton").addEventListener("click", () => {
	playing = true; spawning = true;
	enemies = []; particles = []; bullets = []; powerUps = [];
	document.querySelector("#menuFlex").style.display = "none";

	window.requestAnimationFrame(update);
});

let tester = 500;

//do stuff in scene
const scenePlaying = () => {
	context.shadowBlur = 0;
	context.fillStyle = "#000000a0";
	context.fillRect(0, 0, canvas.width, canvas.height);

	player.draw();

	//update bullets
	bullets.forEach((bullet, bulleti) => {
		bullet.update();
		if (bullet.x < 0 || bullet.x + bullet.r > canvas.width ||
			bullet.y < 0 || bullet.y + bullet.r > canvas.height) {
			bullets.splice(bulleti, 1);
		}
	});

	enemies.forEach((enemy, enemyi) => {
		enemy.update();

		{
			let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
			if (dist - enemy.r - player.r <= 0) {
				playing = false;

				getHighestScore();
				difficulty = 0;

				return;
			}
		}

		bullets.forEach((bullet, bulleti) => {
			let dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);

			if (dist - enemy.r - bullet.r <= 0) {
				if (enemy.r - 10 > 10 && !powered.kill.on) {
					gsap.to(enemy, {
						r: enemy.r - 10,
						duration: 0.15,
					});
					window.setTimeout(() => {
						bullets.splice(bulleti, 1);
					});
				} else {
					if (difficulty < 30) {
						difficulty = Math.floor(score / 100);
					}

					window.setTimeout(() => {
						spawnParticles(
							bullet.x,
							bullet.y,
							`hsl(${enemy.color},100%,50%)`,
							25,
							particles
						);
						bullets.splice(bulleti, 1);
						enemies.splice(enemyi, 1);
					}, 0);
					upScore(10);
				}
			}
		});
	});


	//powerTimer is the function
	{
		if (powered.kill.on) {
			powered.kill.time -= 1;


			if (powered.kill.time <= 0) {
				powered.kill.on = false;
				powered.kill.time = 500;
				skullIcon.fadeOut();
			}
		}
		if (powered.god.on) {
			powered.god.time -= 1;

		}
	}
	// Update powerUps 
	powerUps.forEach((power, poweri) => {
		power.update();

		power.timer -= 1;

		bullets.forEach((bullet, bulleti) => {
			let dist = Math.hypot(bullet.x - power.x, bullet.y - power.y);

			if (dist - bullet.r - power.r < 1) {
				spawnParticles(
					bullet.x,
					bullet.y,
					`hsl(${power.color},100%, 50%)`,
					15,
					particles
				);

				switch (power.type) {
					//kill
					case 0:
						powered.kill.on = true;
						skullIcon.show();
						break;
					//God
					case 1:
						powered.god.on = true;
						break;
					//Nuke
					default:
						break;
				}

				window.setTimeout(() => {
					bullets.splice(bulleti, 1);
					powerUps.splice(poweri, 1);
				}, 0);
			}
		});

		if (power.timer <= 0) {
			power.alpha -= 0.01;
			if (power.alpha <= 0.01) {
				powerUps.splice(poweri, 1);
			}
		}
	});

	//update particles
	particles.forEach((particle, particlei) => {
		if (particle.alpha <= 0) {
			window.setTimeout(() => {
				particles.splice(particlei, 1);
			})
		} else {
			particle.update();
		}
	});

	{
		//icons
		skullIcon.draw();
	}
};

//actually do the stuff

let started;
const update = (ts) => {
	if (started === undefined) {
		started = Date.now();
	}

	let delta = Date.now() - started;

	if (delta >= 1000 / 120) {
		started = Date.now();
		scenePlaying();
	}

	if (playing) {
		window.requestAnimationFrame(update);
	} else {
		context.fillStyle = "black";
		document.querySelector("#score").textContent = "0";
		context.fillRect(0, 0, canvas.width, canvas.height);
		document.querySelector("#menuFlex").style.display = "flex";
	}
};

window.setInterval(function () {
	if (spawning) {
		let r = Math.random() * (30 - (10 + difficulty)) + (10 + difficulty);

		let x = Math.random() > 0.5 ? 0 - r : canvas.width + r,
			y = Math.random() * canvas.height;

		let color = Math.random() * 360;

		let angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

		let vel = {
			x: Math.cos(angle) * (7.5 + Math.floor(difficulty / 10) * 0.5),
			y: Math.sin(angle) * (7.5 + Math.floor(difficulty / 10) * 0.5),
		};

		enemies.push(new Enemy(x, y, r, color, vel));
	}
}, 1000);

window.requestAnimationFrame(update);
