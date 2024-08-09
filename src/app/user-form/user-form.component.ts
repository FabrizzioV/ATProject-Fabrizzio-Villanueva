import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImportsModule } from '../imports/imports';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../entities/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.sass'
})
export class UserFormComponent {

  formGroup!: FormGroup;
  user: User = new User();

  @Output() userEvent = new EventEmitter<User>();
  @Input() userEntered!: User;

  ngOnChanges(){
    this.fillForm();
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      dni: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    });
  }

  fillForm(){
    if(this.userEntered){
      this.user=this.userEntered;
    }
  }

  validateForm(id:number){
    this.user.validated=this.formGroup.valid;
    if(this.formGroup.valid){
      this.user.userName=this.formGroup.get('name')?.value;
      this.user.userLastName=this.formGroup.get('lastname')?.value;
      this.user.userId=this.formGroup.get('dni')?.value;
      this.user.birthDate=this.formGroup.get('birthDate')?.value;
      this.user.userPhone=this.formGroup.get('phone')?.value;
      this.user.userEmail=this.formGroup.get('email')?.value;
    }
    this.user.activeEvent=id;
    this.userEvent.emit(this.user);
  }
}
