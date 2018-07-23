import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public data:any=[]
  fullname:any;
  username:any;
  email:any;
  phone:any;
  country:any;

  fullnameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]*"),
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  countryFormControl = new FormControl('', [
    Validators.required
  ]);
  form : FormGroup;
  constructor(private router:Router,
              fb: FormBuilder,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

                this.form = fb.group({
                  'fullname' : [null, Validators.required],
                  'username' : [null, Validators.required],
                  'email': [null, Validators.compose([Validators.required, Validators.email,])],
                  'contact': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10) ,Validators.maxLength(10)])],
                  'country' : [null, Validators.required],
                });
               }

  ngOnInit() {
  }

  register(value: any){
    this.saveInLocal("info",value);
    this.router.navigate(["login"]);
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
   }
}