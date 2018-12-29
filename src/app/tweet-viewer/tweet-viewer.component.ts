import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweets/tweet.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-tweet-viewer',
  templateUrl: './tweet-viewer.component.html',
  styleUrls: ['./tweet-viewer.component.css']
})
export class TweetViewerComponent implements OnInit {

  tweets
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  sending = false;
  
  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.tweetService.getTweetsFromDb().subscribe((data)=>{
      this.tweets = data['body'];
    });
  
    this.sortOptions = [
        {label: 'Text', value: 'text'}
    ];
  }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  download(){
    this.sending = true;
    var csvjson = [];
    this.tweets.forEach((tweet, index) => {
      csvjson.push({
        id: tweet.tweet_id,
        text: tweet.text,
        negative: this.parseJSON(tweet.sentiment).negative.join(),
        neutral: this.parseJSON(tweet.sentiment).neutral.join(),
        positive: this.parseJSON(tweet.sentiment).positive.join(),
      });
      if(index == this.tweets.length-1){
        var options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          headers: ["id", "text", "nagative", "neutral", "positive"]
        };      
        new Angular5Csv(csvjson, 'tweets', options);
        this.sending = false;
      }
    });
  }

  parseJSON(obj){
    return JSON.parse(obj);
  }
}
