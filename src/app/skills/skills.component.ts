import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-skills',
  imports: [CarouselModule, CommonModule, MatCardModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  public customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 200,
    autoplay: true,                            
    animateIn: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 2
      },
      550: {
        items: 3
      },
      800: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  }
}
