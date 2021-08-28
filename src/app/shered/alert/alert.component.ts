import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text!: string

  public type = 'success'

  private aSub!: Subscription

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe((alert)=>{
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(()=> {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    this.aSub.unsubscribe()
  }

}
