import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { RouterModule } from '@angular/router';
import { HeroCarouselComponent } from './carousel/hero-carousel/hero-carousel.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    HeroCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    HeroCarouselComponent

  ]
})
export class SharedModule { }
