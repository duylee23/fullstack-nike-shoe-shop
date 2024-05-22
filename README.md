Nike Shoe E-Commerce Website
This is a full-stack e-commerce website for selling Nike shoes, built using Java Spring Boot for the back-end and React for the front-end.

Table of Contents
Features
Tech Stack
Getting Started
Prerequisites
Installation
Usage
API Endpoints
Contributing
License
Contact
Features
User authentication (registration, login, logout)
Product listing
Product details
Add to cart
Checkout process
Admin panel for managing products

Tech Stack
Back-end: Java Spring Boot
Front-end: React
Database: MySQL
Authentication: JWT (JSON Web Token)
Styling: Tailwind CSS
Build Tool: Maven
Getting Started
Prerequisites
Java JDK 11 or later
Node.js and npm
MySQL
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/nike-shoe-ecommerce.git
cd nike-shoe-ecommerce
Back-end setup:

Navigate to the back-end directory:

bash
Copy code
cd backend
Create a application.properties file in src/main/resources and add your MySQL database configuration:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/nike_shoe_ecommerce
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=your_jwt_secret
Build and run the Spring Boot application:

bash
Copy code
mvn clean install
mvn spring-boot:run
Front-end setup:

Navigate to the front-end directory:

bash
Copy code
cd ../frontend
Install the dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
Usage
Open your browser and navigate to http://localhost:3000 to access the front-end.
Access the back-end API at http://localhost:8080.
API Endpoints
Authentication
POST /auth/register - Register a new user
POST /auth/login - Authenticate a user and return a JWT
Products
GET /admin/product - Retrieve all products (Admin)
GET /admin/product/{id} - Retrieve product details by ID (Admin)
POST /admin/product/create - Create a new product (Admin)
DELETE /admin/product/delete/{id} - Delete a product by ID (Admin)
Cart
POST /cart/add - Add a product to the cart
GET /cart - Retrieve the cart items for a user
POST /cart/checkout - Checkout the cart items
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
If you have any questions or feedback, feel free to contact me at duyninhle@gmail.com.
