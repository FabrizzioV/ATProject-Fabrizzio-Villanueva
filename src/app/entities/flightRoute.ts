import { Time } from "@angular/common";

export class FlightRoute {
    flightRouteId!: number;
    flightRouteCode!: string;
    boardingTime!: string;
    flightTime!: Date;
    originLocation!: number;
    originName!: string;
    finalLocation!:number;
    finalName!: string;
    planeId!:number;
    airlineId!:number;
    gateId!:string;
    gateName!: string;
    flightDate!:Date;
    price!: number;
  }