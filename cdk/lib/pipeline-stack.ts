import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CuriostaPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'curiosta-website-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('curiosta/curiosta-website', 'main'),
        commands: ['npm i', 'npm run build', 'cd cdk','npm i', 'npx cdk synth']
      })
    });
  }
}