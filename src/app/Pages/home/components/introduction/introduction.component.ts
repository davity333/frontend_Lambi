import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { createSellerUsersService } from '../../../Auth/users.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})

export class IntroductionComponent implements OnInit {
  usersService = inject(createSellerUsersService);
  nombreUsuario:String | null = null;
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
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('userName')
}
}

