import { Component } from '@angular/core';
import { AuthService } from '@ffdc-corporate-banking-sample/ui/auth';
import { routes } from './constants';
import { Router } from '@angular/router';

@Component({
  selector: 'fcbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appName = 'Corporate Account Services';

  navigationNodes = routes;

  constructor(public auth: AuthService, private router: Router) {}

  nodeChosen(node) {
    this.router.navigate([node.path]);
  }

  brandAction() {
    this.router.navigate(['home']);
  }

  logout() {
    this.auth.logout();
  }
}
