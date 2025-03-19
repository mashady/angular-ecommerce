import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CounterServiceService} from "../../services/counter.service";
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  username: string = '';
  counter:number=0;
  constructor(private AuthService: AuthService,private counterService :CounterServiceService) {}
  ngOnInit(): void {
    this.AuthService.userData.subscribe((user) => {
      this.username = user.email.split('@')[0];
      console.log(user);
    });

    this.counterService.getCounter().subscribe((response)=>{
      this.counter=response;
    });

  }
}

// todo => handle display username in the navbar
