import { Component } from '@angular/core';
import * as noUiSlider from 'nouislider';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  minValue: number = 30;
  maxValue: number = 30;

  ngAfterViewInit(): void {
    const slider = document.getElementById('slider') as noUiSlider.target;

    noUiSlider.create(slider, {
      start: [this.minValue, this.maxValue],
      connect: true,
      range: {
        min: 0,
        max: 1000
      },
      tooltips: [true, true],
      format: {
        to: (value) => Math.round(value).toString(),
        from: (value) => Number(value)
      }
    });
    setTimeout(() => {
      const handles = document.querySelectorAll('.noUi-handle');
      handles.forEach(handle => {
        (handle as HTMLElement).style.backgroundColor = 'black';
        (handle as HTMLElement).style.borderRadius = '50%';
        (handle as HTMLElement).style.width = '18px';
        (handle as HTMLElement).style.height = '18px';


      });
    }, 100);
    
    setTimeout(() => {
      const handles = document.querySelectorAll('.noUi-target');
      handles.forEach(handle => {
        (handle as HTMLElement).style.height = '4px';


      });
    }, 100);
  
    setTimeout(() => {
      const handles = document.querySelectorAll('.noUi-connect');
      handles.forEach(handle => {
        (handle as HTMLElement).style.backgroundColor = 'black';


      });
    }, 100);
  

    slider.noUiSlider?.on('update', (values: any[]) => {
      this.minValue = Number(values[0]);
      this.maxValue = Number(values[1]);
    });
  }

  updateSlider(): void {
    const slider = document.getElementById('slider') as noUiSlider.target;
    slider.noUiSlider?.set([this.minValue, this.maxValue]);
  }

  
}