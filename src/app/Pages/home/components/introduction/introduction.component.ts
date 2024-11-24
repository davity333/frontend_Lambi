import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})

export class IntroductionComponent {

  form: FormGroup;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router){
    this.form = new FormGroup({
      search: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(this.form.value.search !== ''){
    localStorage.setItem('search', this.form.value.search);
    this.router.navigate(['/busqueda']);
    }
  }
}

