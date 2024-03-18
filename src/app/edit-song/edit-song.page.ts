import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SongService } from './../shared/song.service';
@Component({
	  selector: 'app-edit-song',
	    templateUrl: './edit-song.page.html',
	      styleUrls: ['./edit-song.page.scss'],
})
export class EditSongPage implements OnInit {
	  updateSongForm: FormGroup;
	    id: any;
	      constructor(
		          private songService: SongService,
			      private actRoute: ActivatedRoute,
			          private router: Router,
				      public fb: FormBuilder
				        ) {
						    this.id = this.actRoute.snapshot.paramMap.get('id');
						        this.songService.getSong(this.id).valueChanges().subscribe(res => {
								      this.updateSongForm.setValue(res);
								          });
									    }
									      ngOnInit() {
										          this.updateSongForm = this.fb.group({
													      artist: [''],
													            title: ['']
														        })
															    console.log(this.updateSongForm.value)
															      }
															        updateForm() {
																	    this.songService.updateSong(this.id, this.updateSongForm.value)
																	          .then(() => {
																			          this.router.navigate(['/tabs/song']);
																				        })
																					      .catch(error => console.log(error));
																					        }
}
