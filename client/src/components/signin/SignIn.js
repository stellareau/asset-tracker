import React from 'react';
import {config} from '../../config';

export default class SignIn extends React.Component {
  // Redirect to Accenture's SSO
  componentWillMount() {
    const currentURL = window.location;
    // const SAMLURL = encodeURIComponent(`${currentURL.protocol}//${currentURL.host}/api/v1/auth/sso`);
    const SAMLURL = encodeURIComponent(`http://localhost:3000/api/v1/auth/sso`);
    const url = `${config.saml}?relay=${SAMLURL}`;
    window.location.replace(url)
  }

  render() {
    // TODO: Build local sign in page if needed
    return null;
  }
}