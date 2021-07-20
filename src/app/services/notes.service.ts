import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Note } from "../interfaces/notes";

@Injectable({
    providedIn: 'root'
})

export class NotesService{
    
    public notes: Note[] = []
    public loaded: boolean = false;

    constructor(private storage: Storage){
        this.init()
    }
    
    load(): Promise<boolean>{
        //returns a promise para malaman if completed na operation
        return new Promise((resolve) => {
            //get notes na naka save sa storage
            this.storage.get('notes').then((notes)=>{
                //only set this.notes to the returned value kung may naka store na value
                if (notes != null){
                    this.notes = notes;
                }

                this.loaded = true;
                resolve(true);
            });
        });
    }

    save(): void {
        //save the current array of notes to storage
        this.storage.set('notes', this.notes);
    }
    
    getNote(id): Note{
        //Return the note that has the same id matching the id passed in
        return this.notes.find(note=>note.id==id);
    }

    createNote(title): void{
        //Create a unique id that is one larger than the largest id
        let id = Math.max(...this.notes.map(note => parseInt(note.id)),0) + 1;

        this.notes.push({
            id: id.toString(),
            title: title,
            content:''
        });

        this.save();
    }

    deleteNote(note):void{
        //get the index in the array of the note that was passed in
        let index = this.notes.indexOf(note);

        //delete that element of the array and resave the data
        if (index > -1){
            this.notes.splice(index, 1);
            this.save();
        }
    }

    async init(){
        await this.storage.create()
    }
} 

