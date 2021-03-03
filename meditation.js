"use strict";
let roughDuration = 600;
class meditatioApp {
    constructor() {
        this.song = document.querySelector('.song');
        this.playing = document.querySelector('.play');
        this.replaying = document.querySelector('.replay');
        this.outline = document.querySelector('.moving-outline circle');
        this.video = document.querySelector('.vid-container video');
        this.sounds = document.querySelectorAll('.sound-picker button');
        this.timeRender = document.querySelector('.time-display');
        let fakeDuration = this.timeRender.innerHTML;
        console.log(this.sounds);
        this.timeSelection = document.querySelectorAll('.time-select');
        console.log(this.timeSelection);
        this.outlineLength = this.outline.getTotalLength();
        console.log(this.outlineLength);
        this.outline.style.strokeDasharray = this.outlineLength;
        this.outline.style.strokeDashoffset = this.outlineLength;
        this.playing.addEventListener('click', () => {
            checkPlaying(this.song);
        });
        this.timeSelection.forEach(pressing => {
            pressing.addEventListener('click', function () {
                console.log(this);
                roughDuration = this.getAttribute("data-time");
                console.log(roughDuration);
                fakeDuration = `${Math.floor(roughDuration / 60)}:${Math.floor(roughDuration % 60)}`;
            });
        });
        const checkPlaying = (_lyrics) => {
            if (this.song.paused) {
                this.song.play();
                this.video.play();
                this.playing.src = "./svg/pause.svg";
            }
            else {
                this.song.pause();
                this.video.pause();
                this.playing.src = "./svg/play.svg";
            }
        };
        this.frameAnimation();
    }
    frameAnimation() {
        this.song.ontimeupdate = () => {
            let currentTime = this.song.currentTime;
            let elapsed = roughDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);
            let progress = this.outlineLength - (currentTime / roughDuration) * this.outlineLength;
            console.log(progress);
            this.outline.style.strokeDashoffset = progress;
            this.timeRender.textContent = `${minutes}:${seconds}`;
            if (currentTime >= roughDuration) {
                this.song.pause();
                this.song.currentTime = 0;
                this.playing.src = './svg/play.svg';
                this.video.pause();
            }
        };
    }
}
const meditate = new meditatioApp();
//# sourceMappingURL=meditation.js.map