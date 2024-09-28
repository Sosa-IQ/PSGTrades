import { Amplify } from 'aws-amplify';
import { environment } from '../environments/environment';

export function configureAmplify() {
    Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: environment.aws.userPoolId,
            userPoolClientId: environment.aws.userPoolClientId,
          }
        }
      });
}