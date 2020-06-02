import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthenticatedGuard } from '@ffdc-corporate-banking-sample/ui/auth';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('../app.module').then((m) => m.AppModule),
        canLoad: [AuthenticatedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppInitRoutingModule {}
