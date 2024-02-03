import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form!: FormGroup;
  isError: boolean = false;
  errorMsg: string = '';
  isSuccess: boolean = false;
  successMsg: string = '';
  constructor(private router: Router, private apiService: ServiceService) {
    if (localStorage.getItem('loginInfo')) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
   }

  signUp() {
    this.apiService.Register(this.form.value).subscribe((res) => {
      this.isSuccess = true;
      this.successMsg = res.msg;
      setTimeout(() => {
        this.isSuccess = false;
        this.router.navigateByUrl('/login');
      }, 2000);
    }, (error) => {
      this.isError = true;
      this.errorMsg = error.error.msg;
      setTimeout(() => {
        this.isError = false;
      }, 2000);
    });
  }
}
