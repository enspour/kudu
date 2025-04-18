import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomComponent } from './zoom.component';

describe('ZoomComponent', () => {
  let component: ZoomComponent;
  let fixture: ComponentFixture<ZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
