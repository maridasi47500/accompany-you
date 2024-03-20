import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { SongService } from './../shared/song.service';
import { VideoService } from './../shared/video.service';
import { Video } from './../shared/video';
import {
	  AngularFireStorage,
	    AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
	  AngularFirestore,
	    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
export interface imgFile {
	  name: string;
	    filepath: string;
	      size: number;
}
@Component({
	  selector: 'app-tab2',
	    templateUrl: 'tab2.page.html',
	      styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
	makeid(length:any) {
		    var result = '';
		        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
			    var charactersLength = characters.length;
			        let counter = 0;
				    while (counter < length) {
					          result += characters.charAt(Math.floor(Math.random() * charactersLength));
						        counter += 1;
							    }
							        return result;
	}


	// File upload task
	   fileUploadTask: AngularFireUploadTask;
	     // Upload progress
	       percentageVal: Observable<any>;
	         // Track file uploading with snapshot
	           trackSnapshot: Observable<any>;
	             // Uploaded File URL
	               UploadedImageURL: Observable<string>;
	                 // Uploaded image collection
	                   files: Observable<imgFile[]>;
	                     // Image specifications
	                       imgName: string;
	                         imgSize: number;
	                           // File uploading status
	                             isFileUploading: boolean;
	                               isFileUploaded: boolean;
				       myparam:string;
				       mysong:any;
				       Songs: any = [];
				       Videos: any = [];
				       videoLoaded: any;
	                                 private filesCollection: AngularFirestoreCollection<imgFile>;
					 fetchVideos() {

						                                                      this.videoService

												                                                                 .getVideoList()

																				                                                                  .valueChanges()

																												                                                                         .subscribe((res) => {


																																						    console.log(res);
																																						    this.videoLoaded=true;
																																						                                                                                                                                                                                     });


																																																												                }
																																																														deleteVideo(id: any) {


																																																															                         console.log(id);


																																																																		                              if (window.confirm('Do you really want to delete?')) {


																																																																						                                                 this.videoService.deleteVideo(id);


																																																																												                                                }

																																																																																		                                                                                                                                     }
					 fetchSongs() {

						                                                      this.songService

												                                                                 .getSongList()

																				                                                                  .valueChanges()

																												                                                                         .subscribe((res) => {


																																						    console.log(res);
																																						                                                                                                                                                                                     });


																																																												                }
					    ngOnInit() {
						            this.route.params.subscribe(params => {
								                 this.myparam=params['id'];
								                 console.log(params['id']);
											 //get all video
											 this.fetchVideos();
											                                                        let videoRes = this.videoService.getVideoList();
																		                                                           videoRes.snapshotChanges().subscribe((res) => {
																										                                                                            this.Videos = [];
																																			                                                                                   res.forEach((item) => {

																																														              let a: any = item.payload.toJSON();

																																															                         a['$key'] = item.key;
																																																		 this.mysong=this.songService.getSong(a["song_id"]).valueChanges()

																																																		                                                                                                                                                         .subscribe((res) => {


																																																																						                                                                                                                                                                    console.log(res);
																																															                         a['title'] = res.title;
																																															                         a['artist'] = res.artist;


																																																																																																														                                                                                                                                                                                   });
																																																																																																																																				                                                                                    this.songService.getSong(this.myparam);
																																																			 this.songService.getSong(a["song_id"]);

																																																		console.log(a.song_id, this.myparam) ;
																																																		 if(this.myparam !== "all" && a.song_id === this.myparam){


																																																		                            this.Videos.push(a as Video);
																																																		 }else if (this.myparam === "all"){
																																																		                            this.Videos.push(a as Video);
																																																		 }


																																																					                                     });

																																																									                                          });
											 //get song name
										 this.mysong=this.songService.getSong(this.myparam).valueChanges()

										                                                                        .subscribe((res) => {


																				   console.log(res);
																				   this.mysong=res;


																				            });
										 this.songService.getSong(this.myparam);

										         });
											     }
	                                   constructor(
	                                       private afs: AngularFirestore,private videoService: VideoService,private songService: SongService,
	                                           private afStorage: AngularFireStorage,private route: ActivatedRoute
	                                             ) {
	                                                 this.isFileUploading = false;
	                                                     this.isFileUploaded = false;
	                                                         // Define uploaded files collection
	                                                             this.filesCollection = afs.collection<imgFile>('videosCollection');
	                                                                 this.files = this.filesCollection.valueChanges();
	                                                                   }
	                                                                     uploadImage(event: FileList) {
	                                                                         const file: any = event.item(0);
	                                                                             // Image validation
	                                                                                 if (file.type.split('/')[0] !== 'video') {
	                                                                                       console.log('File type is not supported!');
	                                                                                             return;
	                                                                                                 }
	                                                                                                     this.isFileUploading = true;
	                                                                                                         this.isFileUploaded = false;
	                                                                                                             this.imgName = file.name;
	                                                                                                                 // Storage path
	                                                                                                                     const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
															     this.videoService

															                                                       .createVideo({$key: this.makeid(20),song_id: this.myparam, filename: fileStoragePath.split("/")[1]})

																					                                                                 .then((res) => {

																														                                                                             console.log(res);


																																																			                                                                                                               })
	                                                                                                                         // Image reference
	                                                                                                                             const imageRef = this.afStorage.ref(fileStoragePath);
	                                                                                                                                 // File upload task
	                                                                                                                                     this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
	                                                                                                                                         // Show uploading progress
	                                                                                                                                             this.percentageVal = this.fileUploadTask.percentageChanges();
	                                                                                                                                                 this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
	                                                                                                                                                       finalize(() => {
	                                                                                                                                                               // Retreive uploaded image storage path
	                                                                                                                                                                       this.UploadedImageURL = imageRef.getDownloadURL();
	                                                                                                                                                                               this.UploadedImageURL.subscribe(
	                                                                                                                                                                                         (resp) => {
	                                                                                                                                                                                                     this.storeFilesFirebase({
	                                                                                                                                                                                                                   name: file.name,
	                                                                                                                                                                                                                                 filepath: resp,
	                                                                                                                                                                                                                                               size: this.imgSize,
	                                                                                                                                                                                                                                                           });
	                                                                                                                                                                                                                                                                       this.isFileUploading = false;
	                                                                                                                                                                                                                                                                                   this.isFileUploaded = true;
	                                                                                                                                                                                                                                                                                             },
	                                                                                                                                                                                                                                                                                                       (error) => {
	                                                                                                                                                                                                                                                                                                                   console.log(error);
	                                                                                                                                                                                                                                                                                                                             }
	                                                                                                                                                                                                                                                                                                                                     );
	                                                                                                                                                                                                                                                                                                                                           }),
	                                                                                                                                                                                                                                                                                                                                                 tap((snap: any) => {
	                                                                                                                                                                                                                                                                                                                                                         this.imgSize = snap.totalBytes;
	                                                                                                                                                                                                                                                                                                                                                               })
	                                                                                                                                                                                                                                                                                                                                                                   );
	                                                                                                                                                                                                                                                                                                                                                                     }
	                                                                                                                                                                                                                                                                                                                                                                       storeFilesFirebase(image: imgFile) {
	                                                                                                                                                                                                                                                                                                                                                                           const fileId = this.afs.createId();
	                                                                                                                                                                                                                                                                                                                                                                               this.filesCollection
	                                                                                                                                                                                                                                                                                                                                                                                     .doc(fileId)
	                                                                                                                                                                                                                                                                                                                                                                                           .set(image)
	                                                                                                                                                                                                                                                                                                                                                                                                 .then((res) => {
	                                                                                                                                                                                                                                                                                                                                                                                                         console.log(res);
	                                                                                                                                                                                                                                                                                                                                                                                                               })
	                                                                                                                                                                                                                                                                                                                                                                                                                     .catch((err) => {
	                                                                                                                                                                                                                                                                                                                                                                                                                             console.log(err);
	                                                                                                                                                                                                                                                                                                                                                                                                                                   });
	                                                                                                                                                                                                                                                                                                                                                                                                                                     }
	                                                                                                                                                                                                                                                                                                                                                                                                                                     }
