const inputText = document.getElementById("input--text");
const imageDiv = document.querySelector(".image--container");
const formDiv = document.querySelector(".form");
const mainTitle = document.getElementById("video-title");
const middleDiv = document.getElementById("middle");
const loader = document.querySelector(".loading");


//variables
let result;
let error;
let link;

//function
let selectDiv = document.createElement("select");
selectDiv.addEventListener("click" , getLink)
function getLink(e){
  document.getElementById("myAnchor").href = e.target.value
}

function mapOver(element) {
  element.map((el) => {
    selectDiv.innerHTML += `<option value=${el.url}>${el.format_note} ${Math.ceil(el.filesize / 1048576)} Mb</option>`
  });
  middleDiv.appendChild(selectDiv);
}


// api function
const getVideo = () => {
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
      mainTitle.innerText = result.fulltitle;
      imageDiv.innerHTML = `<img src=${response.thumbnail} alt="thumbnail">`;
      formDiv.innerHTML = `<button>
        <a id = "myAnchor" href="www.google.com" target="_blank">Download Video</a>
      </button>`;
      let formatOption = result.formats;
      mapOver(formatOption);
      loader.style.display = "none";
    })
    .catch((err) => (error = err));
};
