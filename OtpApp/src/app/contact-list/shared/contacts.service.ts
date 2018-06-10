import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[];
  private updateSubject = new ReplaySubject<Contact[]>(1);
  get = this.updateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.update();
  }

  update() {
  this.http.get(environment.url).subscribe(
      (req: Contact[]) => {
        this.contacts = req;
        this.updateSubject.next([...this.contacts]);
      },
      err => {
        this.updateSubject.next([]);
      }
    );
  }

  sendMsg(mob: string, msg: string) {
    return this.http.post(environment.url + 'sendMsg/', { number: mob, msg: msg});
  }

}


export interface Contact {

  firstName: string;
  lastName: string;
  number: string;
}
