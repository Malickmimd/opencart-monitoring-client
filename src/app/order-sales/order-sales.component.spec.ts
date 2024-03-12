import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSalesComponent } from './order-sales.component';

describe('OrderSalesComponent', () => {
  let component: OrderSalesComponent;
  let fixture: ComponentFixture<OrderSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
