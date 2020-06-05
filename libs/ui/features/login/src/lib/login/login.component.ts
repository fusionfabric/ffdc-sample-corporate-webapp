import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ffdc-corporate-banking-sample/ui/auth';

@Component({
  selector: 'ffdc-corporate-banking-sample-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
