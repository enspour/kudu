import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectOverviewPageComponent } from './project-overview-page.component';

describe('ProjectOverviewPageComponent', () => {
  let component: ProjectOverviewPageComponent;
  let fixture: ComponentFixture<ProjectOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
