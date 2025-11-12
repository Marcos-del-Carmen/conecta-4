import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/Player.interface';
import Swal from 'sweetalert2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mesa-conecta-cuatro',
  standalone: true,
  imports: [NgbTooltipModule,NgbProgressbarModule],
  templateUrl: './mesa-conecta-cuatro.component.html',
  styleUrl: './mesa-conecta-cuatro.component.css'
})
export class MesaConectaCuatroComponent implements OnInit {
  public turno: boolean = false; 
  public celdas: number[][] = []; 
  public ganador: string = '';
  public player1: Player;
  public player2: Player;
  public ganadas: number;
  public tiempo: number;
  public pausa: boolean;

  public TIEMPO_FIJO: number = 100;

  async ngOnInit() {
    this.start(1);
  }

  constructor() {  
    this.celdas  = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.turno = false;
    this.ganador = '';
    this.ganadas = 0;
    this.player1 = {
      nombre: '' ,
      ganadas: 0,
      tag: 'Jugador 1'
    };
    this.player2 = {
      nombre: '' ,
      ganadas: 0,
      tag: 'Jugador 2'
    };
    this.tiempo = this.TIEMPO_FIJO;
    this.pausa = false;
  }

  resetAll() {
    this.celdas  = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.ganador = '';
    this.player1 = {
      nombre: '',
      ganadas: 0,
      tag: 'Jugador 1'
    };

    this.player2 = {
      nombre: '',
      ganadas: 0,
      tag: 'Player 2'
    };
    this.turno = false;
    this.tiempo = this.TIEMPO_FIJO;
  }

  resetValues() {
    this.celdas  = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.ganador = '';    
    if(this.ganadas % 2 == 0) {
      this.turno = false;
    } else {
      this.turno = true;
    }
    this.tiempo = this.TIEMPO_FIJO;
  }

  numeroCelda(fila: number, columna: number): void {
    this.tiempo = this.TIEMPO_FIJO; // restablecer el tiempo
   
    if (this.ganador == 'Jugador 1' || this.ganador == 'Jugador 2') {
      this.jugarOtraVez();
      return;
    }
    for (let i = 5; 0 <= i; i--) {
      if (this.celdas[i][columna] == 0 && this.turno == false) {
        this.celdas[i][columna] = 1;
        this.turno = true;
        this.compararDirecciones(i, columna, 1);
        break;
      }

      if (this.celdas[i][columna] == 0 && this.turno == true) {
        this.celdas[i][columna] = 2;
        this.turno = false;
        this.compararDirecciones(i, columna, 2);
        break;
      }
    }
    this.celdas = [...this.celdas]; // fuerza actualización
  
  }
  
