import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmComponent } from './comfirm.component';

describe('ComfirmComponent', () => {
  let component: ComfirmComponent;
  let fixture: ComponentFixture<ComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
