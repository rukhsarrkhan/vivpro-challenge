import pytest
from app.models import Song
from app import db

@pytest.fixture
def sample_song():
    return Song(
        id="1",
        title="Test Song",
        index="0",
        danceability=0.5,
        energy=0.7,
        key=1,
        loudness=-5.0,
        mode=1,
        acousticness=0.1,
        instrumentalness=0.0,
        liveness=0.2,
        valence=0.6,
        tempo=120.0,
        duration_ms=200000,
        time_signature=4,
        num_bars=50,
        num_sections=5,
        num_segments=100,
        class_=1,
        rating=0
    )

def test_song_creation(sample_song):
    assert sample_song.id == "1"
    assert sample_song.title == "Test Song"
    assert sample_song.danceability == 0.5

def test_song_to_dict(sample_song):
    song_dict = sample_song.to_dict()
    assert song_dict['id'] == "1"
    assert song_dict['title'] == "Test Song"
    assert song_dict['danceability'] == 0.5
    assert 'rating' in song_dict