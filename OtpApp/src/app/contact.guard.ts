import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ContactsService, Contact } from "./contact-list/shared/contacts.service";

@Injectable()
export  class ContactGuard implements CanActivate {

    Contacts: Contact[];

    constructor(private contactsService: ContactsService) {
        this.contactsService.get.subscribe(
            req => {
                this.Contacts = req;
            }
        );
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.Contacts.length > route.queryParams['id']) {
        return true;
    } else {
        return false;
    }
  }
}