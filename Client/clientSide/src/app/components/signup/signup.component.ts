//singup component ts
import { Component } from '@angular/core';
import User from '../../model/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: User = new User();

  constructor(private httpservice: HttpClient) {}

  registerUser() {
    if (
      !this.user.username ||!this.user.password ||!this.user.email ||!this.user.fullname ){
        alert("Please fill all the fields");
        return;
      }
    
      this.httpservice
        .post('http://localhost:8080/api/user/signup', this.user)
        .subscribe(
          (data) => {
            console.log(data);
            alert("user registerd succssfully")
          },
          (error) => {
            console.log(error);
          }
        );
  }
}
