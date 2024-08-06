class TestingConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///songs_test.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False