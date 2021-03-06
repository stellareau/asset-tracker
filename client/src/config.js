import Cookies from 'universal-cookie';

const PROD = process.env.NODE_ENV === 'production';
const PUBLIC_URL = process.env.PUBLIC_URL;
const cookies = new Cookies();

export const config = {
  url: PROD ? 'https://no1applicant.com' : 'http://localhost:3000',
  prodEnv: PROD,
  images: PUBLIC_URL + '/images',
  saml: 'https://aiam.accenture.com/openam/saml2/jsp/applogin.jsp',
  apis: {
    asset: '/api/v1/asset',
    stocktake: '/api/v1/stocktake'
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + cookies.get('auth')
  },
};