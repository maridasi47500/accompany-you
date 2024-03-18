import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSongPageRoutingModule } from './edit-song-routing.module';

import { EditSongPage } from './edit-song.page';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
		      ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditSongPageRoutingModule
  ],
  declarations: [EditSongPage]
})
export class EditSongPageModule {}
