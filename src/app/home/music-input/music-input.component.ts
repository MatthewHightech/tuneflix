import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home.service';

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

  constructor(private service: HomeService) { }

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
      this.analyzer = Meyda.createMeydaAnalyzer({
        // Pass in the AudioContext so that Meyda knows which AudioContext Box to work with
        "audioContext": this.audioContext,
        // audio node
        "source": this.source,
        // how often to check the audio sample (44100/512 = 86 times a sec *average*)
        "bufferSize": 2048,
        // Different audio features to calculate
        "featureExtractors": [
            "rms"
        ], 
        // Calculates data and adds it to features everytime the callback runs (86x/sec)
        "callback": features => { 
            this.service.newRms(features.rms);  
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
}
