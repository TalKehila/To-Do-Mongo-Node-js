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
    this.userService.login(this.username, this.password).subscribe((res: any) => {
      const token = res.token;
      this.userService.storeToken(token);
      this.router.navigate(['/task']);
    });
  }
}