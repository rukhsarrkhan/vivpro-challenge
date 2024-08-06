import pytest
from app import create_app, db
from app.models import Song
import json

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

@pytest.fixture
def sample_songs():
    songs = [
        Song(id="1", title="Song 1", danceability=0.5),
        Song(id="2", title="Song 2", danceability=0.7),
        Song(id="3", title="Song 3", danceability=0.6)
    ]
    db.session.add_all(songs)
    db.session.commit()

def test_get_songs(client, sample_songs):
    response = client.get('/songs')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['songs']) == 3
    assert data['total'] == 3
    assert data['pages'] == 1
    assert data['current_page'] == 1

def test_get_songs_pagination(client, sample_songs):
    response = client.get('/songs?page=1&per_page=2')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['songs']) == 2
    assert data['total'] == 3
    assert data['pages'] == 2
    assert data['current_page'] == 1

def test_get_song_by_title(client, sample_songs):
    response = client.get('/songs/Song%201')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == "Song 1"

def test_get_song_by_title_not_found(client, sample_songs):
    response = client.get('/songs/Nonexistent%20Song')
    assert response.status_code == 404

def test_rate_song(client, sample_songs):
    response = client.post('/songs/1/rate', json={'rating': 4})
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['rating'] == 4

def test_rate_song_invalid_rating(client, sample_songs):
    response = client.post('/songs/1/rate', json={'rating': 6})
    assert response.status_code == 400

def test_rate_song_not_found(client, sample_songs):
    response = client.post('/songs/999/rate', json={'rating': 4})
    assert response.status_code == 404