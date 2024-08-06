from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # CORS allows only mentioned frontend domains and methods
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000","http://localhost:3001"]}}, supports_credentials=True, methods=['GET', 'POST', 'DELETE', 'PUT'], allow_headers=['Content-Type', 'Authorization'])

    
    # Using the development and testing config for now, production is created thinking about future needs
    if config_name == 'development':
        app.config.from_object('config.development.DevelopmentConfig')
    elif config_name == 'production':
        app.config.from_object('config.production.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('config.testing.TestingConfig')
    
    db.init_app(app)
    
    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)