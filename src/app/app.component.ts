import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MesaConectaCuatroComponent } from './components/mesa-conecta-cuatro/mesa-conecta-cuatro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MesaConectaCuatroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'conecta-4';
}