  compararDirecciones(fila: number, columna:number, numJugador: number) {
    if(this.celdas[fila][columna] == numJugador) {
      // derecha
      if(this.estaEnRango(fila, columna+1) &&this.celdas[fila][columna+1] == numJugador){
        if (this.estaEnRango(fila, columna+2) &&this.celdas[fila][columna+2] == numJugador) {
          if (this.estaEnRango(fila, columna+3) &&this.celdas[fila][columna+3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
  
      // izquierda
      if(this.estaEnRango(fila-1, columna) && this.celdas[fila][columna-1] == numJugador){
        if (this.estaEnRango(fila-2, columna) && this.celdas[fila][columna-2] == numJugador) {
          if (this.estaEnRango(fila-3, columna) && this.celdas[fila][columna-3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
  
      // arriba
      if(this.estaEnRango(fila-1, columna) && this.celdas[fila-1][columna] == numJugador){
        if (this.estaEnRango(fila-2, columna) && this.celdas[fila-2][columna] == numJugador) {
          if (this.estaEnRango(fila-3, columna) && this.celdas[fila-3][columna] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
  
      // abajo
      if(this.estaEnRango(fila+1, columna) && this.celdas[fila+1][columna] == numJugador){
        if (this.estaEnRango(fila+2, columna) && this.celdas[fila+2][columna] == numJugador) {
          if (this.estaEnRango(fila+3, columna) && this.celdas[fila+3][columna] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
      
      // arriba izquierda
      if(this.estaEnRango(fila-1, columna-1) && this.celdas[fila-1][columna-1] == numJugador){
        if (this.estaEnRango(fila-2, columna-2) && this.celdas[fila-2][columna-2] == numJugador) {
          if (this.estaEnRango(fila-3, columna-3) && this.celdas[fila-3][columna-3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
  
      // arriba derecha
      if(this.estaEnRango(fila-1, columna+1) && this.celdas[fila-1][columna+1] == numJugador){
        if (this.estaEnRango(fila-2, columna+2) && this.celdas[fila-2][columna+2] == numJugador) {
          if (this.estaEnRango(fila-3, columna+3) && this.celdas[fila-3][columna+3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
  
      // abajo izquieda  
      if(this.estaEnRango(fila+1, columna-1) && this.celdas[fila+1][columna-1] == numJugador){
        if (this.estaEnRango(fila+2, columna-2) && this.celdas[fila+2][columna-2] == numJugador) {
          if (this.estaEnRango(fila+3, columna-3) && this.celdas[fila+3][columna-3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
      
      // abajo derecha
      if(this.estaEnRango(fila+1, columna+1) && this.celdas[fila+1][columna+1] == numJugador){
        if (this.estaEnRango(fila+2, columna+2) && this.celdas[fila+2][columna+2] == numJugador) {
          if (this.estaEnRango(fila+3, columna+3) && this.celdas[fila+3][columna+3] == numJugador) {
            this.contadorGanador();
            return;
          }
        }
      }
    }
  }

  estaEnRango(fila: number, columna: number): boolean {
    return (fila >= 0 && fila < this.celdas.length && columna >= 0 && columna < this.celdas[0].length);
  }

  contadorGanador () {
    this.ganador = this.turno ? 'Jugador 1' : 'Jugador 2';
    if (this.turno) { // cuando gana el player 1
      this.player1.ganadas += 1;
    } else if (!this.turno) { // cuando gana el player 2
      this.player2.ganadas += 1;
    }
    this.ganadas += 1;
    this.jugarOtraVez();
  }

  jugarOtraVez() {
    this.pausa = true;
    Swal.fire({
      title: `🎉 ${this.ganador} ha ganado!`,
      text: '¡Vamos por otra!',
      showDenyButton: true,
      confirmButtonText: "Si, a darle",
      denyButtonText: `No, reinicar`,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetValues();
        this.pausa = false;
      } else if (result.isDenied) { // puede que lo cambie
        this.resetAll();
        this.start(2);
      }
    });
  }

  tiempoDeTurno() {
    const intervalo = setInterval(() => {
      if(!this.pausa) {
        if (this.tiempo <= 0) {
          this.contadorGanador();
          clearInterval(intervalo);
        }
        this.tiempo--;
      }
    }, 1000);
  }

  start(number: number) {
    this.pausa = true;
    let contHtml = number ==1 ? `
        <b>Jugador 1</b> vs <b>Jugador 2</b><br>
        ¡Que gane el mejor! 🏆
      ` :
      `
        <b>Jugador 1</b> vs <b>Jugador 2</b><br>
        ¿Quieren jugador de nuevo? 🏆
      `;

    Swal.fire({
      html: contHtml,
      confirmButtonText: 'Comenzar',
      background: '#000731',
      color: '#fff',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed) {
        this.tiempoDeTurno();
        this.pausa = false;
      }
    });
  }

  resetGame() {
    this.pausa = true;
    Swal.fire({
      title: `¿Estan seguros de terminar la partida?`,
      showDenyButton: true,
      confirmButtonText: "Si, ya hay ganador",
      denyButtonText: `No, me equivoque`
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetAll();
        this.start(2);
      } else {
        this.pausa = false;
      }
    });
  }
}
