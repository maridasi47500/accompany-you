import { Injectable } from '@angular/core';
import { Partition } from '../shared/partition';
import {
	  AngularFireDatabase,
	    AngularFireList,
	      AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
	  providedIn: 'root',
})
export class PartitionService {
	  partitionListRef: AngularFireList<any>;
	    partitionRef: AngularFireObject<any>;
	      constructor(private db: AngularFireDatabase) {}
	      // Create
	         createPartition(apt: Partition) {
	             return this.partitionListRef.push({
	                         song_id: apt.song_id,
	                               filename: apt.filename,
	                                   });
	                                     }
	                                       // Get Single
	                                         getPartition(id: string) {
	                                             this.partitionRef = this.db.object('/partition/' + id);
	                                                 return this.partitionRef;
	                                                   }
	                                                     // Get List
	                                                       getPartitionList() {
	                                                           this.partitionListRef = this.db.list('/partition');
	                                                               return this.partitionListRef;
	                                                                 }
	                                                                   // Update
	                                                                     updatePartition(id: any, apt: Partition) {
	                                                                         return this.partitionRef.update({
	                                                                                     song_id: apt.song_id,
	                                                                                           filename: apt.filename,
	                                                                                               });
	                                                                                                 }
	                                                                                                   // Delete
	                                                                                                     deletePartition(id: string) {
	                                                                                                         this.partitionRef = this.db.object('/partition/' + id);
	                                                                                                             this.partitionRef.remove();
	                                                                                                               }
	                                                                                                               }
