// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';
// import { PrivateLayoutComponent } from './shared/layouts/private-layout/private-layout.component';
// import { GuestGuard } from './auth/guards/quest.guard';
// import { AuthGuard } from './auth/guards/auth.guard';


// const routes: Routes = [
//   {
//     path: '',
//     component: PublicLayoutComponent,
//     children: [
//       {
//         path: 'auth',
//         loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
//         canActivate: [GuestGuard]
//       },
//       { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
//     ]
//   },


//   {
//     path: '',
//     component: PrivateLayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'home',
//         loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
//       },
//       {
//         path: 'users',
//         loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
//       },
//       {
//         path: 'contact',
//         loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
//       },
//       {
//         path: 'products',
//         loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
//       },
//     ]
//   },
//   { path: '**', redirectTo: '/auth/login' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './shared/layouts/private-layout/private-layout.component';
import { GuestGuard } from './auth/guards/quest.guard';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  // Ruta sin protección para Home
  {
    path: '',
    component: PrivateLayoutComponent, // o un MainLayout si tienes uno genérico
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirige raíz a /home
    ]
  },

  // Rutas públicas (login, register)
  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [GuestGuard] // Solo usuarios NO logueados
      }
    ]
  },

  // Rutas privadas protegidas por AuthGuard
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
    ]
  },

  // Redirección comodín
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
