import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  formGroup! : FormGroup;
  result:any;
  modelsList:any;
  error :any;
  models:Array<any>=[
    {type:"text-completion",model:"text-davinci-003",endpoint:"https://api.openai.com/v1/completions"},
    {type:"chat",model:"gpt-3.5-turbo-0301",endpoint:"https://api.openai.com/v1/chat/completions"},
  ];
  currentModel:any;
  constructor(private fb:FormBuilder, private http:HttpClient) {
  }
  ngOnInit() {
    this.currentModel=this.models[0];
    this.formGroup=this.fb.group({
      query :this.fb.control("")
    });
    //this.getModels();
  }

  getModels(){
    this.http.get("https://api.openai.com/v1/models")
      .subscribe({
        next :(data)=>{
          this.modelsList=data;
        },
        error : (err)=>{
          console.log(err);
        }
      })
  }

  handleGPT() {
    let httpHeaders=new HttpHeaders()
      //.set("Authorization","YOU KEY")
      .set("Authorization","Bearer YOUR KEY")
    let payload={};
    if(this.currentModel.model==="gpt-3.5-turbo-0301"){
      payload={
        model:this.currentModel.model,
        messages:[
          {
            role:"user",
            content:this.formGroup.value.query
          }
        ]
      }
    }
    else if(this.currentModel.model==="text-davinci-003") {
      payload = {
        model: this.currentModel.model,
        prompt: this.formGroup.value.query,
        n:3
      }
    }
    this.http.post(this.currentModel.endpoint,payload,
      {headers:httpHeaders}).subscribe({
      next :(data)=>{
        this.result=data;
      },
      error : (err)=>{
        this.error=err;
      }
    })
  }

  setCurrentModel(m: any) {
    this.currentModel=m;
  }
}
