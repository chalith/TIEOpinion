import { TestBed } from '@angular/core/testing';

import { AdminLoginRedirectService } from './admin-login-redirect.service';

describe('AdminLoginRedirectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminLoginRedirectService = TestBed.get(AdminLoginRedirectService);
    expect(service).toBeTruthy();
  });
});
