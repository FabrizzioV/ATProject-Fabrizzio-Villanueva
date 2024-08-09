import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImportsModule } from '../imports/imports';

@Component({
  selector: 'app-seat-selector',
  standalone: true,
  imports: [CommonModule, ImportsModule],
  templateUrl: './seat-selector.component.html',
  styleUrl: './seat-selector.component.sass'
})
export class SeatSelectorComponent {
  public isSelected: boolean = false;
  @Input() id!: string;

  @Output() seatEvent = new EventEmitter<string>();

  selectedSeat!: any;

  @Input() selected!:any;

  ngOnChanges(){
    if(this.selected!=null){
      let el = document.getElementsByName("seat");
      this.changeSeat(this.selected,el);
    }
  }

  public handleClick($event: MouseEvent): void {

    let id = ($event.target as HTMLInputElement).id
    let el = document.getElementsByName("seat");
     
    this.changeSeat(id,el);
  }

  changeSeat(id:any,el:any){
    if(id==this.selectedSeat){
      this.selectedSeat=null;
      for (let index = 0; index < el.length; index++) {
        el[index].removeAttribute("disabled");
      }
    }else
    if(!this.selectedSeat || this.selectedSeat==undefined){
      this.selectedSeat = id;      
      for (let index = 0; index < el.length; index++) {
        el[index].setAttribute("disabled","true");
      }
      document.getElementById(this.selectedSeat)?.removeAttribute("disabled")
      document.getElementById(this.selectedSeat)?.setAttribute("checked","true")
    }
  
  }

  sendSeat(value:string){
    this.seatEvent.emit(value);
  }
}
