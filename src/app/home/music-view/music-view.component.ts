import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-music-view',
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.scss'],
})
export class MusicViewComponent implements OnInit {

  private featureSubscription: Subscription;

  constructor(protected service: HomeService) {}

  ngOnInit() { 
    // subscription to changes on the rms value through HomeService
    const circle = document.getElementById("circle");
    let d: number = 1; 
    this.featureSubscription = this.service.featuresChanged.subscribe(newFeature => {  
      d = newFeature.rms*1000; 
      //console.log(d); 
      circle.style.width = d + "px";
      circle.style.height = d + "px";
    });
  } // ngOnInit




  
  
}
