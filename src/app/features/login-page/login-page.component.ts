import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted = false;
  public infoMessage!: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;

    this.auth.login(this.loginForm.value).subscribe(
      () => {
        this.loginForm.reset();
        this.router.navigate(['/main', 'games']);
        this.submitted = false;
      },
      () => (this.submitted = false)
    );
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['authentication']) {
        this.infoMessage = 'Please sign in';
      } else if (params['authFailed']) {
        this.infoMessage = 'Your session has expired. Please sign in again. ';
      }
    });
    this.initForm();
  }
}
