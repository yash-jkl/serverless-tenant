import { Injectable } from '@nestjs/common';
import {
  getClientFinancialProfileData,
  getClientQuery,
  insertClientFinancialProfiles,
  insertClientQuery,
  updateClientFinancialProfiles,
  updateClientQuery,
} from '../helper';

@Injectable()
export class ClientTableService {
  async getClient(client, data, values?: any[]) {
    try {
      const queryText = getClientQuery(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }

  async createClient(client, data, values?: any[]) {
    try {
      const queryText = insertClientQuery(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }

  async updateClient(client, data, values?: any[]) {
    try {
      const queryText = updateClientQuery(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }

  async getClientFinancialProfileData(client, data, values?: any[]) {
    try {
      const queryText = getClientFinancialProfileData(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }

  async createClientFinancialProfiles(client, data, values?: any[]) {
    try {
      const queryText = insertClientFinancialProfiles(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }

  async updateClientFinancialProfiles(client, data, values?: any[]) {
    try {
      const queryText = updateClientFinancialProfiles(data);
      return client.query(queryText, values);
    } catch (error) {
      console.log(error);
    }
  }
}
