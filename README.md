# E-commerce Backend Assignment

## Overview
This project aims to develop a robust and scalable backend system for an e-commerce platform using Node.js and Nest.js. It includes essential functionalities such as user management, product management, and order processing.

## Project Details
- **Project Name:** E-commerce System
- **Duration:** 4 days
- **Programming Language:** Node.js
- **Framework:** Nest.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Developer Tool:** GraphQL

| Components            | 
| -------                         |
| <img src="https://github.com/MAES-Pyramids/Baianat-ECOMMERCE/blob/main/etc/imgs/Components.png" width="1000" />   | 

## Testing Setup
1. Add the `.env.prod` file to the following path: ./etc/secrets/.env.prod
2. Add the database `.env` file to this path: ./prisma/.env
3. Run the following commands to start the application:
````
docker compose -up
````

````
npm run start:prod
````


## Postman Workspace for Testing
Use the following Postman shared workspace for testing all queries and mutations:
[Postman Workspace](https://www.postman.com/cloudy-astronaut-164609/workspace/e-commerce-assignment/collection/66a1699e782978cb4e55a43c?action=share&creator=37127689&active-environment=37127689-0bec2869-3779-4e1f-903a-658c4bc9b44b)

----

<p align="center">The localization task is now complete.</p>

- The localization task is now complete. Customers can query products in their desired language by passing it in the `X-Lang` header. If the admin sets a translation for the specified language, it will be returned. Otherwise, the default product description will be shown.

- Admins can now change the default system language using a query. If a customer does not specify a target language, They will receive the product description in the new default language if the product has a translation available. Otherwise, the default product description will be shown.


