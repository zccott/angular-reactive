import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  termsAccepted: boolean = false;

  registerForm: FormGroup;

  genders = ['Male', 'Female', 'Prefer Not to Say'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      lastName: ['', [Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(17), Validators.max(20)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  onRegister(){
    console.log(this.termsAccepted)
    console.log(this.registerForm.getRawValue())
  }

}
