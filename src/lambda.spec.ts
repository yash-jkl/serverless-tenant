import { mockClient, mockPod, mockSecret } from './constants';
import { handler } from './lambda'; // Import your Lambda handler
import { MainDatabaseService } from './main-database/main-database.service';
import { TenantDataService } from './tenant-data/tenant-data.service';
import { AwsSecrets } from './utils/aws-services/aws-secrets';

// Mock MainDatabaseService
jest.mock('./main-database/main-database.service', () => ({
  MainDatabaseService: jest.fn().mockImplementation(() => ({
    getClientData: jest.fn().mockResolvedValue([mockClient, mockPod]),
  })),
}));

// Mock AwsSecrets
jest.mock('./utils/aws-services/aws-secrets', () => ({
  AwsSecrets: jest.fn().mockImplementation(() => ({
    getSecrets: jest.fn().mockResolvedValue(mockSecret),
  })),
}));

// Mock TenantDataService
jest.mock('./tenant-data/tenant-data.service', () => ({
  TenantDataService: jest.fn().mockImplementation(() => ({
    getDataFromTenant: jest.fn().mockResolvedValue({
      /* mock your client DB data here */
    }),
  })),
}));

describe('Lambda Handler', () => {
  it('should handle Lambda event correctly', async () => {
    const event: any = { id: 'someId' };

    // Invoke the Lambda handler
    await handler(event, null, null);

    // Example assertions:
    expect(MainDatabaseService).toHaveBeenCalledWith();
    expect(AwsSecrets).toHaveBeenCalledWith();
    expect(TenantDataService).toHaveBeenCalledWith();
  });
});
