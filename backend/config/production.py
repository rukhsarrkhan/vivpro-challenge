class ProductionConfig:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///songs_prod.db'  # You might want to use a different database in production
    SQLALCHEMY_TRACK_MODIFICATIONS = False