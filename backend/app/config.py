from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    AI_MODEL: str

    class Config:
        env_file = ".env"

settings = Settings()