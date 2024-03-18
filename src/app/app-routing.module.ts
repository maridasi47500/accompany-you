import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'song',
    loadChildren: () => import('./song/song.module').then( m => m.SongPageModule)
  },
  {
    path: 'edit-song/:id',
    loadChildren: () => import('./edit-song/edit-song.module').then( m => m.EditSongPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
