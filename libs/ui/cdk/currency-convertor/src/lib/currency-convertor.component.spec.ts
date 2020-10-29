import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertor } from './currency-convertor.component';

describe('StatementComponent', () => {
  let component: CurrencyConvertor;
  let fixture: ComponentFixture<CurrencyConvertor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyConvertor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConvertor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
