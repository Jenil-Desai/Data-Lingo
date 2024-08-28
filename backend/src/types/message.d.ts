import { z } from "zod";
import { messageNewSchema } from "../validations/messageValidations";

export type messageNewBody = z.infer<typeof messageNewSchema>;

// Define the types for the column metadata
export interface ColumnMetadata {
  columnName: string;
  dataType: string;
}

// Define the types for the table metadata
export interface TableMetadata {
  tableName: string;
  columns: ColumnMetadata[];
}

// Define the types for the database connection
export interface DatabaseConnection {
  connectionName: string;
  connectionString: string;
  connectionType: string;
  tables: TableMetadata[];
}
