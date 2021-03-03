let roughDuration: any = 600;

class meditatioApp {
    //[x: string]: any;
    song: HTMLAudioElement;
    playing: HTMLImageElement;
    replaying: HTMLElement;
    outline: any
    video: HTMLVideoElement;
    sounds: NodeListOf<HTMLElement>;
    timeRender : HTMLElement;
    outlineLength: number ;
    //roughDuration: any;
    timeSelection : NodeListOf<HTMLElement>;

    constructor(){
        this.song = document.querySelector('.song')! as HTMLAudioElement;
        this.playing = document.querySelector('.play')! as HTMLImageElement;
        this.replaying = document.querySelector('.replay')! as HTMLElement;
        this.outline = document.querySelector('.moving-outline circle');
        this.video = document.querySelector('.vid-container video')! as HTMLVideoElement;

        // sound calling
        this.sounds = document.querySelectorAll('.sound-picker button')! as NodeListOf<HTMLElement>;

        //time calling

        this.timeRender = document.querySelector('.time-display')! as HTMLElement;

        let fakeDuration = this.timeRender.innerHTML;

        //let newDuration  = fakeDuration


       // console.log(newDuration);
      

        console.log(this.sounds);

       

        this.timeSelection = document.querySelectorAll('.time-select')! as NodeListOf<HTMLElement>;

        console.log(this.timeSelection);

        // aniamtion for outline

        this.outlineLength = this.outline.getTotalLength();

        console.log(this.outlineLength);

       // timelength 
       // this.roughDuration = 600;
        

        this.outline.style.strokeDasharray = this.outlineLength;

        this.outline.style.strokeDashoffset = this.outlineLength;
        
        // choosing different sounds

        this.sounds.forEach(parameter => {
            parameter.addEventListener('click', function() {
                this.song.src = this.getAttribute('data-sound');
                this.video.src = this.getAttribute('data-video');
                checkPlaying(this.song);
            })
        })

        

        

        // start sound

        this.playing.addEventListener('click', ()=>{
            checkPlaying(this.song);




          

        });

        this.timeSelection.forEach(pressing => {
            pressing.addEventListener('click', function(){
                console.log(this);
                roughDuration = this.getAttribute("data-time")
                console.log(roughDuration);
                
                
               fakeDuration = `${Math.floor(roughDuration/60)}:${Math.floor(roughDuration % 60)}`
                

                
            })
            
        });




        const checkPlaying = (_lyrics: HTMLAudioElement) => {

                if(this.song.paused){
                    this.song.play()
                    this.video.play()
                    this.playing.src = "./svg/pause.svg";
                    
                } else {
                        this.song.pause()
                        this.video.pause()
                        this.playing.src = "./svg/play.svg"
                 
                    }
            }
            
        
        
        

        this.frameAnimation();
        //this.selectTime();
    }

    
    frameAnimation(){
        this.song.ontimeupdate = () => {
        let currentTime = this.song.currentTime;
        let elapsed = roughDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        
        
        // Animation creation

        let progress:number = this.outlineLength - (currentTime/roughDuration) * this.outlineLength;

        console.log(progress);

        this.outline.style.strokeDashoffset = progress;

        //animate text

        this.timeRender.textContent = `${minutes}:${seconds}`

        if(currentTime >= roughDuration){
            this.song.pause();
            this.song.currentTime=0;
            this.playing.src = './svg/play.svg';
            this.video.pause();
            
        }

        }
    }


    // selectTime(){
        
    //     this.timeSelection.forEach(pressing => {
    //         pressing.addEventListener('click', function(){
    //             console.log(this);
    //             roughDuration = this.getAttribute("data-time")
    //             console.log(roughDuration);
                
                
    //            fakeDuration = `${Math.floor(roughDuration/60)}:${Math.floor(roughDuration % 60)}`
                

                
    //         })
            
    //     });
       
        
        

        
            
    // };
        
    

}

const meditate = new meditatioApp();



