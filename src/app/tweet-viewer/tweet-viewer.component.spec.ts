import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetViewerComponent } from './tweet-viewer.component';

describe('TweetViewerComponent', () => {
  let component: TweetViewerComponent;
  let fixture: ComponentFixture<TweetViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
