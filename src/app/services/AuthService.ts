import { Injectable } from '@angular/core';
import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens, fetchUserAttributes, AuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async getCurrentUser(): Promise<AuthUser> {
    return await getCurrentUser();
  }

  async getCurrentSession(): Promise<AuthTokens | undefined> {
    return (await fetchAuthSession()).tokens;
  }

  async getCurrentUserFullName(): Promise<string | undefined> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload['name']?.toString();
  }

  async handleFetchUserAttributes() {
    try {
      let userAttributes = await fetchUserAttributes();
      return userAttributes;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getUserToken() {
    try {
      let attributes = await fetchUserAttributes();
      let token = attributes?.['custom:token']?.toString();
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  signOut() {
    signOut();
  }

}