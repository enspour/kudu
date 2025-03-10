import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Project } from '@kudu/domain';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

import { CreateProjectModalComponent } from '@kudu/mfr-feature-create-project';

import { ProjectTableComponent } from '@kudu/mfr-ui-project';

@Component({
  selector: 'lib-projects-page',
  imports: [
    FormsModule,
    KuduButtonComponent,
    KuduIconComponent,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduFilterPipe,
    ProjectTableComponent,
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(KuduDialogService);
  private projectsService = inject(ProjectsService);

  public projects = this.projectsService.projects;

  public searchTerm = input<string>();

  ngOnInit(): void {
    this.projectsService.reload();
  }

  public onSearchTermChange(searchTerm: string) {
    this.router.navigateByUrl(`/projects?searchTerm=${searchTerm}`);
  }

  public onCreateProject() {
    this.dialog.open(CreateProjectModalComponent, {
      hasBackdrop: true,
    });
  }

  public onClickProject(project: Project) {
    this.router.navigateByUrl(`/projects/${project.uuid}/gantt`);
  }

  public filterFn(value: Project, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }
}
