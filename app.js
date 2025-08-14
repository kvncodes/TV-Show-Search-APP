const form = document.querySelector("#showForm");

const ctr = document.querySelector(".container");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	let searchValue = this.elements.query.value;
	let images = document.querySelectorAll("img");

	if (searchValue) {
		for (let img of images) {
			img.remove();
		}

		fetchShows(searchValue)
			.then((data) => createImages(data))
			.catch((e) => console.log("ERROR", e));

		this.elements.query.value = "";
		searchValue = "";
	}
});

function createImages(shows) {
	for (let sh of shows) {
		if (sh.show.image) {
			const newImage = document.createElement("IMG");
			newImage.src = sh.show.image.medium;
			ctr.append(newImage);
		}
	}
}

async function fetchShows(searchValue) {
	try {
		const req = await axios.get(
			`https://api.tvmaze.com/search/shows?q=${searchValue}`
		);
		const data = req.data;
		return data;
	} catch (e) {
		console.log("ERORR", e);
	}
}
