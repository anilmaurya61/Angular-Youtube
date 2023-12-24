import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourvideosComponent } from './yourvideos.component';

describe('YourvideosComponent', () => {
  let component: YourvideosComponent;
  let fixture: ComponentFixture<YourvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourvideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
