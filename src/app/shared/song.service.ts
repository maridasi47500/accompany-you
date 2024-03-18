import { Injectable } from '@angular/core';
import { Song } from '../shared/song';
import {
	  AngularFireDatabase,
	    AngularFireList,
	      AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
	  providedIn: 'root',
})
export class SongService {
	  songListRef: AngularFireList<any>;
	    songRef: AngularFireObject<any>;
	      constructor(private db: AngularFireDatabase) {}
	      // Create
	         createSong(apt: Song) {
	             return this.songListRef.push({
	                         artist: apt.artist,
	                               title: apt.title,
	                                   });
	                                     }
	                                       // Get Single
	                                         getSong(id: string) {
	                                             this.songRef = this.db.object('/song/' + id);
	                                                 return this.songRef;
	                                                   }
	                                                     // Get List
	                                                       getSongList() {
	                                                           this.songListRef = this.db.list('/song');
	                                                               return this.songListRef;
	                                                                 }
	                                                                   // Update
	                                                                     updateSong(id: any, apt: Song) {
	                                                                         return this.songRef.update({
	                                                                                     artist: apt.artist,
	                                                                                           title: apt.title,
	                                                                                               });
	                                                                                                 }
	                                                                                                   // Delete
	                                                                                                     deleteSong(id: string) {
	                                                                                                         this.songRef = this.db.object('/song/' + id);
	                                                                                                             this.songRef.remove();
	                                                                                                               }
	                                                                                                               }
