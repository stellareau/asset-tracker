# Full Stack Engineer Challenge

The challenge was to build an asset tracker to track all the equipment available within the Liquid Studio. The assets are frequently lent out to users across the organisation and require a unified channel to manage these requests.

## The solution

The solution comes in 2 parts. The first part is a desktop view, which is reserved for admins (Liquid Studio staff), which contains an overview on all the inventory that was registered into the platform and who has borrowed what. A stocktake page where inventory managers can quickly and easily perform stocktakes. 

The second part is a mobile view, which is used by both admins and users. The mobile acts like a pocket scanner. As an admin, they can perform stocktake checks using their mobile as scanners. As a user, they can scan the barcode and checkout an item which will be registered to their name on the platform. Both views exist on the same site.

The application is wrapped around Accenture's SSO system so only authorized users can have access to these pages. The added benefit is that the platform does not need to have a user management system which simplifies the design.

The features that are built into the platform are primitive and broad but demonstrate the potential  of the platform and extensions that could be built with more requirements and user testing/feedback. 

## Technologies Used

- React/Redux (Frontend)
- NodeJS + Express (Backend)
- MongoDB (Database)
- Docker (Deployment)
- AWS (Deployment server)
- Nginx (Reverse proxy)

## Usage

The application is built on 2 decoupled services, a frontend component and a backend component. It is recommended that the backend component is started first. Every component is dockerised for quick deployment on any server.

### Frontend

To start the development server for the first time:

```
cd client
npm install
npm start
```

The frontend will then be found on http://localhost:3001 (if the backend is started first and running)

### Backend

MongoDB needs to be installed and running locally on port 27017 (default port) before the backend can start up. To start the backend development server for the first time:

```
cd server
npm install
npm run dev
```

The backend will then be found on http://localhost:3000

### Deployment

Make sure Docker (community edition) is installed. The following containers will need to be started for this application to work.

- Nginx
- MongoDB
- Asset-Client
- Asset-Server

For first time deployment:

```
./build.sh start  
./build.sh
```

For updates to either the frontend or backend component

```
./build.sh
```

## Demo

You can see the live demo of the application here: https://no1applicant.com

## Assumptions

- Barcodes are unique per product
- Code128 barcodes used on all the assets
- Only Accenture employees will be using the platform

## Challenges

- Learning node/express for the first time
- Using MongoDB for the first time on a backend application
- Time constraints