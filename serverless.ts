import type { AWS } from "@serverless/typescript";

import functions from "@functions/index";
import {DB_HOST, DB_PASSWORD} from "./src/config/constants";

const serverlessConfiguration: AWS = {
  service: "employee-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    profile: "sls-employee-service",
    stage: "dev",
    stackName: "${self:service}-stack-${self:provider.stage}",
    region: "us-east-1",
    apiName: "${self:service}-api-${self:provider.stage}",
    timeout: 30,
    memorySize: 1024,
    endpointType: "regional",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["${self:provider.apiName}-api-key"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DB_HOST: DB_HOST,
      DB_PORT: "5432",
      DB_NAME: "employee-service",
      DB_USER: "postgres",
      DB_PASSWORD: DB_PASSWORD,
      DB_SCHEMA: "public",
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    allowedHttpHeaders:
      "Content-Type, Accept, Authorization, x-api-key, content-length",
  },
};

module.exports = serverlessConfiguration;
