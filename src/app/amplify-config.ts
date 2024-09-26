import { Amplify } from 'aws-amplify';

export function configureAmplify() {
    Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: 'COGNITO_USER_POOL_ID',
            userPoolClientId: 'COGNITO_USER_POOL_CLIENT_ID',
          }
        }
      });
}