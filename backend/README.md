# Phone E-commerce Backend

This is the backend for the Phone E-commerce Web App, built using FastAPI. The backend serves as the API for the frontend application, handling requests related to products, cart management, user authentication, and chatbot interactions.

## Project Structure

- **app/**: Contains the main application code.
  - **api/**: Contains the API routes and dependencies.
  - **models/**: Contains the database models.
  - **schemas/**: Contains Pydantic schemas for data validation.
  - **services/**: Contains business logic for handling requests.
  - **db/**: Contains database setup and seeding scripts.
  - **utils/**: Contains utility functions used throughout the application.
  
- **tests/**: Contains unit tests for the application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd phone-ecommerce-app/backend
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up the environment variables by copying `.env.example` to `.env` and updating the values as needed.

## Running the Application

To run the FastAPI application, use the following command:
```
uvicorn app.main:app --reload
```

The application will be available at `http://127.0.0.1:8000`.

## API Documentation

The API documentation can be accessed at `http://127.0.0.1:8000/docs` after running the application.

## Features

- Product management
- Shopping cart functionality
- User authentication
- Chatbot integration for customer support

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.