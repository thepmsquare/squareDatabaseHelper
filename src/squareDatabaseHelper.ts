import { Filters, RowData, Rows } from "./types/SquareDatabaseHelper";

class SquareDatabaseHelper {
  private baseUrl: string;

  constructor(
    squareDatabaseProtocol: string = "http",
    squareDatabaseIp: string = "localhost",
    squareDatabasePort: string = "10010"
  ) {
    this.baseUrl = `${squareDatabaseProtocol}://${squareDatabaseIp}:${squareDatabasePort}`;
  }

  private async makeRequest(url: string, method: string, body: any) {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error after logging
    }
  }

  public async insertRows(
    data: Rows,
    databaseName: string,
    schemaName: string,
    tableName: string
  ) {
    const url = `${this.baseUrl}/insert_rows`;
    const body = {
      data,
      database_name: databaseName,
      schema_name: schemaName,
      table_name: tableName,
    };
    return this.makeRequest(url, "POST", body);
  }

  public async getRows(
    filters: Filters,
    databaseName: string,
    schemaName: string,
    tableName: string,
    ignoreFiltersAndGetAll = false
  ) {
    const url = `${this.baseUrl}/get_rows`;
    const body = {
      filters,
      database_name: databaseName,
      schema_name: schemaName,
      table_name: tableName,
      ignore_filters_and_get_all: ignoreFiltersAndGetAll,
    };
    return this.makeRequest(url, "POST", body);
  }

  public async editRows(
    data: RowData,
    filters: Filters,
    databaseName: string,
    schemaName: string,
    tableName: string,
    ignoreFiltersAndEditAll = false
  ) {
    const url = `${this.baseUrl}/edit_rows`;
    const body = {
      data,
      filters,
      database_name: databaseName,
      schema_name: schemaName,
      table_name: tableName,
      ignore_filters_and_edit_all: ignoreFiltersAndEditAll,
    };
    return this.makeRequest(url, "PUT", body);
  }

  public async deleteRows(
    filters: Filters,
    databaseName: string,
    schemaName: string,
    tableName: string,
    ignoreFiltersAndDeleteAll = false
  ) {
    const url = `${this.baseUrl}/delete_rows`;
    const body = {
      filters,
      database_name: databaseName,
      schema_name: schemaName,
      table_name: tableName,
      ignore_filters_and_delete_all: ignoreFiltersAndDeleteAll,
    };
    return this.makeRequest(url, "DELETE", body);
  }
}

export default SquareDatabaseHelper;
