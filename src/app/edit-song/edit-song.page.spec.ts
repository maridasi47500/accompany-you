import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSongPage } from './edit-song.page';

describe('EditSongPage', () => {
  let component: EditSongPage;
  let fixture: ComponentFixture<EditSongPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
