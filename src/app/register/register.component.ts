import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private regServ:RegisterService) { }

  ngOnInit() {
   
  }
  msg:string;
  onSubmit(v)
  {
    console.log(v);
    this.regServ.getRegister(v).subscribe(msg=>alert(JSON.stringify(msg)));
  }
}
