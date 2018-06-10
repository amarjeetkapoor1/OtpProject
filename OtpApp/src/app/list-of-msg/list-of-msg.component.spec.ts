import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMsgComponent } from './list-of-msg.component';

describe('ListOfMsgComponent', () => {
  let component: ListOfMsgComponent;
  let fixture: ComponentFixture<ListOfMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
