import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  getCharacters(){
    let desURL = 'http://localhost:8080/character/get';
    return this.http.post(desURL, {}, { headers: this.httpHeader });
  }

  addCharacter(characterInfo: any){
    let desURL = 'http://localhost:8080/character/new';
    return this.http.post(desURL, {characterInfo: characterInfo}, { headers: this.httpHeader });
  }

  updateCharacter(updateInfo: any){
    let desURL = 'http://localhost:8080/character/update';
    return this.http.post(desURL, {characterInfo: updateInfo}, { headers: this.httpHeader });
  }

  removeCharacter(id){
    let desURL = 'http://localhost:8080/character/remove';
    return this.http.post(desURL, {id: id}, { headers: this.httpHeader });
  }

}
