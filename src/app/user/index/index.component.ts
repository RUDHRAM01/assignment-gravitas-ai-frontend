import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  records: Array<any> = [];
  form!: FormGroup;
  editForm!: FormGroup;
  loading: boolean = false;
  deleteLoading: boolean = false;
  deleteId: number = -1;
  editData: any = {
    id: '',
    title: '',
    body: '',
  };

  constructor(private router: Router, private apiService: ServiceService) {
    if (!localStorage.getItem('loginInfo')) {
      this.router.navigateByUrl('/');
    } else {
      this.loading = true;
      this.apiService.getRecords().subscribe((res) => {
        this.records = res;
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });

    this.editForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.apiService.createRecord(this.form.value).subscribe((res) => {
        this.records.push(res);
        this.loading = false;
      });
    }
  }

  deleteRecord(id: number) {
    this.deleteLoading = true;
    this.deleteId = id;
    this.apiService.deleteRecord(id).subscribe((res) => {
      this.apiService.getRecords().subscribe((res) => {
        this.records = res;
        this.deleteLoading = false;
        this.deleteId = -1;
      });
    });

  }

  updateRecord() {
    this.loading = true;
    this.apiService.updateRecord(this.editData.id, this.editForm.value).subscribe((res) => {
      this.apiService.getRecords().subscribe((res) => {
        this.records = res;
        this.loading = false;
      });
    });
    this.editData = {
      id: '',
      title: '',
      body: '',
    };
  }

  setValue(data: any) {
    this.editData.id = data.id;
    this.editData.title = data.title;
    this.editData.body = data.description;
  }

  logout() {
    localStorage.removeItem('loginInfo');
    this.router.navigateByUrl('/');
  }
}
