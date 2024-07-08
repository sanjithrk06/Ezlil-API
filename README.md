
# **RESTful API for An E-commerce Website (Ezlil)**

## Project Overview 
A RESTful API for the Ezlil e-commerce website is designed to provide a robust and scalable interface for managing the core functionalities of the online store. This API allows seamless interaction with the website's backend, enabling the handling of products, user accounts, orders, and other essential e-commerce features. 
[Run the application locally](#run-locally)

---

## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

**ODM Tool:** Mongoose

---

## Key Features

- **Product Management:** Endpoints to create, read, update, and delete products.
- **User Authentication:** Secure login, registration, and user profile management.
- **Order Processing:** Endpoints for managing the shopping cart, checkout process, and order history.
- **Inventory Management:** Real-time tracking and updating of stock levels.
- **Payment Integration:** Secure processing of payments via various payment gateways.
- **Search and Filter:** Advanced search and filtering options for product catalog.
- **Review and Rating System:** Endpoints for users to leave reviews and ratings for products.

---

## Stackholders

- **Developers:** Building front-end applications or mobile apps that need to interact with the E-commerce API.
- **E-commerce Managers:** Managing product listings, inventory, and customer orders through custom dashboards or admin panels.
- **Third-party Integrators:** Companies looking to integrate e-commerce capabilities with other services or platforms, such as CRM systems or marketing tools.
- **Customers:** Indirectly benefiting from a more responsive and feature-rich e-commerce experience.

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`SECRET`(Secret Key for JWT)

---

## Run Locally <a id="run-locally"></a>

Clone the project

```bash
  git clone https://github.com/sanjithrk06/Ezlil-API.git
```

Go to the project directory

```bash
  cd Ezlil-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

---
*Feel free to reach out through the contact form in [My Portfolio](https://sanjith-portfolio.netlify.app/) or connect with me on social media.
