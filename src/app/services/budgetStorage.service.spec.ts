import { TestBed } from '@angular/core/testing';

import { budgetStorageService } from './budgetStorage.service';

describe('StorageService', () => {
  let service: budgetStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(budgetStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
