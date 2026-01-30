# Phone E-commerce Web App

This project is a Phone E-commerce Web Application built using Next.js for the frontend and FastAPI for the backend. It includes features such as product listings, a shopping cart, checkout functionality, and an integrated AI chatbot for customer support.

## Frontend

The frontend is developed using Next.js 14 and includes the following features:

- **Product Catalog**: Displays a list of available phones.
- **Product Details**: Shows detailed information about a specific phone.
- **Shopping Cart**: Allows users to view and manage items they wish to purchase.
- **Checkout**: Facilitates the checkout process for users.
- **Chatbot Integration**: Provides an AI-powered chatbot for customer inquiries.

### Folder Structure

- `src/app`: Contains the main application files, including pages and API routes.
- `src/components`: Contains reusable UI components, layout components, product components, cart components, and chatbot components.
- `src/hooks`: Contains custom hooks for managing state and API interactions.
- `src/lib`: Contains utility functions and API call functions.
- `src/store`: Contains state management files for the cart and chat.
- `src/types`: Contains TypeScript types used throughout the application.

### Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd phone-ecommerce-app/frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Backend

The backend is developed using FastAPI and includes the following features:

- **Product Management**: API routes for managing products.
- **Cart Management**: API routes for managing the shopping cart.
- **Order Management**: API routes for handling orders.
- **User Management**: API routes for managing user accounts.
- **Chatbot Functionality**: API routes for handling chatbot interactions.

### Getting Started

1. Navigate to the backend directory:
   ```
   cd phone-ecommerce-app/backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

4. Open your browser and navigate to `http://localhost:8000/docs` to access the API documentation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.