import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-music-input',
  templateUrl: './music-input.component.html',
  styleUrls: ['./music-input.component.scss'],
})
export class MusicInputComponent implements OnInit {

  @Output() rmsEmitter = new EventEmitter<number>();
  private audioContext: AudioContext; 
  private source;
  private audioElement;
  private analyzer; 
 

  constructor(private service: HomeService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.onAddSong(); 
  }

  // when a new song is added
  onAddSong() {
      // new audio object
      this.audioContext = new AudioContext();
      // Select the Audio Element from the DOM
      this.audioElement = document.querySelector("audio");
      // Create an "Audio Node" from the Audio Element
      this.source = this.audioContext.createMediaElementSource(this.audioElement);
      // Connect the Audio Node to your speakers.
      this.source.connect(this.audioContext.destination);

      // Create the Meyda Analyzer
      this.analyzer = require("meyda").createMeydaAnalyzer({
        // Pass in the AudioContext so that Meyda knows which AudioContext Box to work with
        "audioContext": this.audioContext,
        // audio node
        "source": this.source,
        // how often to check the audio sample (44100/512 = 86 times a sec *average*)
        "bufferSize": 256,
        // Different audio features to calculate
        "featureExtractors": [
            "rms", 
            "energy", 
            "spectralCentroid", 
            "spectralRolloff"
        ], 
        // Calculates data and adds it to features everytime the callback runs (86x/sec)
        "callback": features => { 
            this.service.newFeature(features);  
        }
      });
  } // onAddSong

  onPlaySong() {
    this.audioContext.resume().then(() => {
      console.log('Playback started successfully');
      this.analyzer.start();
      this.audioElement.play(); 
  });
  }

  onPauseSong() {
    this.audioContext.resume().then(() => {
      console.log('Playback started successfully');
      this.analyzer.stop();
      this.audioElement.pause(); 
    });
  }

  onChangeSong() {
    this.presentActionSheet(); 
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Rock',
        handler: () => {
          this.audioElement.src = "../../../assets/rock.mp3"; 
          this.service.musicType = "Rock"; 
          this.onPlaySong(); 
        }
      }, {
        text: 'Jazz',
        handler: () => {
          this.audioElement.src = "../../../assets/jazz.mp3"; 
          this.service.musicType = "Jazz"; 
          this.onPlaySong(); 
        }
      }, {
        text: 'Classical',
        handler: () => {
          this.audioElement.src = "../../../assets/classical.mp3";
          this.service.musicType = "Classical"; 
          this.onPlaySong();  
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}

