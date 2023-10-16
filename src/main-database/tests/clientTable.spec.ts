import { TestingModule, Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { ClientTableService } from '../client-table/client-table.service';
import { mockClientData, mockClientFinancialProfiles, mockParentData, mockData } from './index';
import { mockPod } from '../../constants';

describe('Main-Database', () => {
    let databaseService;
    let clientTableService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ClientTableService,
                    useValue: {
                        getClient: jest.fn(),
                        getClientFinancialProfiles: jest.fn(),
                        getClientData: new ClientTableService().getClientData
                    }
                },
                {
                    provide: DatabaseService,
                    useValue: {
                        query: jest.fn(),
                    },
                },
            ],
        }).compile();

        clientTableService = module.get<ClientTableService>(ClientTableService);
        databaseService = module.get<DatabaseService>(DatabaseService);
    });

    it('ClientTableService should be defined', () => {
        expect(ClientTableService).toBeDefined();
    });

    describe('getClient', () => {
        it('should retrieve client data', async () => {
            clientTableService.getClient.mockReturnValueOnce(mockClientData)
            clientTableService.getClient.mockReturnValueOnce(mockParentData)
            clientTableService.getClientFinancialProfiles.mockReturnValueOnce(mockClientFinancialProfiles)

            const data = await clientTableService.getClientData(mockPod)
            expect(data).toEqual({
                clients: mockClientData,
                getClientFinancialProfiles: mockClientFinancialProfiles,
                parents: mockParentData,
            });
        });

        it('should retrieve client data with no parent', async () => {
            clientTableService.getClient.mockReturnValueOnce(mockClientData)
            clientTableService.getClient.mockReturnValueOnce()
            clientTableService.getClientFinancialProfiles.mockReturnValueOnce(mockClientFinancialProfiles)

            const data = await clientTableService.getClientData(mockData)
            expect(data).toEqual({
                clients: mockClientData,
                getClientFinancialProfiles: mockClientFinancialProfiles,
                parents: undefined,
            });
        });
    });
});
