import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  KuduButtonComponent,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { AuthService } from '@kudu/mfr-data-access-auth';

@Component({
  selector: 'lib-login-page',
  imports: [
    ReactiveFormsModule,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduButtonComponent,
    KuduIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public form = this.fb.nonNullable.group({
    username: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  public async onSubmit() {
    const { username, password } = this.form.getRawValue();
    const response = await this.authService.login(username, password);

    console.log(response);
    if (response.statusCode === 200) {
      this.router.navigateByUrl('/');
    }
  }
}
