import { Component, DoBootstrap, OnInit } from '@angular/core';
import { Biodata } from './Biodata';
import { Personal } from './Personal';
import { Business } from './Business';
import { AllObjs } from './AllObjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css']
})
export class RegistrationComponent implements OnInit{
  
  public cstate: string = "--Select State--";
  public clga: string = "--Select Lga--";

  public showit: string;
  public pop_title: string;
  public pop_message: string;

  public showhide: boolean;    

  imageurl = "https://via.placeholder.com/150/";
  signurl = "https://via.placeholder.com/150/";     
  ls: any = [];
  file_name: boolean = false;
  pic_name: boolean = false;


  public biodata = new Biodata('', '', NaN, NaN, '', '', '');
  public personal = new Personal('','','','');
  public business = new Business('','','','');    
  public senddata = new AllObjs({},{},'',{});
  public bsc:string = "";
  public emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public phonepattern = "[0-9]{10}";

  constructor(private http: HttpClient, private readonly router: Router){
    
    this.showit = "modal fade";
    this.pop_message = "";
    this.pop_title = "";
    this.showhide = false;           
  }


    
  ngOnInit(): void {

    //this.showhide = false;
  }

  public map = new Map<string, string[]>([
    ['Lagos', ["eti-osa","alimosho","ikorodu" ]],
    ['Ogun', ["ifo","ipokia","ijebu-ode"]],
    ['Abuja', ["kuje","abaji","kwali"]]
  ])

  get cstates(): string[] {
    return Array.from(this.map.keys());
  }

  get clgas(): string[] | undefined {
    this.biodata.state_origin = this.cstate;
    return this.map.get(this.cstate);
  }  
  
    onFileChanged(e: any) {    
        if(!e.target.files || e.target.files[0].size == 0 || NaN){
          return;
        }
        
        if(e.target.files[0].size > 1000000){
          this.showPrompt("Image too large","Image is larger than 1mb, kindly resize/compress image below 1mb");
          return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);        
        reader.onload=(event:any) =>{
            this.personal.selfie_file = e.target.files[0].name
            this.imageurl = event.target.result;                        
            this.personal.selfie_data = event.target.result.toString().split(',')[1]
            this.pic_name = true;
          }
        }
        
    showPrompt(title:string, msg:string){
      this.pop_title = title;
      this.pop_message = msg;
      this.showit = "modal show"; 
    }

    onSignChanged(e: any) {
          if(!e.target.files || e.target.files[0].size == 0 || NaN){
            return;
          }
          if(e.target.files[0].size > 1000000){
              this.showPrompt("Image too large","Image is larger than 1mb, kindly resize/compress image below 1mb");
              return;
          }
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);        
          reader.onload=(event:any) =>{
              this.personal.sign_file = e.target.files[0].name
              this.signurl = event.target.result;            
              this.personal.sign_data = event.target.result.toString().split(',')[1]
              this.file_name = true;
          }  
  }

  closePop(){
    this.showit = "modal fade";
  }
 
  changeAge(cage: any) {
    if(cage.target.value < 18){
      this.showPrompt("Underaged","Only customer of age 18 and above can be onboarded")      
    }
  }

  
  
  

onSubmit() {
  this.bsc = this.showhide ? "checked" : "unchecked";
  this.senddata.biodata = this.biodata;
  this.senddata.bschecked = this.bsc;    
  this.senddata.business = this.business;
  this.senddata.personal = this.personal;
  console.log(this.senddata)

  this.http.post('http://localhost:54305/api/bio/', this.senddata)
  .subscribe((data:any) => {
    if(data == "Record Saved Succefully"){
      console.log(data)
      this.router.navigateByUrl('/dashboard')
    }else{
      this.showit = "modal show"                      
      this.pop_message = "Something went wrong, kindly try again";
      this.pop_title = "Oops!";    
    }
  });            
  } 
}


//!registerForm.form.valid ||