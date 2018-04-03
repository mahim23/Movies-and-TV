import { TestBed, inject } from '@angular/core/testing';

import { MoviesAppApiService } from './movies-app-api.service';

describe('MoviesAppApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesAppApiService]
    });
  });

  it('should be created', inject([MoviesAppApiService], (service: MoviesAppApiService) => {
    expect(service).toBeTruthy();
  }));
});
