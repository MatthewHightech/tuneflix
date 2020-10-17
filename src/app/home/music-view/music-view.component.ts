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
    let d: number[] = new Array(); 
    this.featureSubscription = this.service.featuresChanged.subscribe(newFeature => {  
      d[0] = newFeature.rms*15;
      d[1] = newFeature.spectralCentroid/10;
      //d[2] = newFeature.energy/10;
     // d[3] = newFeature.spectralRolloff/50000; 
      //console.log(d);
      /* 
      circle.style.width = d1 + "px";
      circle.style.height = d1 + "px";
      innerCircle.style.width = d1/10*8 + "px"; 
      innerCircle.style.height = d1/10*8 + "px"; 
      */
     for (let i = 0; i < d.length; i++) {
        document.getElementById("circle" + (i+1)).style.transform = "scale(" + d[i] + ")";
     }

    });
  } // ngOnInit





  
  
}
