import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_dynamodb as db,
  aws_dynamodb,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Cdkv2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dbUsersTable = new db.Table(this, "users", {
      tableName: "users",
      partitionKey: {
        name: "uid",
        type: aws_dynamodb.AttributeType.STRING,
      },
    });

    const fn = new lambda.Function(this, "cdkv2", {
      runtime: Runtime.NODEJS_14_X,
      handler: "hello.handler",
      code: Code.fromAsset(join(__dirname, "..", "services", "hello")),
      architecture: lambda.Architecture.X86_64,
    });
    dbUsersTable.grantWriteData(fn);
  }
}
