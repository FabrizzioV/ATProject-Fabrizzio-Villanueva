import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingProcessComponent } from './buying-process.component';

describe('BuyingProcessComponent', () => {
  let component: BuyingProcessComponent;
  let fixture: ComponentFixture<BuyingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyingProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
