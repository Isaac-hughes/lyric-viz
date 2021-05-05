import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }


   getRequest(artist: string, song: string){
    let songData: any;
     this.http.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).subscribe({
      next: data => {
        songData = data
    },
    error: error => {
        console.error('There was an error!', error);
        songData = error
    }
    })
     
    
    return songData
  }

}
