import { TestBed } from '@angular/core/testing';

import { FlightTicketService } from './flight-ticket.service';

describe('FlightTicketService', () => {
  let service: FlightTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
