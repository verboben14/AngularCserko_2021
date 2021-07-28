import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/user/user.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NavComponent } from './common/nav/nav.component';
import { ConfigService } from './service/config.service';
import { JwtInterceptor } from './service/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FibonacciPipe } from './pipe/fibonacci.pipe';
import { SearchFieldComponent } from './common/search-field/search-field.component';
import { FilterPipe } from './pipe/filter.pipe';
import { IndexMapperPipe } from './pipe/index-mapper.pipe';
import { XpipePipe } from './pipe/xpipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    UserEditComponent,
    ForbiddenComponent,
    NavComponent,
    FibonacciPipe,
    SearchFieldComponent,
    FilterPipe,
    IndexMapperPipe,
    XpipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (service: ConfigService) => service.bootstrap(),
      deps: [ConfigService, HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
