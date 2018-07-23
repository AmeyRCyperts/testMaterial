import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data:any=[]
  email:any;
  password:any;
  answer: string = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(private router:Router,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(){
    let isValidate = this.getFromLocal("info");
    let data = isValidate['info'];
    console.log(JSON.stringify(data.email)); 
    if(this.answer != data.email || this.password != data.contact){
      this.openSnackBar("Username Or Password does not match. Please REGISTER or reLOGIN.");  
    }
    else{
    this.openSnackBar("Successfully Logged in");
    this.router.navigate(["dashboard"]);
    }
  }
  register(){
    this.router.navigate(["register"]);
  }
  
  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);
    return this.data;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,"",{duration:2000});
  }

}
