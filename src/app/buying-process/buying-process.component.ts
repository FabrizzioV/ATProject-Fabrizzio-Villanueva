import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FlightRouteService } from '../services/flightRoute/flight-route.service';
import { FlightRoute } from '../entities/flightRoute';
import { ImportsModule } from '../imports/imports';
import { SeatSelectorComponent } from '../seat-selector/seat-selector.component';
import { Ticket } from '../entities/ticket';
import { MessageService } from 'primeng/api';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../entities/user';
import { PaymentMethod } from '../entities/paymentMethod';
import { PaymentService } from '../services/payment/payment.service';
import { UserService } from '../services/user/user.service';
import { FlightTicketService } from '../services/flightTicket/flight-ticket.service';

@Component({
  selector: 'app-buying-process',
  standalone: true,
  imports: [ImportsModule, SeatSelectorComponent, UserFormComponent],
  templateUrl: './buying-process.component.html',
  styleUrl: './buying-process.component.sass',
  providers: [MessageService]
})
export class BuyingProcessComponent {

  flightData!: FlightRoute;
  flightId!:number;
  originName!:string;
  finalName!:string;
  planeId!:number;

  active:number=0;

  ticket:Ticket = new Ticket();

  user:User = new User();

  paymentMethods!: PaymentMethod[];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private flightRouteService: FlightRouteService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private userService: UserService,
    private flightTicketService: FlightTicketService
  )
  {}

  loading=true;
  selectedMethod!:any;

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.flightId=params['flightRoute'];
      this.originName=params['originName'];
      this.finalName=params['finalName'];
      this.planeId=params['planeId'];
      this.getFlight(this.flightId);
      this.getPaymentsMethod();
    });
  }

  getFlight(id:number){
    this.flightRouteService.getFlight(id).subscribe((res) => {
      this.flightData=res;
      this.flightData.flightDate= new Date(this.flightData.flightDate)
      this.flightData.flightTime= new Date()
      this.flightData.originName=this.originName;
      this.flightData.finalName=this.finalName;
      let time=this.flightData.boardingTime.split(":");
      this.flightData.flightTime.setHours(+time[0]);
      this.flightData.flightTime.setMinutes(+time[1]);
      this.flightData.flightDate.setHours(+time[0]);
      this.flightData.flightDate.setMinutes(+time[1]+30);
      this.ticket.flightRoute=this.flightData.flightRouteId;
      this.loading=false;
    });
  }

  sendSeat(event: any) {
    if(event!=undefined){
      this.ticket.seatId=event;
      this.active=1
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Por favor, escoja un asiento' });
    }
  }

  getUser(event: User){
    this.user=event;
    if(!this.user.validated){
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Por favor, ingrese sus datos' });
    }
    if(this.user.activeEvent==2 && this.user.validated){
      this.active=event.activeEvent;
    }else if(this.user.activeEvent==0){
      this.active=event.activeEvent;
    }
  }

  getPaymentsMethod(){
    this.paymentService.getPaymentMethods().subscribe((res) => {
      this.paymentMethods=res;
    });
  }

  visible: boolean = false;

  openPayment(){
    this.visible = true;
  }

  selectPayment(){
    this.ticket.userId=this.user.userId
    this.userService.getUser(this.ticket.userId).subscribe((res) => {
      if(res.length==0){
        this.userService.createUser(this.user).subscribe((res) => {
          this.ticket.userId=res[0].userId;
        });
      }
    });
    this.ticket.statusTicketId=1;
    this.createTicket();
  }

  createTicket(){
    this.flightTicketService.createFlightTicket(this.ticket,this.selectedMethod.paymentMethodId).subscribe((res) => {
      if(res.length>0){
        document.getElementById('pagoBtn')?.setAttribute("disabled","true")
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado su boleto' });
      }
    });
  }
}
