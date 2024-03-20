import { Injectable } from '@angular/core';
import { Accompagnement } from '../shared/accompagnement';
import {
	  AngularFireDatabase,
	    AngularFireList,
	      AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
	  providedIn: 'root',
})
export class AccompagnementService {
	  accompagnementListRef: AngularFireList<any>;
	    accompagnementRef: AngularFireObject<any>;
	      constructor(private db: AngularFireDatabase) {}
	      // Create
	         createAccompagnement(apt: Accompagnement) {
	             return this.accompagnementListRef.push({
	                         song_id: apt.song_id,
	                               filename: apt.filename,
	                                   });
	                                     }
	                                       // Get Single
	                                         getAccompagnement(id: string) {
	                                             this.accompagnementRef = this.db.object('/accompagnement/' + id);
	                                                 return this.accompagnementRef;
	                                                   }
	                                                     // Get List
	                                                       getAccompagnementList() {
	                                                           this.accompagnementListRef = this.db.list('/accompagnement');
	                                                               return this.accompagnementListRef;
	                                                                 }
	                                                                   // Update
	                                                                     updateAccompagnement(id: any, apt: Accompagnement) {
	                                                                         return this.accompagnementRef.update({
	                                                                                     song_id: apt.song_id,
	                                                                                           filename: apt.filename,
	                                                                                               });
	                                                                                                 }
	                                                                                                   // Delete
	                                                                                                     deleteAccompagnement(id: string) {
	                                                                                                         this.accompagnementRef = this.db.object('/accompagnement/' + id);
	                                                                                                             this.accompagnementRef.remove();
	                                                                                                               }
	                                                                                                               }
