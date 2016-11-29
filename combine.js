const fs = require("fs");

let fileNames = fs.readFileSync("./filenames.txt").toString().trim().split(/\r?\n/);
let positions = fs.readFileSync("./fingerprints.30.30.2d.tsv").toString().trim().split(/\r?\n/);

let dict = {};

for(var i = 0; i < fileNames.length; i ++){
	let fileName = fileNames[i].split("/").slice(-1)[0];
	let name = fileName.replace(".wav", "");

	position = positions[i].split(/\t/);

	dict[name] = {
		fileName: fileName,
		x: position[0],
		y: position[1]
	}
}

fs.writeFileSync("tsne.json", JSON.stringify(dict));