from sqlalchemy import Column, Integer, String, Float, Text
from app.db.database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(Text)
    price = Column(Float)
    stock = Column(Integer, default=0)
    image_url = Column(String(500), nullable=True)

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, price={self.price})>"