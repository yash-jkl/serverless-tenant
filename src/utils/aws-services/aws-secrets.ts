import {SecretsManager} from '@aws-sdk/client-secrets-manager';

export class AwsSecrets {
  private client = new SecretsManager({
    region: process.env.REGION,
  });

  private secretName = process.env.SECRET_MANAGER;

  public async getSecrets(secretName?: string) {
    return await new Promise<any>((resolve, reject) => {
      this.client.getSecretValue(
        {
          SecretId: secretName ?? this.secretName,
        },
        function (err, data) {
          if (err) {
            console.log(`Error in fetching secrets.\n message:${err}`);
            reject(false);
          }
          if (data && 'SecretString' in data) {
            const secret = JSON.parse(data.SecretString);
            console.log('Successfully fetched secrets.');
            resolve(secret);
          }
        },
      );
    });
  }
}
