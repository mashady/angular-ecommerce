import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Location, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-ecommerce';
  currentLayout: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    location: Location
  ) {}

  ngOnInit() {
    console.log(location.pathname.startsWith('/admin'));
    //this.currentLayout = location.pathname.startsWith('/admin');
    if(location.pathname.startsWith('/admin')){
      this.currentLayout = true;
      console.log('admin');
    }else{
      this.currentLayout = false;
      console.log('not admin');
    }

  }
}
