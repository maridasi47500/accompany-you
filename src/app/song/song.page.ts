import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SongService } from './../shared/song.service';
import { Song } from './../shared/song';
@Component({
	  selector: 'app-song',
	    templateUrl: './song.page.html',
	      styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

	  songForm: FormGroup;
	    constructor(
		        private songService: SongService,
			    private router: Router,
			        public fb: FormBuilder
				  ) {}
				   Songs: any = [];
				    ngOnInit() {
					        this.songForm = this.fb.group({

							            artist: [''],
								          title: [''],
									      });
					           this.fetchSongs();
						       let songRes = this.songService.getSongList();
						           songRes.snapshotChanges().subscribe((res) => {
								         this.Songs = [];
									       res.forEach((item) => {
										               let a: any = item.payload.toJSON();
											               a['$key'] = item.key;
												               this.Songs.push(a as Song);
													             });
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
																						     deleteSong(id: any) {
																							         console.log(id);
																								     if (window.confirm('Do you really want to delete?')) {
																									           this.songService.deleteSong(id);
																										       }
																										         }

										  formSubmit() {
											      if (!this.songForm.valid) {
												            return false;
													        } else {
															      return this.songService
															              .createSong(this.songForm.value)
																              .then((res) => {
																		                console.log(res);
																				          this.songForm.reset();
																					            this.router.navigate(['/home']);
																						            })
																							            .catch((error) => console.log(error));
																								        }
																									  }
}
