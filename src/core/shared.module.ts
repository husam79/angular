//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { PrefixTranslatePipe } from './pipes/prefix-translate.pipe';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TranslateComponent } from './components/translate/translate.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { LoaderDirective } from './directives/loader.directive';
import { LoaderComponent } from './components/loader/loader.component';

function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    // Components
    PrefixTranslatePipe,
    //TranslateComponent,
    HighlightPipe,

    //directives
    LoaderDirective,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    //   TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    //   TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    LottieModule,
    PrefixTranslatePipe,
    HighlightPipe,
    // TranslateComponent,

    //directives
    LoaderDirective,
    LoaderComponent,
  ],
})
export class SharedModule {}
