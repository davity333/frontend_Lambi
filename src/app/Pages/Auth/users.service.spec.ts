import { TestBed } from '@angular/core/testing';

import { createSellerUsersService } from './users.service';

describe('UsersService', () => {
  let service: createSellerUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(createSellerUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
