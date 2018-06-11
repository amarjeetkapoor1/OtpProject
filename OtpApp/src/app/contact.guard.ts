import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ContactsService, Contact } from './contact-list/shared/contacts.service';

@Injectable()
export  class ContactGuard implements CanActivate {

    Contacts: Contact[];

    constructor(private contactsService: ContactsService,
        private router: Router) {
        this.contactsService.get.subscribe(
            req => {
                this.Contacts = req;
            }
        );
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
        if (this.Contacts !== undefined &&
            this.Contacts.length > route.queryParams['id']) {
            return  resolve(true);
        } else {
            this.router.navigate(['']);
            return resolve(false);
        }
    });
  }
}
