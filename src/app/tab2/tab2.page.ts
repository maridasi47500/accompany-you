import { Component,OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { SongService } from './../shared/song.service';
import { VideoService } from './../shared/video.service';
import { Video } from './../shared/video';
import { ElementRef,Directive, Input, ViewChild} from '@angular/core';
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
export class Tab2Page implements OnInit,AfterViewInit {
	progressValue:any="0";
	@ViewChild('videoContainer') videocont: ElementRef;
	videoElmt: any;
	checkVolume(dir:any = null) {
		  if (dir) {
			      const currentVolume = Math.floor(this.videoElmt.volume * 10) / 10;
			          if (dir === "+" && currentVolume < 1) {
					        this.videoElmt.volume += 0.1;
						    } else if (dir === "-" && currentVolume > 0) {
							          this.videoElmt.volume -= 0.1;
								      }

								        // If the volume has been turned off, also set it as muted
								           // Note: can only do this with the custom control set as when the 'volumechange' event is raised,
								               // there is no way to know if it was via a volume or a mute change
								                   this.videoElmt.muted = currentVolume <= 0;
								                     }
								                       this.changeButtonState("mute");
								                       }
										       playVideo(filename:any){
											       this.videoElmt.src="https://firebasestorage.googleapis.com/v0/b/accompa-u.appspot.com/o/filesStorage%2F"+filename+"?alt=media";
										       }
										       alterVolume= (dir:any) => {
											         this.checkVolume(dir);
										       };
										       myprogress($ev:any){
											       const pos =
												           ($ev.pageX - $ev.target.offsetLeft - $ev.target.offsetParent.offsetLeft) /
													       $ev.target.offsetWidth;
											         this.videoElmt.currentTime = pos * this.videoElmt.duration;
										       }								       
	ngAfterViewInit(){
		  console.log("hello there");
		 this.videoElmt = this.videocont.nativeElement.getElementsByTagName('video')[0];
		  console.log("heythere");
		  console.log("heythere",this.videoElmt);
	}
	playpause(){
		if (this.videoElmt.paused || this.videoElmt.ended) {
			    this.videoElmt.play();
			      } else {
				          this.videoElmt.pause();
					    }
	}
	stop(){
		this.videoElmt.pause();
		this.pause();
		this.videoElmt.currentTime=0;
		this.progressValue="0";
		this.changeButtonState("playpause");
	}
	dataStatePlay:any="fake"; //visible or hidden
	dataStateMute:any="fake"; //visible or hidden
	videopaused:any=true;
	videoended:any=false;
	videomuted:any=false;
	hey:any=[this.videopaused,this.videoended,this.videomuted];
	pause(){
		for (var i = 0;i<this.hey.length;i++){
			this.hey[i]=false;
		}
		this.videopaused=true;
		this.changeButtonState("playpause");
	}
	mute(){
		for (var i = 0;i<this.hey.length;i++){
			this.hey[i]=false;
		}
		this.videomuted=true;
	}
	ended(){
		for (var i = 0;i<this.hey.length;i++){
			this.hey[i]=false
		}
		this.videopaused=true;
		this.videoended=true;
	}
	play(){
		this.videopaused=false;
		this.changeButtonState("playpause");
	}
	muteOk() {
		  if (this.videoElmt.muted === true) {
			    // Play/Pause button
			             this.dataStateMute= "mute";
				     this.videoElmt.muted=false;
		  }else {
			             this.dataStateMute= "unmute";
				     this.videoElmt.muted=true;
			                                       }
	}
	voldown(){
		this.videoElmt.volume=this.videoElmt.volume - 5/100;
	}
	volinc(){
		this.videoElmt.volume=this.videoElmt.volume + 5/100;
	}
	changeButtonState(type:any) {
		  if (type === "playpause") {
			    // Play/Pause button
			       if (this.videopaused || this.videoended) {
			             this.dataStatePlay= "play";
			                 } else {
			             this.dataStatePlay= "pause";
			                           }
			                             } else if (type === "mute") {
			                                 // Mute button
			             this.dataStateMute= this.videomuted ? "unmute" : "mute";
			                                       }
			                                       }
	dataState:any="fake"; //visible or hidden
	maxProgress:any=undefined;
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
