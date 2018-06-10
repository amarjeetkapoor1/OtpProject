import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactInfoComponent } from './contact-list/contact-info/contact-info.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { ListOfMsgComponent } from './list-of-msg/list-of-msg.component';
import { ContactGuard } from 'src/app/contact.guard';

const routes: Route[] = [
  {path: '', component: ContactListComponent},
  {path: 'contactInfo', component: ContactInfoComponent, canActivate: [ContactGuard]},
  {path: 'listOfMsg', component: ListOfMsgComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactInfoComponent,
    ListOfMsgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [ContactGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
