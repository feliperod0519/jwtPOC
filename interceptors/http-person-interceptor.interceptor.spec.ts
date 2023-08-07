import { TestBed } from '@angular/core/testing';

import { HttpPersonInterceptorInterceptor } from './http-person-interceptor.interceptor';

describe('HttpPersonInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpPersonInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpPersonInterceptorInterceptor = TestBed.inject(HttpPersonInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
