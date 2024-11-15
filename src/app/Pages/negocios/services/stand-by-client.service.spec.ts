import { TestBed } from '@angular/core/testing';

import { StandByClientService } from './stand-by-client.service';

describe('StandByClientService', () => {
  let service: StandByClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandByClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
