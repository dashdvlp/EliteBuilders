export const oauthConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/google`,
    scope: 'email profile',
  },
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/github`,
    scope: 'user:email',
  },
};

export const getOAuthUrl = (provider: 'google' | 'github'): string => {
  const config = oauthConfig[provider];
  
  switch (provider) {
    case 'google':
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=${encodeURIComponent(config.scope)}`;
    
    case 'github':
      return `https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scope)}`;
    
    default:
      throw new Error(`Unsupported OAuth provider: ${provider}`);
  }
}; 