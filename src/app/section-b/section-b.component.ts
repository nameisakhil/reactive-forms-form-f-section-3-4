import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, FormArray} from '@angular/forms'
import {Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-section-b',
  templateUrl: './section-b.component.html',
  styleUrls: ['./section-b.component.css']
})
export class SectionBComponent implements OnInit {

  form2:FormGroup;

  checkboxList = [
      'To diagnose intra-uterine and or ectopic pregnancy and confirm viability',
        'Estimation of gestational age (dating)',
        'Vaginal bleeding OR leaking',
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure',
        'Follow-up of cases of abortion',
        'Assessment of cervical canal and diameter of internal os',
        'Discrepancy between uterine size and period of amenorrhea',
        'Any suspected adenexal or uterine pathology OR abnormality',
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up',
        'To evaluate fetal presentation and position',
        'Assessment of liquor amnii',
        'Preterm labor OR preterm premature rupture of membranes',
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc',
        'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot',
        'Evaluation of previous Caesarean Section scars',
        'Evaluation of fetal growth parameters, fetal weight and fetal well being',
        'Color flow mapping and duplex Doppler studies',
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up',
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc',
        'Observation of intra-partum events',
        'Medical or surgical conditions complicating pregnancy',
        'Research OR scientific studies in recognized institutions',
  ];
  activeCheckList=[];

  constructor(private fb:FormBuilder, private http:HttpClient, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.form2 = new FormGroup({
      'docter_name': new FormControl(null),
      'indications':new FormControl(null),
    })*/


    this.form2 = new FormGroup({
      'docter_name': new FormControl(null,Validators.required),
      'indications':new FormControl(null),
      'checkBoxs':new FormGroup({
        'To diagnose intra-uterine and or ectopic pregnancy and confirm viability':new FormControl(false),
        'Estimation of gestational age (dating)':new FormControl(false),
        'Vaginal bleeding OR leaking':new FormControl(false),
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure':new FormControl(false),
        'Follow-up of cases of abortion':new FormControl(false),
        'Assessment of cervical canal and diameter of internal os':new FormControl(false),
        'Discrepancy between uterine size and period of amenorrhea':new FormControl(false),
        'Any suspected adenexal or uterine pathology OR abnormality':new FormControl(false),
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up':new FormControl(false),
        'To evaluate fetal presentation and position':new FormControl(false),
        'Assessment of liquor amnii':new FormControl(false),
        'Preterm labor OR preterm premature rupture of membranes':new FormControl(false),
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc':new FormControl(false),
        'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot':new FormControl(false),
        'Evaluation of previous Caesarean Section scars':new FormControl(false),
        'Evaluation of fetal growth parameters, fetal weight and fetal well being':new FormControl(false),
        'Color flow mapping and duplex Doppler studies':new FormControl(false),
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up':new FormControl(false),
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc':new FormControl(false),
        'Observation of intra-partum events':new FormControl(false),
        'Medical or surgical conditions complicating pregnancy':new FormControl(false),
        'Research OR scientific studies in recognized institutions':new FormControl(false),
      }),
      'procedure':new FormControl(null),
      'otherProcedure':new FormArray([]),
      'dateOfDeclaration':new FormControl(null),
      'dateOfProcedure':new FormControl(null),
      'resultOfProcedure':new FormControl(null),
      'resultConveyedTo':new FormControl(null),
      'resultConveyedOn':new FormControl(null),
      'indication':new FormControl(null),
      'date':new FormControl(null),
      'place': new FormControl(null)
    })
  }


  onAdd(){
    if (this.form2.valid){
      confirm("Submitted Successfully!");

      // const latsetId = localStorage.getItem('id');
      // const stringifiedValue = JSON.stringify(this.form2.value)
      console.log(this.form2.value);

      this.http.post("https://reactiveformsfirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/sectionB.json", this.form2.value).subscribe(response => {
        console.log(response)
        this.form2.reset()
        this.router.navigate(["../", 'sectionC'],{relativeTo:this.activatedRoute})

      })

    }
    else{
      confirm("Please enter the required fields!");
    }
  }

  onClickultrasound(){
    (<FormArray>this.form2.get('otherProcedure')).removeAt(0)
  }

  onClickBtn(){
    const control = new FormControl(null);
    (<FormArray>this.form2.get('otherProcedure')).push(control);
  }

  getControls() {
    return (<FormArray>this.form2.get('otherProcedure')).controls;
  }

  onClickReset(){
    this.form2.reset();
  }

  onclickCheckBox(event:any){
    console.log(event.checkbox)
    const value = event.checkbox;
   const index = this.activeCheckList.indexOf(value);
   console.log(index)
    if (this.activeCheckList.includes(value)){
      this.activeCheckList.splice(index,1);
    }else{
      this.activeCheckList.push(value)
    }
    console.log(this.activeCheckList)
  }
}
