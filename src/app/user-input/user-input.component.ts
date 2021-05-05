import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCallService } from "../services/api-call.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  inputForm: FormGroup

  constructor(private useApi: ApiCallService, private http: HttpClient) {
    this.inputForm = new FormGroup({
      artist: new FormControl(''),
      song: new FormControl('')

    })
   }

  ngOnInit(): void {
  }

  data: any;
  lyricArray: any;
  charArray: any;

  lyricCharDataArray: any;



   btnClick() {
    let artist = this.inputForm.value.artist
    let song = this.inputForm.value.song
    // let data: any = await this.useApi.getRequest(artist, song) 
     this.fetchData(artist, song)
     
    
  }

  // async getRequest(artist: string, song: string){
  //   let songData: any;
  //    await this.http.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).subscribe({
  //     next: data => {
  //       this.data = data
  //   },
  //   error: error => {
  //       console.error('There was an error!', error);
  //       this.data = error
  //   }
  //   })
  //   console.log(this.data)
  // }

  fetchData(artist: string, song: string){
    const promise = this.http.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).toPromise();
    console.log(promise);  
    promise.then((data: any)=>{
      let lyricString = data.lyrics
      // this.lyricArray = lyricString.split(" ")
      let spaceless = lyricString.replace(/\s/g, '');
      let charArray = spaceless.split("")
      this.charArray = charArray.map((char: any) => char.toUpperCase());

      this.lyricCharDataArray = this.returnPair(this.charArray)

      console.log(this.lyricCharDataArray)

    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  returnPair(array: any[]){
    const result = array.reduce(
      (acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
    return result
  }

}
