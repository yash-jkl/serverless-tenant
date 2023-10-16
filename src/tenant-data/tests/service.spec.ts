import { Test, TestingModule } from '@nestjs/testing';
import { TenantDataService } from '../tenant-data.service';
import { TenantDatabaseService } from '../../tenant-database/tenant-database.service';
import {
  mockClientData,
  mockClientFinancialProfiles,
  mockDatabase,
  mockParentData,
  mockParentGetData,
} from '../../constants';
import { ClientTableService } from '../client-table/client-table.service';

describe('TenantDataService', () => {
  let tenantDataService: TenantDataService;
  let tenantService;
  let clientTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantDataService,
        {
          provide: TenantDatabaseService,
          useValue: {
            getDatabase: jest.fn(),
          },
        },
        {
          provide: ClientTableService,
          useValue: {
            getClient: jest.fn(),
            createClient: jest.fn(),
            updateClient: jest.fn(),
            getClientFinancialProfileData: jest.fn(),
            createClientFinancialProfiles: jest.fn(),
            updateClientFinancialProfiles: jest.fn(),
          },
        },
      ],
    }).compile();

    tenantDataService = module.get<TenantDataService>(TenantDataService);
    tenantService = module.get<TenantDatabaseService>(TenantDatabaseService);
    clientTableService = module.get<ClientTableService>(ClientTableService);
  });

  it('TenantDataService', () => {
    expect(TenantDataService).toBeDefined();
  });

  describe('getDataFromTenant', () => {
    it('if parent not present in teneant DB', async () => {
      tenantService.getDatabase.mockReturnValueOnce({ release: jest.fn() });
      clientTableService.getClient.mockReturnValueOnce({ rows: [] });
      clientTableService.createClient.mockReturnValueOnce({});
      clientTableService.createClientFinancialProfiles.mockReturnValueOnce({});

      await tenantDataService.getDataFromTenant(
        mockClientData,
        mockClientFinancialProfiles,
        mockParentData,
        mockDatabase,
      );
      expect(clientTableService.createClient).toBeCalledTimes(2);
      expect(clientTableService.createClientFinancialProfiles).toBeCalledTimes(
        1,
      );
      expect(clientTableService.getClient).toBeCalledTimes(2);
      expect(clientTableService.updateClient).not.toHaveBeenCalled();
      expect(
        clientTableService.updateClientFinancialProfiles,
      ).not.toHaveBeenCalled();
    });

    it('if parent present and client not present in teneant DB', async () => {
      tenantService.getDatabase.mockReturnValueOnce({ release: jest.fn() });
      clientTableService.getClient.mockReturnValueOnce(mockParentGetData);
      clientTableService.createClient.mockReturnValueOnce({});
      clientTableService.createClientFinancialProfiles.mockReturnValueOnce({});

      await tenantDataService.getDataFromTenant(
        mockClientData,
        mockClientFinancialProfiles,
        mockParentData,
        mockDatabase,
      );
      expect(clientTableService.createClient).toBeCalledTimes(1);
      expect(clientTableService.getClient).toBeCalledTimes(2);
      expect(clientTableService.createClientFinancialProfiles).toBeCalledTimes(
        1,
      );
      expect(clientTableService.updateClient).not.toHaveBeenCalled();
      expect(
        clientTableService.updateClientFinancialProfiles,
      ).not.toHaveBeenCalled();
    });

    it('if parent not sent', async () => {
      tenantService.getDatabase.mockReturnValueOnce({ release: jest.fn() });
      clientTableService.getClient.mockReturnValueOnce({});
      clientTableService.createClient.mockReturnValueOnce({});
      clientTableService.createClientFinancialProfiles.mockReturnValueOnce({});

      await tenantDataService.getDataFromTenant(
        mockClientData,
        mockClientFinancialProfiles,
        null,
        mockDatabase,
      );
      expect(clientTableService.createClient).toBeCalledTimes(1);
      expect(clientTableService.getClient).toBeCalledTimes(1);
      expect(clientTableService.createClientFinancialProfiles).toBeCalledTimes(
        1,
      );
      expect(clientTableService.updateClient).not.toHaveBeenCalled();
      expect(
        clientTableService.updateClientFinancialProfiles,
      ).not.toHaveBeenCalled();
    });

    it('if client exists ', async () => {
      tenantService.getDatabase.mockReturnValueOnce({ release: jest.fn() });
      clientTableService.createClient.mockReturnValueOnce({});
      clientTableService.updateClient.mockReturnValueOnce({});
      clientTableService.getClient.mockReturnValueOnce(mockParentGetData);
      clientTableService.getClient.mockReturnValueOnce(mockParentGetData);
      clientTableService.createClientFinancialProfiles.mockReturnValueOnce({});
      clientTableService.updateClientFinancialProfiles.mockReturnValueOnce({});
      clientTableService.getClientFinancialProfileData.mockReturnValueOnce({
        rows: [mockClientFinancialProfiles],
      });

      await tenantDataService.getDataFromTenant(
        mockClientData,
        mockClientFinancialProfiles,
        mockParentData,
        mockDatabase,
      );
      expect(clientTableService.updateClientFinancialProfiles).toBeCalledTimes(
        1,
      );
      expect(clientTableService.getClient).toBeCalledTimes(2);
      expect(clientTableService.createClient).not.toBeCalledTimes(1);
      expect(clientTableService.updateClient).toBeCalledTimes(1);
      expect(clientTableService.updateClientFinancialProfiles).toBeCalledTimes(
        1,
      );
    });

    it('if client financial doesnt exists', async () => {
      tenantService.getDatabase.mockReturnValueOnce({ release: jest.fn() });
      clientTableService.createClient.mockReturnValueOnce({});
      clientTableService.updateClient.mockReturnValueOnce({});
      clientTableService.getClient.mockReturnValueOnce(mockParentGetData);
      clientTableService.getClient.mockReturnValueOnce(mockParentGetData);
      clientTableService.createClientFinancialProfiles.mockReturnValueOnce({});
      clientTableService.updateClientFinancialProfiles.mockReturnValueOnce({});
      clientTableService.getClientFinancialProfileData.mockReturnValueOnce({
        rows: [],
      });

      await tenantDataService.getDataFromTenant(
        mockClientData,
        mockClientFinancialProfiles,
        mockParentData,
        mockDatabase,
      );
      expect(
        clientTableService.updateClientFinancialProfiles,
      ).not.toBeCalledTimes(1);
      expect(clientTableService.getClient).toBeCalledTimes(2);
      expect(clientTableService.createClient).not.toBeCalledTimes(1);
      expect(clientTableService.updateClient).toBeCalledTimes(1);
      expect(clientTableService.createClientFinancialProfiles).toBeCalledTimes(
        1,
      );
    });
  });
});
