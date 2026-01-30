# Phone E-commerce Web App

This project is a Phone E-commerce Web Application built using Next.js for the frontend and FastAPI for the backend. It features a product catalog, shopping cart, checkout process, and an integrated AI chatbot for customer support.

## Project Structure

```
phone-ecommerce-app
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── lib
│   │   ├── store
│   │   └── types
│   ├── public
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── README.md
├── backend
│   ├── app
│   ├── tests
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
└── README.md
```

## Frontend

The frontend is developed using Next.js, a React framework that enables server-side rendering and static site generation. The main features include:

- **Product Catalog**: Displays a list of available phones.
- **Product Details**: Shows detailed information about each phone.
- **Shopping Cart**: Allows users to view and manage their selected products.
- **Checkout**: Facilitates the purchase process.
- **AI Chatbot**: Provides customer support through a chat interface.

### Getting Started

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Run the development server with `npm run dev`.

## Backend

The backend is built using FastAPI, a modern web framework for building APIs with Python. Key components include:

- **API Routes**: Manage products, cart, orders, users, and chatbot interactions.
- **Database Models**: Define the structure of the data stored in the database.
- **Services**: Contain business logic for handling requests and responses.

### Getting Started

1. Navigate to the `backend` directory.
2. Install dependencies using `pip install -r requirements.txt`.
3. Run the FastAPI server with `uvicorn app.main:app --reload`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.