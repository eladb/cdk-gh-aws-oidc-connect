const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism, DevEnvironmentDockerImage, Gitpod, github } = require('projen');

const AUTOMATION_TOKEN = 'GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Apoorva Kulkarni',
  authorAddress: 'kuapoorv@amazon.com',
  cdkVersion: '1.125.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-gh-aws-oidc-connect',
  repositoryUrl: 'https://github.com/kuapoorv/cdk-gh-aws-oidc-connect.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-ecr',
  ],
  cdkTestDependencies: [
    '@aws-cdk/aws-ecr',
  ],
  description: `
This construct is based on Aidan Steele\'s blog \
https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html. \
Use this constuct to provision an AWS IAM OIDC identity provider and an IAM role \
that can be assumed by github-actions.`,
  codeCov: true,
  docgen: true,
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto_merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['askulkarni2'],
  },
  devContainer: true,
  gitpod: true,
  autoApproveUpgrades: true,
  autoApproveProjenUpgrades: true,
  python: {
    distName: 'cdk-gh-aws-oidc-connect',
    module: 'cdk_gh_aws_oidc_connect',
  },
});
project.addGitIgnore('cdk.out');
project.synth();