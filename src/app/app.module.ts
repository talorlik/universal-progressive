import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule, PLATFORM_ID, APP_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { ImgCardComponent } from "./img-card/img-card.component";

@NgModule({
  declarations: [
      AppComponent, 
      ImgCardComponent
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: "universal-demo-v5" }),
    HttpClientModule,
    BrowserTransferStateModule,
    environment.production
      ? ServiceWorkerModule.register("ngsw-worker.js")
      : [],
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId)
      ? "in the browser"
      : "on the server";
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
