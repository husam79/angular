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

function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    // Components
    PrefixTranslatePipe,
    //TranslateComponent,
    HighlightPipe,
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
  ],
})
export class SharedModule {}
