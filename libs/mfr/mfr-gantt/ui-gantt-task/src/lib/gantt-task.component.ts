import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KuduTooltipDirective } from '@kudu-ui';

import { Task } from '@kudu/domain';

@Component({
  selector: 'lib-gantt-task',
  imports: [KuduTooltipDirective],
  templateUrl: './gantt-task.component.html',
  styleUrl: './gantt-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttTaskComponent {
  public task = input.required<Task>();

  public onResize() {
    console.log('onResize');
  }
}
