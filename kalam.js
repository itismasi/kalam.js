class Kalam {
	recursive = {
		road : [],
		multipliers : [],
		launch (step) {
			for (let i = this.multipliers.length; i < step; i++) {
				let value = 0;
				for (let j = 0; j < this.multipliers.length; j++) {
					value += this.multipliers[j] * this.road[i - this.multipliers.length + j];
				}
				this.road[i] = value;
			}
		}
	}

	Init (a, m, step = 0, road = this.recursive.road, multipliers = this.recursive.multipliers) {
		step++;
		this.recursive.road.push(a);
		this.recursive.multipliers.push(m);
		const next = (b, n) => this.Init(b, n, step);
		return next;
	}

	points (road = this.recursive.road) {
		let points = [];
		let lastPoint = [0, 0];
		let direction = {
			directionActual : 1,

			get value () {
				this.attempt = 0;
				if (this.directionActual > 3) {
					this.directionActual = 1;
					return this.directionActual;
				}
				else {
					this.directionActual++;
					return this.directionActual;
				}
			}
		};
		
		for (let i = 0; i < road.length; i++) {
			let move = direction.value;
			points.push(lastPoint);

			lastPoint = [
				(move < 3) ? lastPoint[0] + road[i] : lastPoint[0] - road[i],
				((move == 1) || (move == 4)) ? lastPoint[1] + road[i] : lastPoint[1] - road[i]
			];
		}

		return points;
	}
	draw (road = this.points()) {
		
		window.draw = function () {
			translate(width/2, height/2);

			beginShape();
			for (let i = 0; i < road.length - 2; i++) {
				line (
					road[i][0],
					road[i][1],
					road[i + 1][0],
					road[i + 1][1],
				);
				curveVertex (
					road[i][0],
					road[i][1],
					road[i + 1][0],
					road[i + 1][1],
				);
			}
			
			endShape();
		}
	}
}