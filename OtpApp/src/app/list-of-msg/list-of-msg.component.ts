import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-list-of-msg',
  templateUrl: './list-of-msg.component.html'
})
export class ListOfMsgComponent implements OnInit {

  listOfMsg: ListOfMsg[];
  errorMsg = '';
  
  constructor(private http: HttpClient) {
    this.listOfMsg = [];
   }

  ngOnInit() {
    this.getlistofMsg();
  }

  getlistofMsg() {
    this.http.get(environment.url + 'getListOfMsg/').subscribe(
        (listOfMsg: ListOfMsg[] ) => {
          if (listOfMsg.length > 0) {
            this.listOfMsg = listOfMsg;
           } else {
             this.errorMsg = 'Could not load Data. Want to retry';
           }
        },
        err => {
          this.errorMsg = 'Could not load Data. Want to retry';
        }
      );
  }

  retry() {
    this.errorMsg = '';
    this.getlistofMsg();
  }
}

/*
  Interface for List of Msg
*/
export interface ListOfMsg {

  to: string; // number to which message is sent
  date: string;
  time: string;
  otp: string;
  name: string;
}
