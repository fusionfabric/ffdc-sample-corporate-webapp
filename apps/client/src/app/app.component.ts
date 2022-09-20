import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '@ffdc-corporate-banking-sample/ui/auth';
import '@finastra/app-bar';
import '@finastra/sidenav';
import '@finastra/user-profile';
import '@finastra/button';
import '@finastra/app-card';
import '@material/mwc-icon-button';

@Component({
  selector: 'fcbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appName = 'Account Services';

  @ViewChild('appBar') appBar: ElementRef;
  @ViewChild('userProfile') userProfile: ElementRef;

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  ngAfterViewInit() {
    this.userProfile.nativeElement.setAttribute(
      'username',
      this.auth.user$.value['username']
    );
    this.appBar.nativeElement.setAttribute('appname', this.appName);
  }
}
