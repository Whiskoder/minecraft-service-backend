import 'dotenv/config';
import * as joi from 'joi';

interface EnvsVariables {
  PORT: number;
  BUCKET_CLIENT_ID: string;
  BUCKET_CLIENT_SECRET: string;
  BUCKET_ENDPOINT: string;
  BUCKET_NAME: string;
  THROTTLER_TTL: number;
  THROTTLER_LIMIT: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASS: string;
  DB_PORT: number;
  DB_SSL: boolean;
  DB_SYNC: boolean;
  DB_USER: string;
  HOST_URL: string;
  AZURE_SUBSCRIPTION_ID: string;
  AZURE_RESOURCE_GROUP_NAME: string;
  AZURE_VM_NAME: string;
  AZURE_CLIENT_ID: string;
  AZURE_CLIENT_SECRET: string;
  AZURE_TENANT_ID: string;
}

const envsSchema = joi
  .object<EnvsVariables>({
    PORT: joi.number().required(),
    BUCKET_CLIENT_ID: joi.string().required(),
    BUCKET_CLIENT_SECRET: joi.string().required(),
    BUCKET_ENDPOINT: joi.string().required(),
    BUCKET_NAME: joi.string().required(),
    THROTTLER_TTL: joi.number().required(),
    THROTTLER_LIMIT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_SSL: joi.boolean().required(),
    DB_SYNC: joi.boolean().required(),
    DB_USER: joi.string().required(),
    HOST_URL: joi.string().required(),
    AZURE_SUBSCRIPTION_ID: joi.string().required(),
    AZURE_RESOURCE_GROUP_NAME: joi.string().required(),
    AZURE_VM_NAME: joi.string().required(),
    AZURE_CLIENT_ID: joi.string().required(),
    AZURE_CLIENT_SECRET: joi.string().required(),
    AZURE_TENANT_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envsVariables: EnvsVariables = value;

export const envs = {
  port: envsVariables.PORT,
  hostUrl: envsVariables.HOST_URL,
  bucket: {
    clientId: envsVariables.BUCKET_CLIENT_ID,
    clientSecret: envsVariables.BUCKET_CLIENT_SECRET,
    endpoint: envsVariables.BUCKET_ENDPOINT,
    name: envsVariables.BUCKET_NAME,
  },
  throttler: {
    ttl: envsVariables.THROTTLER_TTL,
    limit: envsVariables.THROTTLER_LIMIT,
  },
  db: {
    host: envsVariables.DB_HOST,
    name: envsVariables.DB_NAME,
    pass: envsVariables.DB_PASS,
    port: envsVariables.DB_PORT,
    ssl: envsVariables.DB_SSL,
    sync: envsVariables.DB_SYNC,
    user: envsVariables.DB_USER,
  },
  azure: {
    subscriptionId: envsVariables.AZURE_SUBSCRIPTION_ID,
    resourceGroupName: envsVariables.AZURE_RESOURCE_GROUP_NAME,
    vmName: envsVariables.AZURE_VM_NAME,
    clientId: envsVariables.AZURE_CLIENT_ID,
    clientSecret: envsVariables.AZURE_CLIENT_SECRET,
    tenantId: envsVariables.AZURE_TENANT_ID,
  },
};
