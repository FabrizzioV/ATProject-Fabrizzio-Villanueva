import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  animations:[]
})
export class AppComponent {
  title = 'atpfrontend';
}
