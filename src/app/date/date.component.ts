import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DateComponent implements OnInit {
  date = new Date();

  @Input() urgentCount;
  @Input() pendingCount;
  remainingTimePerCent = 50;

  ngOnInit(): void {
    this.updateRemainingTime();
    setInterval(() => {
      this.date = new Date();
      this.updateRemainingTime();
    }, 1000 * 60);
  }

  private updateRemainingTime() {
    const timePassed = this.date.getHours() * 60 + this.date.getMinutes();
    console.log(timePassed);
    this.remainingTimePerCent = 100 -  Math.floor((timePassed / (24 * 60)) * 100);
    console.log(this.remainingTimePerCent);
  }
}
