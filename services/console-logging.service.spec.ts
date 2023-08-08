import { TestBed } from '@angular/core/testing';

import { ConsoleLoggingService } from './console-logging.service';

describe('ConsoleLoggingService', () => {
  let service: ConsoleLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
