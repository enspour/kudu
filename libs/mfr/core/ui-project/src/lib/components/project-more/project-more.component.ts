import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import {
  KuduDialogService,
  KuduIconComponent,
  KuduMenuButtonComponent,
  KuduMenuByTriggerComponent,
  KuduMenuTriggerDirective,
} from '@kudu-ui';

import { Project } from '@kudu/domain';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-project-more',
  imports: [
    KuduIconComponent,
    KuduMenuByTriggerComponent,
    KuduMenuButtonComponent,
    KuduMenuTriggerDirective,
  ],
  templateUrl: './project-more.component.html',
  styleUrl: './project-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMoreComponent {
  private dialogService = inject(KuduDialogService);

  private trigger = viewChild(KuduMenuTriggerDirective);

  public isOpen = computed(() => !!this.trigger()?.isOpen());

  public project = input.required<Project>();

  public byRename = output<Project>();
  public byDelete = output<Project>();

  public onRename() {
    this.byRename.emit(this.project());
  }

  public onDelete() {
    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление проекта',
        description: `Вы уверены, что хотите удалить проект "${this.project().name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        this.byDelete.emit(this.project());
      }
    });
  }
}
