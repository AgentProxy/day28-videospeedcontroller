const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const muteButton = player.querySelector('.mute');
const fullscreenButton = player.querySelector('.full');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const videoContent = player.querySelector("video");
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
let mousedown = false;
let isFullscreen = false;
let isMuted = false;


function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    // if(video.paused){
    //     video.play();
    // }
    // else{
    //     video.pause();
    // }
    video[method]();

}

function updateButton(){
    const icon = this.paused? '►':'❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function progressBarSet(){
    var percent =  (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function changeProgress(e){
    var scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

function fullscreen(){
    isFullscreen = !isFullscreen;
    if(isFullscreen){
        player.requestFullscreen(); 
        fullscreenButton.textContent = 'Exit' 
    }
    else{
        document.exitFullscreen(); 
        fullscreenButton.textContent = 'Full'
    }
}

function mute(){
    isMuted = !isMuted;
    isMuted? video.muted = true: video.muted = false ;
    if(isMuted){
        video.muted = true
        muteButton.textContent = 'Unmute' 
    }
    else{
        video.muted = false;
        muteButton.textContent = 'Mute';
    }
}

function handleMove(e){
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    bar.style.height = height;
    const playbackRate = percent * (max-min) + min;
    bar.textContent = playbackRate.toFixed(2) + 'x';
    video.playbackRate = playbackRate;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', progressBarSet);
progress.addEventListener('click',changeProgress);
progress.addEventListener('mousemove',(e) => mousedown && changeProgress(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mousedown', ()=> mousedown = false);
speed.addEventListener('mousemove', handleMove);
