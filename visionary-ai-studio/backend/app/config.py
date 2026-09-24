from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str
    access_token_expire_minutes: int = 10080  # 7 days
    database_url: str = "sqlite:///./visionary.db"
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()