import { Component,OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { SongService } from './../shared/song.service';
import { AccompagnementService } from './../shared/accompagnement.service';
import { Accompagnement } from './../shared/accompagnement';
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
	  selector: 'app-tab3',
	    templateUrl: 'tab3.page.html',
	      styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
	ionViewDidLeave(){
		this.stop()
	}
        progressValue:any="0";
	        @ViewChild('musiqueContainer') musiquecont: ElementRef;
		        musiqueElmt: any;
			        checkVolume(dir:any = null) {
					                  if (dir) {
								                                const currentVolume = Math.floor(this.musiqueElmt.volume * 10) / 10;
												                                  if (dir === "+" && currentVolume < 1) {
																	                                                  this.musiqueElmt.volume += 0.1;
																							                                                      } else if (dir === "-" && currentVolume > 0) {
																														                                                                        this.musiqueElmt.volume -= 0.1;
																																							                                                                      }
																																															      this.musiqueElmt.muted = currentVolume <= 0;

																																															       }

																																															          this.changeButtonState("mute");

																																																     }

																																																        playVideo(filename:any){

																																																		           this.musiqueElmt.src="https://firebasestorage.googleapis.com/v0/b/accompa-u.appspot.com/o/filesStorage%2F"+filename+"?alt=media";
																																																			                                                                                          }

																																																														     alterVolume= (dir:any) => {

																																																															                  this.checkVolume(dir);
																																																																	                                                                                         };

																																																																												    myprogress($ev:any){

																																																																													               const pos =

																																																																															                              ($ev.pageX - $ev.target.offsetLeft - $ev.target.offsetParent.offsetLeft) /

																																																																																		                                 $ev.target.offsetWidth;

																																																																														                    this.musiqueElmt.currentTime = pos * this.musiqueElmt.duration;

																																																																																       }
																																																																																               ngAfterViewInit(){
																																																																																		                         console.log("hello there");
																																																																																					                  this.musiqueElmt = this.musiquecont.nativeElement.getElementsByTagName('audio')[0];
																																																																																							                    console.log("heythere");
																																																																																									                      console.log("heythere",this.musiqueElmt);
																																																																																											              }
																																																																																												              playpause(){
																																																																																														                      if (this.musiqueElmt.paused || this.musiqueElmt.ended) {
																																																																																																	                                  this.musiqueElmt.play();
																																																																																																					                                } else {
																																																																																																										                                          this.musiqueElmt.pause();
																																																																																																															                                              }
																																																																																																																				              }
																																																																																																																					      stop(){
																																																																																																																						                      this.musiqueElmt.pause();
																																																																																																																								                      this.pause();
																																																																																																																										                      this.musiqueElmt.currentTime=0;
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
																																																																																																																																																																																							                        if (this.musiqueElmt.muted === true) {
																																																																																																																																																																																											                            // Play/Pause button
																																																																																																																																																																																											                                      this.dataStateMute= "mute";
																																																																																																																																																																																											                                                                           this.musiqueElmt.muted=false;
																																																																																																																																																																																											                                                                                             }else {
																																																																																																																																																																																											                                                                                                                                  this.dataStateMute= "unmute";
																																																																																																																																																																																											                                                                                                                                                                       this.musiqueElmt.muted=true;
																																																																																																																																																																																											                                                                                                                                                                                                                                      }
																																																																																																																																																																																											                                                                                                                                                                                                                                              }
																																																																																																																																																																																											                                                                                                                                                                                                                                                      voldown(){
																																																																																																																																																																																											                                                                                                                                                                                                                                                                      this.musiqueElmt.volume=this.musiqueElmt.volume - 5/100;
																																																																																																																																																																																											                                                                                                                                                                                                                                                                              }
																																																																																																																																																																																											                                                                                                                                                                                                                                                                                      volinc(){
																																																																																																																																																																																											                                                                                                                                                                                                                                                                                                      this.musiqueElmt.volume=this.musiqueElmt.volume + 5/100;
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
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               playing(){
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.progressValue=this.musiqueElmt.currentTime;
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               loaded(){
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.maxProgress=this.musiqueElmt.duration;
																																																																																																																																																																																																																																						                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
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
				       Accompagnements: any = [];
				       accompagnementLoaded:any;
	                                 private filesCollection: AngularFirestoreCollection<imgFile>;
					 deleteAccompagnement(id: any) {


						                          console.log(id);


									                               if (window.confirm('Do you really want to delete?')) {


													                                                  this.accompagnementService.deleteAccompagnement(id);


																			                                                 }

																									                                                                                                                                      }
					 fetchAccompagnements() {

						                                                      this.accompagnementService

												                                                                 .getAccompagnementList()

																				                                                                  .valueChanges()

																												                                                                         .subscribe((res) => {


																																						    console.log(res);
																																						    this.accompagnementLoaded=true;
																																						                                                                                                                                                                                     });


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
											 //get all accompagnement
											 this.fetchAccompagnements();
											                                                        let accompagnementRes = this.accompagnementService.getAccompagnementList();
																		                                                           accompagnementRes.snapshotChanges().subscribe((res) => {
																										                                                                            this.Accompagnements = [];
																																			                                                                                   res.forEach((item) => {

																																														              let a: any = item.payload.toJSON();

																																															                         a['$key'] = item.key;
																																																		 this.songService.getSong(a["song_id"]).valueChanges()

																																																		                                                                                                                                                         .subscribe((res) => {


																																																																						                                                                                                                                                                    console.log(res);
																																															                         a['title'] = res.title;
																																															                         a['artist'] = res.artist;


																																																																																																														                                                                                                                                                                                   });
																																																																																																																																				                                                                                    this.songService.getSong(this.myparam);
																																																			 this.songService.getSong(a["song_id"]);

																																																		console.log(a.song_id, this.myparam) ;
																																																		 if(this.myparam !== "all" && a.song_id === this.myparam){


																																																		                            this.Accompagnements.push(a as Accompagnement);
																																																		 }else if (this.myparam === "all"){
																																																		                            this.Accompagnements.push(a as Accompagnement);
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
	                                       private afs: AngularFirestore,private accompagnementService: AccompagnementService,private songService: SongService,
	                                           private afStorage: AngularFireStorage,private route: ActivatedRoute
	                                             ) {
	                                                 this.isFileUploading = false;
	                                                     this.isFileUploaded = false;
	                                                         // Define uploaded files collection
	                                                             this.filesCollection = afs.collection<imgFile>('enregistrementsCollection');
	                                                                 this.files = this.filesCollection.valueChanges();
	                                                                   }
	                                                                     uploadImage(event: FileList) {
	                                                                         const file: any = event.item(0);
	                                                                             // Image validation
	                                                                                 if (file.type.split('/')[0] !== 'audio' && file.type.split('/')[0] !== 'video') {
	                                                                                       console.log('File type is not supported!');
	                                                                                             return;
	                                                                                                 }
	                                                                                                     this.isFileUploading = true;
	                                                                                                         this.isFileUploaded = false;
	                                                                                                             this.imgName = file.name;
	                                                                                                                 // Storage path
	                                                                                                                     const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
															     this.accompagnementService

															                                                       .createAccompagnement({$key: this.makeid(20),song_id: this.myparam, filename: fileStoragePath.split("/")[1]})

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
