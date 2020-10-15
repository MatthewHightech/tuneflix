import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-music-view',
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.scss'],
})
export class MusicViewComponent implements OnInit {
  rms: number;
  private rmsSubscription: Subscription;

  constructor(private service: HomeService) {}

  ngOnInit() { 
      this.rmsSubscription = this.service.rmsValue.subscribe(rmsValue => {
          this.rms = rmsValue;
      });
  } // ngOnInit
}
