import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, ContactsService } from '../shared/contacts.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  contact: Contact;
  composeMessage = false;
  msg: string;
  msgSent = false;

  constructor(private activatedRoute: ActivatedRoute,
  private contactsService: ContactsService) {
   }

  ngOnInit() {
    this.contact = {
      firstName: '',
      lastName: '',
      number: ''
    };
    this.activatedRoute.queryParams.subscribe(
      contactNumber => {
        this.contactsService.get.subscribe(
          contacts => {
            this.contact = contacts[contactNumber.id];
            this.msg = this.getMsg();
          }
        );
      }
    );
  }

  getOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  getMsg(): string {
    return 'Hi, Your OTP is: ' + this.getOTP();
  }

  sendMsg() {
    this.msgSent = true;
    this.contactsService.sendMsg(this.contact.number , this.msg).subscribe(
      response => {
        this.msgSent = false;
        if (!response['error']) {
          this.composeMessage = false;
          alert ('Message Sent');
        } else {
          alert ('Message failed due to ' + response['error']);
        }
      },
      error => {
        this.msgSent = false;
        alert ('Message failed to send');
      }
    );
  }
}
