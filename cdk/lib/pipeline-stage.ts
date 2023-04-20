import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkStack } from "./cdk-stack";

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const astroStack = new CdkStack(this, "CuriostaPipelineStack");
  }
}
