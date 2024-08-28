import { z } from "zod";

export const DatabaseCheckSchema = z.object({
  connectionType: z.string().min(5, { message: "Minimum length should be 5" }),
  connectionString: z.string().min(15, { message: "Minimum length should be 15" }),
});

export const databaseNewSchema = z.object({
  connectionType: z.enum(["mysql", "postgres", "oracle"], { message: "ConnectionType Should Be One Of this: mysql,postgres,oracle" }),
  connectionString: z.string().min(15, { message: "Minimum length should be 15" }),
  connectionName: z.string().min(5, { message: "Minimum length should be 5" }),
});

export const databaseDestroySchema = z.object({
  databaseConnectionId: z.number().positive(),
});

export const databaseEditSchema = z.object({
  connectionName: z.string().min(5, { message: "Minimum length should be 5" }),
  connectionId: z.number().positive(),
});
