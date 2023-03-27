//DOM Elements
const inputText = document.getElementById("input--text");
const imageDiv = document.querySelector(".image--container");
const titleDiv = document.querySelector(".title--container");
const formDiv = document.querySelector(".form");
const mainTitle = document.getElementById("video-title");
const loader = document.querySelector(".loading");
//variables
let result;
let error;

// api function
function getVideo() {
  loader.style.display = "flex";
  let videoLink = inputText.value;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e2d5258e3fmshc8dcafb3bbf094cp1649a3jsne5b09457ce1f",
      "X-RapidAPI-Host": "aiov-download-youtube-videos.p.rapidapi.com",
    },
  };

  fetch(
    `https://aiov-download-youtube-videos.p.rapidapi.com/GetVideoDetails?URL=${videoLink}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      result = response;
      console.log(result);
      mainTitle.innerText = result.meta.title;
      imageDiv.innerHTML = `<img src=${response.thumb} alt="thumbnail">`;
      formDiv.innerHTML = `<button>
        <a href=${result.url[0].url} target="_blank">Download Video</a>
      </button>`;
      loader.style.display = "none";
    })
    .catch((err) => {
      error = err;
      alert(error);
    });
}
