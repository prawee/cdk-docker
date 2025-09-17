import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';

export class CdkDockerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.DockerImageFunction(this, `PocCdkDocker`, {
      functionName: `poc-cdk-docker`,
      description: 'POC Lambda with Docker',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../'), {
        platform: ecrAssets.Platform.LINUX_ARM64,
        file: 'Dockerfile'
      }),
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: cdk.Duration.seconds(120),
    });

    const api = new lambda.FunctionUrl(this, 'PocCdkDockerUrl', {
      function: fn,
      authType: lambda.FunctionUrlAuthType.NONE
    });

    new cdk.CfnOutput(this, 'PocCdkDockerEndpoint', {
      value: api.url
    });
  }
}
