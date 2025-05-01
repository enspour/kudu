import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarYearComponent } from './calendar-years.component';

describe('CalendarYearComponent', () => {
  let component: CalendarYearComponent;
  let fixture: ComponentFixture<CalendarYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarYearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
