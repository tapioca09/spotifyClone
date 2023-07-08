// Initialize variables
let songIndex=0;
let audioElement=new Audio("songs/1.mp3");
let audioValue=new Audio("songs/1.mp3");
let masterPlay=document.querySelector("#masterPlay");
let progressBar=document.querySelector("#progressBar");
let songItems=document.querySelectorAll(".songBanner li");
let currentSong=document.querySelector(".playing");
let timestamp=document.getElementsByClassName("timestamp");
let songDuration=document.getElementsByClassName("songDuration");

let songs=[
    {songName: "Song 1",filePath:"songs/1.mp3",coverPath:"covers/1.jpg",songTime:"3:50"},
    {songName: "Song 2",filePath:"songs/2.mp3",coverPath:"covers/2.jpg",songTime:"2:33"},
    {songName: "Song 3",filePath:"songs/3.mp3",coverPath:"covers/3.jpg",songTime:"4:33"},
    {songName: "Song 4",filePath:"songs/4.mp3",coverPath:"covers/4.jpg",songTime:"4:27"},
    {songName: "Song 5",filePath:"songs/5.mp3",coverPath:"covers/5.jpg",songTime:"3:28"},
    {songName: "Song 6",filePath:"songs/6.mp3",coverPath:"covers/6.jpg",songTime:"3:28"},
    {songName: "Song 7",filePath:"songs/7.mp3",coverPath:"covers/7.jpg",songTime:"4:33"},
    {songName: "Song 8",filePath:"songs/8.mp3",coverPath:"covers/8.jpg",songTime:"3:50"},
    {songName: "Song 9",filePath:"songs/9.mp3",coverPath:"covers/9.jpg",songTime:"3:28"},
    {songName: "Song 10",filePath:"songs/10.mp3",coverPath:"covers/10.jpg",songTime:"4:27"}
]

// Update cover and timestamp of each song 
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songtitle")[0].innerText=songs[i].songName;
    element.getElementsByClassName("play")[0].innerText=songs[i].songTime;
})

const makeAllPlays=()=>{
    document.querySelectorAll(".songBanner i").forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })     
}

const playNext=()=>{
    if(songIndex==9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    
    makeAllPlays();
    document.querySelectorAll(".songBanner i")[songIndex].classList.remove("fa-circle-play");
    document.querySelectorAll(".songBanner i")[songIndex].classList.add("fa-circle-pause");
    
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    currentSong.getElementsByTagName("img")[0].src=songs[songIndex].coverPath;
    currentSong.getElementsByTagName("span")[0].innerText=songs[songIndex].songName;
    currentSong.style.opacity=1;
}

const playPrev=()=>{
    if(songIndex==0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    
    makeAllPlays();
    document.querySelectorAll(".songBanner i")[songIndex].classList.remove("fa-circle-play");
    document.querySelectorAll(".songBanner i")[songIndex].classList.add("fa-circle-pause");

    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    currentSong.getElementsByTagName("img")[0].src=songs[songIndex].coverPath;
    currentSong.getElementsByTagName("span")[0].innerText=songs[songIndex].songName;
    currentSong.style.opacity=1;
}

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime==0){
        audioElement.play();
        document.querySelectorAll(".songBanner i")[songIndex].classList.remove("fa-circle-play");
        document.querySelectorAll(".songBanner i")[songIndex].classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        currentSong.getElementsByTagName("img")[0].src=songs[songIndex].coverPath;
        currentSong.getElementsByTagName("span")[0].innerText=songs[songIndex].songName;
        currentSong.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        makeAllPlays();
    }
})

// Update progress bar
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*1000);
    console.log(progress);
    progressBar.value=progress;
    
    timestamp[0].innerText=(Math.floor(audioElement.currentTime/60)+":"+Math.floor(audioElement.currentTime%60));
    songDuration[0].innerText=(Math.floor(audioElement.duration/60)+":"+Math.floor(audioElement.duration%60));

    if(audioElement.currentTime==audioElement.duration){
        playNext();
    }
})

// Update audio element
progressBar.addEventListener('change',()=>{
    audioElement.currentTime=(progressBar.value*audioElement.duration)/1000;
})

// Change song
document.querySelectorAll(".songBanner i").forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        if(songIndex!=parseInt(e.target.id)||audioElement.paused){
            if(songIndex!=parseInt(e.target.id)){
                songIndex=parseInt(e.target.id);
                audioElement.src=songs[songIndex].filePath;
                audioElement.currentTime=0;
            }

            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            currentSong.getElementsByTagName("img")[0].src=songs[songIndex].coverPath;
            currentSong.getElementsByTagName("span")[0].innerText=songs[songIndex].songName;
            currentSong.style.opacity=1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
    })
})

// Handle previous and next buttons
document.getElementById('prev').addEventListener('click',()=>{
    playPrev();
})

document.getElementById('next').addEventListener('click',()=>{
    playNext();
})