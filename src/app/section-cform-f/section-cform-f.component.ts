import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
export interface Diagnosis{
  name: string,
  completed: boolean,
  diagnosisArray ?:Diagnosis[]

}

@Component({
  selector: 'app-section-cform-f',
  templateUrl: './section-cform-f.component.html',
  styleUrls: ['./section-cform-f.component.css']
})
export class SectionCFormFComponent implements OnInit {

  sectionC:FormGroup


  allComplete: boolean = false
  constructor(private router:Router,private http:HttpClient, private actvivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.sectionC = new FormGroup({
      'doctorName': new FormControl(null),
      'geneticHistory':new FormControl(null),
      'diagnosisProcedureIndications': new FormGroup({

        'chromosomalDisorders': new FormControl(null),
        'metabolicDisorders': new FormControl(null),
        'congenitalAnomaly': new FormControl(null),
        'mentalDisability': new FormControl(null),
        'Haemoglobinopathy': new FormControl(null),
        'sexLinkedDisorders': new FormControl(null),
        'singleGeneDisorder': new FormControl(null),
        'previousChildOrChildrenWithOthersDetail': new FormControl(null),
        'advancedMaternalAge': new FormControl(null),

        'mother': new FormControl(null),
        'father': new FormControl(null),
        'sibling': new FormControl(null),

        'preImplantationGenderDiagnosis': new FormControl(null),

        'diagnosisProcedureIndicationsOthersDetail': new FormControl(null)


      }),
      'pregnantWomanConsentDate': new FormControl(null),
      'invasiveProcedures': new FormGroup({
        'amniocentesis': new FormControl(null),
        'chorionicVilliAspiration': new FormControl(null),
        'fetalBiopsy': new FormControl(null),
        'Cordocentesis': new FormControl(null),

        'invasiveProceduresOthersDetail': new FormControl(null)

      }),
      'invasiveProcedureComplications': new FormControl(null),
      'recommendedAditionalTests': new FormGroup({
        'chromosomalStudies': new FormControl(null),
        'biochemicalStudies':new FormControl(null),
        'molecularStudies':new FormControl(null),
        'preImplantationGenderDiagnosis': new FormControl(null),

        'recommendedAditionalTestsOthersDetail': new FormControl(null)


      })

    })


  }

  onSubmit(){
    if (this.sectionC.valid){
      confirm("Submitted Successfully!");
      console.log(this.sectionC.value);
      this.http.post("https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionC.json", this.sectionC.value).subscribe(response => {
        console.log(response)
        this.sectionC.reset()
        this.router.navigate(["../", "sectionD"], {relativeTo: this.actvivatedRoute})
      })
    }
    else{
     confirm("Please enter the required fields!");
     console.log(this.sectionC.value);
    }
  }



  onClickReset(){
    this.sectionC.reset();
  }


}
