import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './Shared/sortpipe.pipe';
import { HelpComponent } from './Help/Help.component';
import { FlashComponent } from './flash/flash.component';
import { HeaderComponent } from './Header/Header.component';
import { FooterComponent } from './Footer/Footer.component';
import { ProfileComponent } from './Profile/Profile.component';
import { FilterPipePipe } from './Shared/filter-pipe.pipe';
import { AdminHomeComponent } from './AdminHome/AdminHome.component';
import { NewPostComponent } from './NewPost/NewPost.component';
@NgModule({
  declarations: [		
    AppComponent,
    routingComponents,

SortPipe,
      HelpComponent,
      FlashComponent,
      HeaderComponent,
      FooterComponent,
      ProfileComponent,
      FilterPipePipe,
      AdminHomeComponent,
      NewPostComponent
   ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
