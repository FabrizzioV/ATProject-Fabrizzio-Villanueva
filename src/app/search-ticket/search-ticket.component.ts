import { Component } from '@angular/core';
import { ImportsModule } from '../imports/imports';
import { FlightTicketService } from '../services/flightTicket/flight-ticket.service';
import { FlightTicket } from '../entities/flightTicket';

@Component({
  selector: 'app-search-ticket',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './search-ticket.component.html',
  styleUrl: './search-ticket.component.sass'
})
export class SearchTicketComponent {

  flightTicket?: FlightTicket | null;

  loading:boolean = false;

  id!:number;

  constructor (
    private flightTicketService: FlightTicketService,
  ){}

  ngOnInit() {
  }

  getTicket(id:number){
    if(id){
      this.flightTicket=null;
      this.flightTicketService.getFlightTicket(id).subscribe((res) => {
        this.loading=true;
        if(res.length>0){
          this.flightTicket = res[0];
          let time=this.flightTicket.boardingtime.split(":");
          this.flightTicket.flightdate= new Date(this.flightTicket.flightdate)
          this.flightTicket.flightTime= new Date()
          this.flightTicket.flightTime.setHours(+time[0]);
          this.flightTicket.flightTime.setMinutes(+time[1]);
          this.flightTicket.flightdate.setHours(+time[0]);
          this.flightTicket.flightdate.setMinutes(+time[1]+30);
        }
        this.loading=false;
      });
    }
  }

  printContent(): void {
    let element: any = document.getElementById("printdiv");
    const iframe = document.body.appendChild(document.createElement("iframe"));

    iframe.style.display = "none";

    const idoc:any = iframe.contentDocument;
    idoc.head.innerHTML = document.head.innerHTML;
    idoc.body.innerHTML = element.innerHTML;

    window.setTimeout(() => {
      iframe.contentWindow?.print();
      
    }, 1000);
  }

}
