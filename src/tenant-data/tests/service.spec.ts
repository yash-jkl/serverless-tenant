import { Test, TestingModule } from '@nestjs/testing';
import { TenantDataService } from '../tenant-data.service';
import { TenantDatabaseService } from '../../tenant-database/tenant-database.service';
import { mockClientData, mockDatabase } from '../../constants';

describe('TenantDataService', () => {
  let tenantDataService: TenantDataService;
  let tenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantDataService,
        {
          provide: TenantDatabaseService,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    tenantDataService = module.get<TenantDataService>(TenantDataService);
    tenantService = module.get<TenantDatabaseService>(TenantDatabaseService);
  });

  it('TenantDataService', () => {
    expect(TenantDataService).toBeDefined();
  });

  it('getDataFromTenant', async () => {
    tenantService.query.mockReturnValueOnce({});
    const data = await tenantDataService.getDataFromTenant(
      mockClientData,
      mockDatabase,
    );

    expect(data).toEqual({});
  });
});
