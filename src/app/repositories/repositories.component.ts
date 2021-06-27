import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'src/_services/repositories.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  constructor(public repositoriesService: RepositoriesService) {
  }

  ngOnInit() { }

  /**
   * Calculate time difference between now and when was a repository last updated
   * 
   * @param updated_at date of the last update to the selected repository
   * @returns {string}
   */
  calculateDateDiff(updated_at: string) {
    let message = '';
    const target_date = new Date(updated_at).getTime();

    const current_date = new Date().getTime();
    const seconds_left = (current_date - target_date) / 1000;
    const days = Math.floor(seconds_left / 86400);
    if (days < 1) {
      const hours = Math.floor(seconds_left / 3600);
      if (hours < 1) {
        const minutes = Math.floor(seconds_left / 60);
        if (minutes < 1) {
          const seconds = Math.floor(seconds_left);
          if (seconds > 1) {
            message = seconds + ' seconds';
          } else {
            message = '1 second';
          }
        } else {
          if (minutes > 1) {
            message = minutes + ' minutes';
          } else {
            message = '1 minute';
          }
        }
      } else {
        if (hours > 1) {
          message = hours + ' hours';
        } else {
          message = '1 hour';
        }
      }
    } else {
      if (days > 1) {
        message = days + ' days';
      } else {
        message = '1 day';
      }
    }
    return message;
  }
}
