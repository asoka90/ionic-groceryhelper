import { TestBed } from '@angular/core/testing';

import { ExpensesStorageService } from './expenses-storage.service';

describe('ExpensesStorageService', () => {
  let service: ExpensesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
