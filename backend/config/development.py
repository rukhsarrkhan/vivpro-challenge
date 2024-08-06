class DevelopmentConfig:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///songs_dev.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False