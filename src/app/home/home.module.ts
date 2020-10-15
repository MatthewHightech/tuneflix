import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { MusicInputComponent } from './music-input/music-input.component'; 
import { MusicViewComponent } from './music-view/music-view.component'; 

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MusicInputComponent, MusicViewComponent]
})
export class HomePageModule {}
