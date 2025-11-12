import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'mesa-conecta-cuatro',
        loadComponent: () => import('./components/mesa-conecta-cuatro/mesa-conecta-cuatro.component').then(m => m.MesaConectaCuatroComponent)
    }
];
