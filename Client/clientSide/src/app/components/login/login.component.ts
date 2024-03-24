// //singup component ts
// import { Component } from '@angular/core';
// import { UserServiceService } from '../../services/user.service.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private userService: UserServiceService) {}

//   loginUser() {
//     this.userService
//       .login(this.username, this.password)
//       .subscribe((res: any) => {
//         this.userService.storeToken(res.token);
//       });
//   }
// }

// login.component.ts

import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserServiceService, private router: Router) {}

  loginUser() {
    if(!this.username || !this.password){
      alert("All field are require")
    }
    this.userService.login(this.username, this.password)
    .subscribe((res: any) => {
      const token = res.token;
      this.userService.storeToken(token);
      console.log(`user log in succssfuly: ${this.username}`)
      
      this.router.navigate(['/task']);
      
    },
    (error)=>{
      console.log("Login Error" , error);
      if(error.status === 401){
        alert("Invalid username or password please try again")
      }else{
        alert('An error occurred during login. Please try again later.');
      }
      }
    );
  }
}