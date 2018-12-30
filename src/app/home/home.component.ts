import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweets/tweet.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tweetService: TweetService,
    private localStorage: LocalStorage) { }

  tweets;
  dataLoaded = false;
  message = "Read the text and identify the aspects in the text, Then drag and drop the aspect words according to opinion polarity.";
  opinion = {
    negative : -1,
    neutral : 0,
    positive : 1
  };
  completed;
  filePath;
  insertId;
  isComplete = false;
  confirmMessage = false;
  editData = false;
  sending = false;
  selectedIndex = 0;
  showEmpty = false;

  ngOnInit() {
    this.getLocalStorage(()=>{
      if(!this.insertId){
        this.editData = true;
      }
      if(!this.tweets){
        this.tweets = [];
        this.completed = [];
        this.tweetService.getTweets().subscribe(data=>{
          if(data['err']){
            this.showEmpty = true;
          }
          else{
            this.filePath = data['filepath'];
            data['tweets'].forEach((tweet, index) => {
              tweet['sentiment'] = {negative: [], neutral: [], positive: []};
              this.tweets.push(tweet);
              this.completed.push(false);
              if(index == data['tweets'].length - 1){
                this.dataLoaded = true;
                this.setLocalStorage();
              }
            });
          }
        });
      }
      else{
        this.dataLoaded = true;
      }
    });
  }

  transferDataSuccess(event, tweet, opinion){
    var keyword = event.dragData
    if(opinion == this.opinion.negative)
      tweet.sentiment.negative.push(keyword);
    else if(opinion == this.opinion.neutral)
      tweet.sentiment.neutral.push(keyword);
    else if(opinion == this.opinion.positive)
      tweet.sentiment.positive.push(keyword);
    this.arrayRemove(tweet.keywords, keyword);
  }

  extendWord(event, curword, tweet, opinion){
    var keyword = event.dragData
    var newword = curword + " " + keyword;
    if(opinion == this.opinion.negative){
      tweet.sentiment.negative.push(newword);
      this.arrayRemove(tweet.sentiment.negative, curword);
    }
    else if(opinion == this.opinion.neutral){
      tweet.sentiment.neutral.push(newword);
      this.arrayRemove(tweet.sentiment.neutral, curword);
    }
    else if(opinion == this.opinion.positive){
      tweet.sentiment.positive.push(newword);
      this.arrayRemove(tweet.sentiment.positive, curword);
    }
    this.arrayRemove(tweet.keywords, keyword);
  }

  removeItem(keyword, tweet, opinion){
    if(opinion == this.opinion.negative)
      this.arrayRemove(tweet.sentiment.negative, keyword);
    else if(opinion == this.opinion.neutral)
      this.arrayRemove(tweet.sentiment.neutral, keyword);
    else if(opinion == this.opinion.positive)
      this.arrayRemove(tweet.sentiment.positive, keyword);
    var words = keyword.split(' ');
    words.forEach(word => {
      tweet.keywords.push(word);
    });
  }
  
  setAspect(index){
    this.sending = true;
    this.completed[index] = true;
    this.setIsComplete();
    if(index < this.tweets.length-1)
      this.selectPage(this.selectedIndex+1);
    setTimeout(()=>{
      this.sending = false;
    }, 200);
  }

  submitAll(){
    this.tweetService.saveTweets({insertId: this.insertId, filepath: this.filePath, tweets: this.tweets}).subscribe(data=>{
      this.insertId = data['create_id'];
      this.editData = false;
      this.selectedIndex = 0;
      this.setLocalStorage();
      this.hideConfirmMessage();
      this.sending = false;
    });
  }

  submit(){
    this.sending = true;
    this.showConfirmMessage();
  }

  setIsComplete(){
    for(var i=0; i < this.completed.length; i++){
      this.isComplete = true;
      if(!this.completed[i]){
        this.isComplete = false;
        break;
      }
    }
  }

  setLocalStorage(){
    this.localStorage.setItem('tweets', this.tweets).subscribe(() => {
      this.localStorage.setItem('completed', this.completed).subscribe(() => {
        this.localStorage.setItem('insertId', this.insertId).subscribe(() => {});
      });
    });
  }

  getLocalStorage(callback){
    this.localStorage.getItem<any>('insertId').subscribe((insertId) => {
      this.insertId = insertId;
      this.localStorage.getItem<any>('completed').subscribe((completed) => {
        this.completed = completed;
        if(this.completed){
          this.setIsComplete();
        }
        this.localStorage.getItem<any>('tweets').subscribe((tweets) => {
          this.tweets = tweets;
          callback()
        });
      });
    });
  }

  editSubmitted(){
    this.editData = true;
  }

  pageChange(event){
    this.selectedIndex = event.page;
  }

  selectPage(index){
    this.dataLoaded = false;
    this.selectedIndex = index;
    setTimeout(()=>{
      this.dataLoaded = true;
    });
  }

  arrayExist(arr, value) {
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  arrayRemove(arr, value) {
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i] === value) {
        arr.splice(i, 1); 
      }
    }
  }

  int(x){
    return parseInt(x);
  }

  showConfirmMessage() {
    this.confirmMessage = true;
  }

  hideConfirmMessage() {
    this.confirmMessage = false;
  }

}
