import Cookies from 'universal-cookie';

const DEV = process.env.NODE_ENV;
const PUBLIC_URL = process.env.PUBLIC_URL;
const cookies = new Cookies();

export const config = {
  url: DEV ? 'http://localhost:3000' : 'https://no1applicant.com',
  images: PUBLIC_URL + '/images',
  saml: 'https://aiam.accenture.com/openam/saml2/jsp/applogin.jsp',
  apis: {
    asset: '/api/v1/asset',
    stocktake: '/api/v1/stocktake'
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + cookies.get('auth')
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbmcubGVAYWNjZW50dXJlLmNvbSIsInVzZXJuYW1lIjoic2luZy5sZSIsImlhdCI6MTUyNDAwNjg4OSwiZXhwIjoxNTI0NjExNjg5fQ.HBQ7tHoZcpb7FF-cWPAneY9LujG-72HftolUY4X8NkM'
  },
};