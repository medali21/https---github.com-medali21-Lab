import { TestBed } from '@angular/core/testing';

import { nabilService } from './nabil.service';

describe('nabilService', () => {
  let service: nabilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(nabilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});