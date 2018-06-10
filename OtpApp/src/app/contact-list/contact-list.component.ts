import { Component, OnInit } from '@angular/core';
import { ContactsService, Contact } from 'src/app/contact-list/shared/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  errorMsg = '';
  constructor(private contactsService: ContactsService,
    private router: Router) {
      this.contacts = [];
  }

  ngOnInit() {

    // updating List of contacts
    this.contactsService.get.subscribe(
      contacts => {
        if ( contacts.length > 0) {
          this.contacts = contacts;
        } else {
          this.errorMsg = 'Could not load Data. Want to retry';
        }
      }
    );
  }

  onSelect(id) {
    this.router.navigate(['/contactInfo'], { queryParams: { id: id } });
  }

  retry() {
    this.errorMsg = '';
    this.contactsService.update();
  }
}
