import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { methods } from '../../common/api';


@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private apiService: ApiService) { }

  getTweets(){
    return this.apiService.get(methods.tweets, {});
  }

  getTweetsFromDb(){
    return this.apiService.get(methods.tweetsfromdb, {});
  }

  saveTweets(data){
    return this.apiService.post(methods.tweets, {}, data);
  }
}
