import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoriesService {

    pageRepositories: any;
    currentPage: Number = 1;
    pagesIndexes: Array<Number>;

    // last creation date inputted by the user
    created_at: String;

    constructor(public http: HttpClient) {

    }

    /**
     * Fetch github repositories depending on the date of creation of the repository and page number using the Github Api
     *
     * @param {string} created_at repository creation date
     * @param {Number} page number of the page of repositories that meet set criteria
     * @returns {Object}
     */
    getRepositories(created_at: String, page: Number) {
        return this.http.get('https://api.github.com/search/repositories?q='
            + 'created:>' + created_at + '&sort=stars&order=desc'
            + '&page=' + page)
            .pipe(map(resp => resp));
    }

    /**
     * make request to get github repositories list that meet criteria set bu the user
     *
     * @param {string} created_at repository creation date
     * @param {Number} page number of the page of repositories that meet criteria set bu the user
     * @returns {Object}
     */
    doSearch(created_at: String, page: Number) {
        this.created_at = created_at;

        this.getRepositories(created_at, page)
            .subscribe(data => {
                this.pageRepositories = data;
                const x = Math.ceil((this.pageRepositories.total_count) / 30);
                if (x > 15) {
                    this.pagesIndexes = new Array(15);
                } else {
                    this.pagesIndexes = new Array(x);
                }
            }, err => {
                console.log(err);
            }
            );
    }

    /**
     * make request to get github repositories list with new selected page
     *
     * @param {Number} page number of the page of repositories that meet criteria set bu the user
     * @returns {void} 
     */
    gotoPage(page: Number) {
        this.currentPage = page;
        this.doSearch(this.created_at, page);
    }
}
