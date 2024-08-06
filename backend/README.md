# Song Playlist API

This is a Flask-based REST API for managing and querying song playlists.

## Features

- Load and normalize song data from JSON files
- Retrieve all songs with pagination
- Get song details by title
- Rate songs

## Setup

1. Clone and navigate to backend:
   ```
   git clone https://github.com/yourusername/song-playlist-api.git
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```
   python run.py
   ```

## Running the Application

To run the application in development mode:

```
python run.py
```

The API will be available at `http://localhost:5000`.

## Running Tests

To run the tests, in the root directory (/backend):

```
pytest
```

## API Endpoints

- GET `/songs?page=1&per_page=10`: Get all songs (paginated)
- GET `/songs/<title>`: Get a specific song by title
- POST `/songs/<id>/rate`: Rate a song (requires a JSON body with a "rating" field)
