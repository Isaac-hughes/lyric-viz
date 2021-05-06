import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCallService } from "../services/api-call.service";
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  single: any;
  words: any;

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

  lyricCharDataArray: any = [];
  lyricDataArray: any = [];



   btnClick() {
    let artist = this.inputForm.value.artist
    let song = this.inputForm.value.song
     this.fetchData(artist, song)
     
    
  }


  fetchData(artist: string, song: string){
    const promise = this.http.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).toPromise();
    console.log(promise);  
    promise.then((data: any)=>{
      let lyricString = data.lyrics
      lyricString = lyricString.replace(/(\r\n|\n|\r)/gm," ")
      lyricString = lyricString.replace(/\s\s+/g, ' ')
      console.log(lyricString)
      this.lyricArray = lyricString.split(" ")
      let spaceless = lyricString.replace(/\s/g, '');
      let charArray = spaceless.split("")
      this.charArray = charArray.map((char: any) => char.toUpperCase());

      let returnPairDataChar = this.returnPair(this.charArray)
      let returnPairDataWord = this.returnPair(this.lyricArray)


      
      for (const property in returnPairDataChar) { 
        let newData: any = {};
        newData.name = property
        newData.value = returnPairDataChar[property]
        this.lyricCharDataArray.push(newData);
      }

      for (const property in returnPairDataWord) { 
        let newData: any = {};
        newData.name = property
        newData.value = returnPairDataWord[property]
        this.lyricDataArray.push(newData);
      }


      this.single = this.lyricCharDataArray
      this.words = this.lyricDataArray
      console.log(this.lyricCharDataArray)

    }).catch((error)=>{
      console.log("Promise rejected with " + error);
    });
  }

  returnPair(array: any[]){
    const result = array.reduce(
      (acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
    return result
  }



  // chart settings
  view: any = [1000, 600];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  

  onSelect(event: any) {
    console.log(event);
  }

  labelFormatting(c: any) {
    return `${(c.label)}`;
  }


}
