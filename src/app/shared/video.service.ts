import { Injectable } from '@angular/core';
import { Video } from '../shared/video';
import {
	  AngularFireDatabase,
	    AngularFireList,
	      AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
	  providedIn: 'root',
})
export class VideoService {
	  videoListRef: AngularFireList<any>;
	    videoRef: AngularFireObject<any>;
	      constructor(private db: AngularFireDatabase) {}
	      // Create
	         createVideo(apt: Video) {
	             return this.videoListRef.push({
	                         song_id: apt.song_id,
	                               filename: apt.filename,
	                                   });
	                                     }
	                                       // Get Single
	                                         getVideo(id: string) {
	                                             this.videoRef = this.db.object('/video/' + id);
	                                                 return this.videoRef;
	                                                   }
	                                                     // Get List
	                                                       getVideoList() {
	                                                           this.videoListRef = this.db.list('/video');
	                                                               return this.videoListRef;
	                                                                 }
	                                                                   // Update
	                                                                     updateVideo(id: any, apt: Video) {
	                                                                         return this.videoRef.update({
	                                                                                     song_id: apt.song_id,
	                                                                                           filename: apt.filename,
	                                                                                               });
	                                                                                                 }
	                                                                                                   // Delete
	                                                                                                     deleteVideo(id: string) {
	                                                                                                         this.videoRef = this.db.object('/video/' + id);
	                                                                                                             this.videoRef.remove();
	                                                                                                               }
	                                                                                                               }
