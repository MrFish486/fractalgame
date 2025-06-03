(() => {
	window.onload = () => {
		var main = document.getElementById("main");
		var ctx = main.getContext("2d");
		var operator = (t) => {
			var po = ["0"];
			if (t.length == 0) {
				po = [null];
			} else if (t.length == 1) {
				po = [`Math.abs(${t[0]})`, `Math.acos(${t[0]})`, `Math.acosh(${t[0]})`, `Math.asin(${t[0]})`, `Math.asinh(${t[0]})`];
			} else if (t.length == 2) {
				po = [`(${t[0]})+${t[1]}`, `(${t[0]})-${t[1]}`, `(${t[0]})/${t[1]}`, `(${t[0]})*${t[1]}`, `(${t[0]})%${t[1]}`, `(${t[0]})**${t[1]}`, `(${t[0]})^${t[1]}`, `(${t[0]})|${t[1]}`, `(${t[0]})&${t[1]}`, `(${t[0]})>>${t[1]}`, `(${t[0]})<<${t[1]}`, `Math.atan2(${t[0]},${t[1]})`, `Math.hypot(${t[0]}, ${t[1]})`];
			}
			return po[Math.floor(Math.random() * po.length)];
		}
		var p = ["x", "y"];
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, main.width, main.height);
		ctx.fillStyle = "#000000";
		for (let i = 0; i < 10; i ++) {
			if (Math.random() > 0.5) {
				p[0] = operator(p) || p[0];
			} else {
				p[1] = operator(p) || p[1];
			}
		}
		var f = `(x, y) => {return ${p[0]}>${p[1]}}`, func = eval(f);
		console.log(f);
		var r = () => {
			var scale = [main.width / 500, main.height / 500];
			for (let x = 0; x < main.width; x ++) {
				for (let y = 0; y < main.height; y ++) {
					var c = {x : x, y : main.height - y};
					if (func(x / scale[0], y / scale[1])) {
						ctx.beginPath();
							ctx.rect(c.x, c.y, 1, 1);
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		};
		r();
		document.getElementById("regen").onclick = () => {
			[main.width, main.height] = [main.width * 2, main.height * 2];
			r();
		};
	};
})();
