import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.css']
})
export class SectionAComponent implements OnInit {

  Form1:FormGroup;

  f1 = [];

  constructor(private router:Router,private http:HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.Form1 = new FormGroup({
        'id':new FormControl(null),
        'nameandAddress': new FormControl(null),
        'regdNo':new FormControl(null),
        'patientname': new FormControl(null),
        'age': new FormControl(null),
        'childrenGroup':new FormGroup({
          'noOfChildren':new FormControl(null),
          'livingSons':new FormControl(null),
          'livingDaughters': new FormControl(null),
        }),
        'otherName':new FormControl(null),
        'postalAddress':new FormControl(null),
        'referral':new FormGroup({
          'referredBy':new FormControl(null),
          'selfReferral':new FormControl(null),
        }),
        'lastDate':new FormControl(null),
      })
  }

  onClickReset(){
    this.Form1.reset();
  }



  onAdd(){

    if (this.Form1.valid){
      confirm("Submitted Successfully!");
      console.log(this.Form1.value);
      this.http.post("https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionA.json", this.Form1.value).subscribe(response => {
        console.log(response)
        this.Form1.reset()
        this.router.navigate(["../", 'sectionB'],{relativeTo:this.activatedRoute})

      })

    }
    else{
     confirm("Please enter the required fields!");
     console.log(this.Form1.value);
    }
  }

}
