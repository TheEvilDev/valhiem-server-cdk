import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { ValheimWorld } from 'cdk-valheim';

export class ValhiemServerCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ValheimWorld(this, 'ValheimWorld', {
      image: cdk.aws_ecs.ContainerImage.fromRegistry('mbround18/valheim'),
      containerPath:  '/home/steam/.config/unity3d/IronGate/Valheim',
      cpu: 2048,
      memoryLimitMiB: 4096,
      schedules: [{
        start: { hour: '12', weekDay: '1-5' },
        stop: { hour: '1', weekDay: '1-5' }
      }],
      environment: {
        SERVER_NAME: 'CDK Valheim',
        WORLD_NAME: 'Amazon',
        SERVER_PASS: 'fargate',
        BACKUPS: 'false',
      }
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ValhiemServerCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
