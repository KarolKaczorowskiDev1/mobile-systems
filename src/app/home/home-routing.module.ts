import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { Role } from '../shared/model/enums/role';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: 'products',
        loadChildren: () => import('src/app/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('src/app/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('src/app/cart/cart.module').then(m => m.CartModule),
        canActivate: [RoleGuard],
        data: {
          role: Role.CLIENT,
        }
      },
      {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

// providers: [
//   {
//     provide: ROUTES,
//     deps: [UserDataProviderService],
//     multi: true,
//     useFactory: (userDataProvider: UserDataProviderService) => {
//       return configureHomeRoutes(userDataProvider);
//     }
//   }
// ]

// function configureHomeRoutes(userDataProvider: UserDataProviderService): Routes {
  // const userInfo = userDataProvider.getUserInfo();

  // if (userInfo) {
    // if (userInfo.role === Role.ADMIN) {
      // return [
        // {
          // path: '',
          // component: HomeComponent,
          // loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule),
        // }
      // ]
    // }
    
    // return [
      // {
        // path: '',
        // component: HomeComponent,
        // children: [
          // {
            // path: '',
            // loadChildren: () => import('src/app/client/client.module').then(m => m.ClientModule),
            // canLoad: [AuthGuard],
          // }
        // ]
        // loadChildren: () => import('src/app/client/client.module').then(m => m.ClientModule),
      // }
    // ]
  // }

  // return [];
// }