import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, pipe, Subscription} from 'rxjs'
import{map,filter} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if(count ===2){

            observer.complete();
          }
          if(count>3){
            observer.error( new Error(' Count greater that 3'))
            }
          count++;
        }, 1000)
      }
    );

    this.firstObsSubscription =customIntervalObservable.pipe(filter(data => data >=0),map((data:number)=>{
      return 'Round : ' + (data +1);
    })).subscribe(data => {
      console.log('Round:' +(data));
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log('Completed;');
    });
  }

  ngOnDestroy(): void {

    this.firstObsSubscription?.unsubscribe();

  }

}
