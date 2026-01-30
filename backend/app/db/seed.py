"""
Database seeding script for Phone E-commerce App.
Inserts dummy phone products for testing and RAG chatbot functionality.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.product import Product, Base
from models.user import User, Base as UserBase

# Database URL - use environment variable or default to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./phone_ecommerce.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Sample phone products for seeding
PHONE_PRODUCTS = [
    {
        "name": "iPhone 15 Pro Max",
        "description": "Apple's flagship smartphone featuring A17 Pro chip, 48MP camera system with 5x optical zoom, titanium design, and Action button. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium. Features ProMotion display with always-on technology and Dynamic Island.",
        "price": 1199.99,
        "stock": 50,
        "image_url": "https://example.com/iphone15promax.jpg"
    },
    {
        "name": "Samsung Galaxy S24 Ultra",
        "description": "Samsung's premium smartphone with Snapdragon 8 Gen 3 processor, 200MP main camera, built-in S Pen, and titanium frame. Features a stunning 6.8-inch QHD+ Dynamic AMOLED display with 120Hz refresh rate. Galaxy AI features for enhanced productivity and creativity.",
        "price": 1299.99,
        "stock": 45,
        "image_url": "https://example.com/galaxys24ultra.jpg"
    },
    {
        "name": "Google Pixel 8 Pro",
        "description": "Google's AI-powered smartphone featuring Tensor G3 chip, exceptional computational photography with Magic Eraser and Best Take, 7 years of software updates. Pro camera system with 50MP main sensor and 48MP ultrawide. Temperature sensor and enhanced night sight.",
        "price": 999.99,
        "stock": 60,
        "image_url": "https://example.com/pixel8pro.jpg"
    },
    {
        "name": "OnePlus 12",
        "description": "Flagship killer featuring Snapdragon 8 Gen 3, Hasselblad camera system with 50MP main sensor, 100W SUPERVOOC charging, and 5400mAh battery. 6.82-inch 2K LTPO display with 120Hz ProXDR. Aqua Touch technology for rain resistance.",
        "price": 799.99,
        "stock": 40,
        "image_url": "https://example.com/oneplus12.jpg"
    },
    {
        "name": "Xiaomi 14 Ultra",
        "description": "Photography-focused flagship with Leica Summilux lenses, 1-inch Sony sensor, and variable aperture. Snapdragon 8 Gen 3 processor, 90W wired and 80W wireless charging. Professional photography kit available separately.",
        "price": 1099.99,
        "stock": 35,
        "image_url": "https://example.com/xiaomi14ultra.jpg"
    },
    {
        "name": "iPhone 15",
        "description": "Apple's standard iPhone featuring A16 Bionic chip, 48MP main camera with 2x telephoto, Dynamic Island, and USB-C connectivity. Available in Pink, Yellow, Green, Blue, and Black. Ceramic Shield front and color-infused glass back.",
        "price": 799.99,
        "stock": 75,
        "image_url": "https://example.com/iphone15.jpg"
    },
    {
        "name": "Samsung Galaxy Z Fold 5",
        "description": "Foldable smartphone with 7.6-inch main display and 6.2-inch cover screen. Snapdragon 8 Gen 2 processor, Flex Mode for hands-free video calls, and S Pen support. IPX8 water resistance and improved hinge design.",
        "price": 1799.99,
        "stock": 25,
        "image_url": "https://example.com/galaxyzfold5.jpg"
    },
    {
        "name": "Google Pixel 8a",
        "description": "Affordable AI smartphone with Tensor G3 chip, 64MP main camera, and 7 years of updates. Features Magic Eraser, Photo Unblur, and Circle to Search. 6.1-inch OLED display with 120Hz refresh rate.",
        "price": 499.99,
        "stock": 80,
        "image_url": "https://example.com/pixel8a.jpg"
    },
    {
        "name": "Nothing Phone (2)",
        "description": "Unique transparent design with Glyph Interface LED lighting. Snapdragon 8+ Gen 1 processor, 50MP dual camera system, and clean Nothing OS. 6.7-inch LTPO OLED display with 120Hz adaptive refresh rate.",
        "price": 599.99,
        "stock": 55,
        "image_url": "https://example.com/nothingphone2.jpg"
    },
    {
        "name": "Sony Xperia 1 V",
        "description": "Professional-grade smartphone with 4K HDR OLED display, dedicated camera shutter button, and real-time tracking autofocus. Exmor T sensor for exceptional low-light performance. 3.5mm headphone jack and front-facing stereo speakers.",
        "price": 1399.99,
        "stock": 20,
        "image_url": "https://example.com/xperia1v.jpg"
    }
]

# Sample users for testing
SAMPLE_USERS = [
    {
        "username": "testuser1",
        "email": "testuser1@example.com",
        "hashed_password": "hashed_password_123"  # In production, use proper hashing
    },
    {
        "username": "testuser2",
        "email": "testuser2@example.com",
        "hashed_password": "hashed_password_456"
    },
    {
        "username": "admin",
        "email": "admin@phoneecommerce.com",
        "hashed_password": "hashed_admin_password"
    }
]


def create_tables():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    UserBase.metadata.create_all(bind=engine)
    print("Tables created successfully!")


def seed_products(db):
    """Seed the database with phone products."""
    print("Seeding products...")
    
    # Check if products already exist
    existing_count = db.query(Product).count()
    if existing_count > 0:
        print(f"Found {existing_count} existing products. Skipping product seeding.")
        return
    
    for product_data in PHONE_PRODUCTS:
        product = Product(
            name=product_data["name"],
            description=product_data["description"],
            price=product_data["price"],
            stock=product_data["stock"],
            image_url=product_data["image_url"]
        )
        db.add(product)
    
    db.commit()
    print(f"Successfully seeded {len(PHONE_PRODUCTS)} products!")


def seed_users(db):
    """Seed the database with sample users."""
    print("Seeding users...")
    
    # Check if users already exist
    existing_count = db.query(User).count()
    if existing_count > 0:
        print(f"Found {existing_count} existing users. Skipping user seeding.")
        return
    
    for user_data in SAMPLE_USERS:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            hashed_password=user_data["hashed_password"]
        )
        db.add(user)
    
    db.commit()
    print(f"Successfully seeded {len(SAMPLE_USERS)} users!")


def list_products(db):
    """List all products in the database."""
    print("\n--- Current Products in Database ---")
    products = db.query(Product).all()
    
    if not products:
        print("No products found.")
        return
    
    for product in products:
        print(f"ID: {product.id}")
        print(f"  Name: {product.name}")
        print(f"  Price: ${product.price:.2f}")
        print(f"  Stock: {product.stock}")
        print(f"  Description: {product.description[:100]}...")
        print()


def clear_database(db):
    """Clear all data from the database (use with caution)."""
    print("Clearing database...")
    db.query(Product).delete()
    db.query(User).delete()
    db.commit()
    print("Database cleared!")


def main():
    """Main function to run the seeding process."""
    print("=" * 50)
    print("Phone E-commerce Database Seeder")
    print("=" * 50)
    
    # Create tables
    create_tables()
    
    # Create session
    db = SessionLocal()
    
    try:
        # Seed data
        seed_products(db)
        seed_users(db)
        
        # Display seeded products
        list_products(db)
        
        print("=" * 50)
        print("Database seeding completed successfully!")
        print("=" * 50)
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Database seeder for Phone E-commerce App")
    parser.add_argument("--clear", action="store_true", help="Clear database before seeding")
    parser.add_argument("--list", action="store_true", help="Only list current products")
    
    args = parser.parse_args()
    
    if args.list:
        db = SessionLocal()
        list_products(db)
        db.close()
    elif args.clear:
        db = SessionLocal()
        clear_database(db)
        db.close()
        main()
    else:
        main()