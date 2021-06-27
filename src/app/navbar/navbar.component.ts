import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'src/_services/repositories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DatePipe]
})
export class NavbarComponent implements OnInit {

  created_at: String;
  thrity_days_before_created_at: String;

  constructor(public repositoriesService: RepositoriesService, private datePipe: DatePipe) {
    const d = new Date(); // today!
    this.created_at = this.datePipe.transform(d, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.goBackThirtyDays();
    // reset pagination display
    this.repositoriesService.currentPage = 1;
    this.repositoriesService.doSearch(this.thrity_days_before_created_at, 1);
  }

  /**
   * calculate the date 30 days before user inputted date
   */
  goBackThirtyDays() {
    const x = 30; // go back 30 days!
    const dates = this.created_at.split('-');
    const d = new Date(Number(dates[0]), Number(dates[1]) - 1, Number(dates[2]));
    d.setDate(d.getDate() - x);
    this.thrity_days_before_created_at = this.datePipe.transform(d, 'yyyy-MM-dd');
  }
}