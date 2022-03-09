import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-section-dform-f',
  templateUrl: './section-dform-f.component.html',
  styleUrls: ['./section-dform-f.component.css']
})
export class SectionDformFComponent implements OnInit {

  genders: gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'others', viewValue: 'Others'},
  ];
  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  sectionD: FormGroup;
  constructor(private router: Router,private http:HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sectionD = new FormGroup({
      'name':new FormControl(null),
      'diagnosis':new FormControl(null),
      'nameField':new FormControl(null),
      'date1': new FormControl(null),
      'nameField3':new FormControl(null),
      'age': new FormControl(null),
      'gender': new FormControl(null),
      'relationship': new FormControl(null),
      'contactNumber':new FormControl(null,Validators.compose([Validators.minLength(10),
      Validators.maxLength(10),Validators.required])),
      'date2': new FormControl(null),
      'date3': new FormControl(null),
      'nameField4': new FormControl(null),
      'nameField5': new FormControl(null),
      'date4': new FormControl(null)
    })
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }
  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

  onSubmit(){
    if (this.sectionD.valid){
      confirm("Submitted Successfully!");
      console.log(this.sectionD.value);
      this.http.post("https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionD.json",
      this.sectionD.value
      ).subscribe(response => {
        console.log(response)
        this.sectionD.reset()
        this.router.navigate(["../", "home"],{relativeTo: this.activatedRoute})
      })
    }
    else{
     confirm("Please enter the required fields!");
     console.log(this.sectionD.value);
    }
  }

  onClickReset(){
    this.sectionD.reset();
  }


}
