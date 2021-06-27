import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'src/_services/repositories.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(public repositoriesService: RepositoriesService) {
  }

  ngOnInit() {
  }

  gotoPage(page: Number) {
    this.repositoriesService.gotoPage(page);
  }

}
