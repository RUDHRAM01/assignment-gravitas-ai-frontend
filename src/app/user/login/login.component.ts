import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'login';
  isError: boolean = false;
  errorMsg: string = '';
  form!: FormGroup;
  loading: boolean = false;
  constructor(private apiService: ServiceService, private router: Router) {
    if(localStorage.getItem('loginInfo')) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  login() {
    this.loading = true;
    this.apiService.Login(this.form.value).subscribe((data) => {
      localStorage.setItem('loginInfo', data.token);
      this.router.navigateByUrl('/home');
      this.isError = false;
      this.loading = false;
    }, (error) => {
      this.isError = true;
      this.loading = false;
      this.errorMsg = error.error.msg;
      setTimeout(() => {
        this.isError = false;
      }, 2000);
    });
  }
}
