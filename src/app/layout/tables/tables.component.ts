import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import readXlsxFile from 'read-excel-file';

import { CharacterService } from '../../shared/services/character.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

    character_info = [
        {
            id: 1,
            name: "Igor",
            email: "igor@mail.com",
            sex: "male",
            address: "world"
        },
        {
            id: 2,
            name: "Catherine",
            email: "catherine@mail.com",
            sex: "female",
            address: "world"
        },
        {
            id: 3,
            name: "Artem",
            email: "artem@mail.com",
            sex: "male",
            address: "world"
        }
    ]
    character_process = [];
    editing_character = {
        id: -1,
        name: "",
        email: "",
        sex: "",
        address: ""
    };

    filesToUpload: Array<File> = [];

    constructor(
        private _characterService: CharacterService
    ) { }

    ngOnInit() {
        this._characterService.getCharacters().subscribe(response => {
            this.character_info = response['characters'];
            console.log(this.character_info);
            this.character_info.every((character) => {
                this.character_process.push({...character, status: 0});
                return true;
            })
        })
    }

    onAdd(){
        let newId: number;
        if(this.character_process.length == 0)
            newId = 1;
        else
            newId = this.character_process[this.character_process.length-1].id + 1;
        this.editing_character = {id: newId, name: "", email: "", sex: "", address: ""};
        this.character_process.push({...this.editing_character, status: 2});
        //add id: newId, rest is blank
        this._characterService.addCharacter(this.editing_character).subscribe();
    }

    onEdit(i){
        this.character_process.every((character) => {
            character.status = 0;
            return true;
        });
        this.character_process.every((character, index) => {
            if(character.id == i)
            {
                this.editing_character = {...character};
                this.character_process[index].status = 1;
                return false;
            }
            return true;
        });
    }
    
    onRemove(i){
        this.character_process.every((character, index) => {
            if(character.id == i)
            {
                this.character_process.splice(index, 1);
                //remove this service id: i
                this._characterService.removeCharacter(i).subscribe();
                return false;
            }
            return true;
        });
    }

    onFinishEditing(i){
        //change through service id: i data: editing_character
        this._characterService.updateCharacter(this.editing_character).subscribe();
        //in the response ##
        this.character_process.every((character, index) => {
            if(character.id == i){
                this.character_process[index].status = 0;
                this.character_process[index].name = this.editing_character.name;
                this.character_process[index].email = this.editing_character.email;
                this.character_process[index].sex = this.editing_character.sex;
                this.character_process[index].address = this.editing_character.address;
                return false;
            }
            return true;
        });
        this.editing_character = {id: -1, name: "", email: "", sex: "", address: ""};
    }

    onRevert(i){
        this.character_process.every((character) => {
            character.status = 0;
            return true;
        });
        this.editing_character = {id: -1, name: "", email: "", sex: "", address: ""};
    }

    readXLS(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        let newId: number;
        if(this.character_process.length == 0)
            newId = 0;
        else
            newId = this.character_process[this.character_process.length-1].id;
        readXlsxFile(this.filesToUpload[0]).then((rows) => {
            rows.every((row, index) => {
                newId++;
                this.character_process.push({id: newId, name: row[0], email: row[1], sex: row[2], address: row[3], status: 0});
                //add through service
                this._characterService.addCharacter({id: newId, name: row[0], email: row[1], sex: row[2], address: row[3]}).subscribe();
                return true;
            })
        })
    }

}
