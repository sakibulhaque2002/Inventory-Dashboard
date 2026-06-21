import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockComponent } from './low-stock.component';

describe('LowStockComponent', () => {
  let component: LowStockComponent;
  let fixture: ComponentFixture<LowStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
