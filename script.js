console.log("Welcome to Spotify");

//Instialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgessBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Aankhon Se Batana",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover1.jpg",
  },
  {
    songName: "Escapism",
    filePath: "songs/2.mp3",
    coverPath: "covers/cover2.png",
  },
  {
    songName: "Iktara",
    filePath: "songs/3.mp3",
    coverPath: "covers/cover3.jpg",
  },
  {
    songName: "Novacaine",
    filePath: "songs/4.mp3",
    coverPath: "covers/cover4.jpg",
  },
  {
    songName: "Pal Behta Jaaye",
    filePath: "songs/5.mp3",
    coverPath: "covers/cover5.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//songIndex is our index through which we will get our changer
//Handle play/pause on click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    const songItemPlayElement = document.getElementById(songIndex.toString());
    // console.log("Audio played", songItemPlayElement);
    songItemPlayElement.classList.remove("fa-circle-play");
    songItemPlayElement.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    //this means we will pause the audio element
    // console.log("Audio element paused", songIndex);

    const songItemPlayElement = document.getElementById(songIndex.toString());
    // console.log("Audio pause", songItemPlayElement);

    //
    songItemPlayElement.classList.remove("fa-circle-pause");
    songItemPlayElement.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//Listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgessBar.value = progress;
});

myProgessBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgessBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.play();
      audioElement.currentTime = 0;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    });
  }
);

document.getElementById("next").addEventListener("click", (f) => {
  //added logic for removing from prev so that if song was playing it should get paused and next song should be converted to playing
  const currentlyPlayingSong = document.getElementById(songIndex.toString());
  currentlyPlayingSong.classList.remove("fa-circle-pause");
  currentlyPlayingSong.classList.add("fa-circle-play");

  if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
  //added logic for next
  const songItemPlayElement = document.getElementById(songIndex.toString());
  //   console.log("Audio played", songItemPlayElement);
  songItemPlayElement.classList.remove("fa-circle-play");
  songItemPlayElement.classList.add("fa-circle-pause");
});
document.getElementById("previous").addEventListener("click", () => {
  const currentlyPlayingSong = document.getElementById(songIndex.toString());
  currentlyPlayingSong.classList.remove("fa-circle-pause");
  currentlyPlayingSong.classList.add("fa-circle-play");
  if (songIndex <= 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
  const songItemPlayElement = document.getElementById(songIndex.toString());
  //   console.log("Audio played", songItemPlayElement);
  songItemPlayElement.classList.remove("fa-circle-play");
  songItemPlayElement.classList.add("fa-circle-pause");
});
//sahilcodes23
