import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feature } from './feature.model';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    featuresChanged: Subject<Feature> = new Subject<Feature>();
    features: Feature; 
    
    musicType: string; 
    

    constructor () {}

    // event triggered when a new rms value is generated
    newFeature(featuresIn: Feature) {
        // exporting features Object as observable
        this.features = featuresIn; 
        this.featuresChanged.next(this.features); 
    } // newRms

}