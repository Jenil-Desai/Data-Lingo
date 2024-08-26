import { z } from "zod";
import { DatabaseCheckSchema, databaseDestroySchema, databaseNewSchema } from "../validations/databaseValidations";

export type databaseCheckBody = z.infer<typeof DatabaseCheckSchema>;
export type databaseNewBody = z.infer<typeof databaseNewSchema>;
export type databaseDestroyBody = z.infer<typeof databaseDestroySchema>;

export interface queryMySQLProps {
  connectionString: string;
  query: string;
}

export interface queryPostgresProps {
  connectionString: string;
  query: string;
}

export interface queryOracleProps {
  connectionString: string;
  query: string;
}
