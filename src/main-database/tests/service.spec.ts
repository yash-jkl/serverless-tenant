import { TestingModule, Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { MainDatabaseService } from '../main-database.service';
import { mockClient, mockPod } from '../../constants';
import { ClientTableService } from '../client-table/client-table.service';
import { PodsService } from '../pods/pods.service';
import { mockClientData, mockClientFinancialProfiles, mockParentData } from '.';

describe('Main-Database', () => {
  let mainDatabaseService: MainDatabaseService;
  let podService;
  let clientTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainDatabaseService,
        {
          provide: PodsService,
          useValue: {
            getCredentials: jest.fn(),
          },
        },
        {
          provide: ClientTableService,
          useValue: {
            getClientData: jest.fn(),
          },
        },
      ],
    }).compile();
    mainDatabaseService = module.get<MainDatabaseService>(MainDatabaseService);
    podService = module.get<PodsService>(PodsService);
    clientTableService = module.get<ClientTableService>(ClientTableService);
  });

  it('MainDatabaseService should be defined', () => {
    expect(MainDatabaseService).toBeDefined();
  });

  describe('getClient', () => {
    it('should retrieve client data and pod credentials', async () => {
      clientTableService.getClientData.mockReturnValueOnce({
        clients: mockClientData,
        getClientFinancialProfiles: mockClientFinancialProfiles,
        parents: mockParentData,
      })
      podService.getCredentials.mockReturnValueOnce({
        credential: mockPod[0]
      })

      const eventData = { id: 'someId' };

      const result = await mainDatabaseService.getClientData(eventData);
      expect(result).toEqual({
        clients: mockClientData[0],
        getClientFinancialProfiles: mockClientFinancialProfiles[0],
        parents: mockParentData[0],
        credential: mockPod[0],
      });
    });
  });
});
