import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from '@ffdc-corporate-banking-sample/ui/auth';
import { routes } from './constants';
import { Router } from '@angular/router';
import { isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'fcbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appName = 'Corporate Account Services';

  navigationNodes = routes;

  isBrowser: boolean;

  @ViewChild("appBar") appBar: ElementRef;
  @ViewChild("userProfile") userProfile: ElementRef;
  

  constructor(public auth: AuthService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if(this.isBrowser) {
      import("@finastra/app-bar");
      import("@finastra/user-profile");
      import("@finastra/button");
      import("@material/mwc-icon-button");
    }
  }

  nodeChosen(node) {
    this.router.navigate([node.path]);
  }

  brandAction() {
    this.router.navigate(['home']);
  }

  logout() {
    this.auth.logout();
  }

  ngAfterViewInit() {
    this.userProfile.nativeElement.setAttribute("username",this.auth.user$.value['username']);
    this.appBar.nativeElement.setAttribute("appname", this.appName);  
  }
}
