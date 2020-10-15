import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    rmsChanged: Subject<number> = new Subject<number>();
    rms: number;  

    constructor () {}


    // event triggered when a new rms value is generated
    newRms(rmsIn: number) {
        this.rms = rmsIn; 
        //console.log("Service Rms: " + this.rms)
        this.rmsChanged.next(this.rms); 
    } // newRms

    returnRms() {
        return this.rms; 
    }
}