import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/interfaces/notes';

@Component({
  selector: 'app-notedetail',
  templateUrl: './notedetail.page.html',
  styleUrls: ['./notedetail.page.scss'],
})


export class NotedetailPage implements OnInit {

  public note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController, private toast : ToastController) { 
    //initialize a placeholder note hanggat maload ang actual note
    this.note = {
      id: '',
      title:'',
      content: ''
    };
  }

  ngOnInit() {

    //get id from url
    let noteID = this.route.snapshot.paramMap.get('id');

    //check if the data is loaded before getting the note
    //handles the case where the notedetail page is loaded directly via url
    if (this.notesService.loaded){
      this.note = this.notesService.getNote(noteID)
    } else{
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteID)
      });
    }
  }

  ionViewDidLeave(){
    this.showToast("Note Saved!");
  }

  noteChanged(){
    this.notesService.save();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack('/notes');
  }
  

  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
