import { TestingModule, Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { MainDatabaseService } from '../main-database.service';
import { mockClient, mockPod } from '../../constants';

describe('Main-Database', () => {
  let mainDatabaseService: MainDatabaseService;
  let databaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainDatabaseService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();
    databaseService = module.get<DatabaseService>(DatabaseService);
    mainDatabaseService = module.get<MainDatabaseService>(MainDatabaseService);
  });

  it('MainDatabaseService should be defined', () => {
    expect(MainDatabaseService).toBeDefined();
  });

  describe('getClient', () => {
    it('should retrieve client data and pod credentials', async () => {
      databaseService.query
        .mockReturnValueOnce([mockClient])
        .mockReturnValueOnce([{ pod_id: 'mockPodId' }])
        .mockReturnValueOnce(mockPod);

      const eventData = { id: 'someId' };

      const result = await mainDatabaseService.getClientData(eventData);
      expect(result).toEqual([mockClient, mockPod]);
    });
  });
});
