import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DateComponent implements OnInit {
  date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000 * 60);
  }
}
