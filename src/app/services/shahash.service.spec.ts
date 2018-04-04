import { TestBed, inject } from '@angular/core/testing';

import { SHAHashService } from './shahash.service';

describe('SHAHashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SHAHashService]
    });
  });

  it('should be created', inject([SHAHashService], (service: SHAHashService) => {
    expect(service).toBeTruthy();
  }));
});
