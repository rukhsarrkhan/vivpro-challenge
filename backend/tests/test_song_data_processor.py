import pytest
import pandas as pd
from app.services.song_data_processor import SongDataProcessor
import json
import os

@pytest.fixture
def sample_data():
    return {
        "id": {"0": "1", "1": "2"},
        "title": {"0": "Song 1", "1": "Song 2"},
        "danceability": {"0": 0.5, "1": 0.7}
    }

@pytest.fixture
def sample_file(tmp_path, sample_data):
    file_path = tmp_path / "sample_data.json"
    with open(file_path, 'w') as f:
        json.dump(sample_data, f)
    return file_path

def test_load_data(sample_file):
    processor = SongDataProcessor(sample_file)
    data = processor.load_data()
    assert data == {
        "id": {"0": "1", "1": "2"},
        "title": {"0": "Song 1", "1": "Song 2"},
        "danceability": {"0": 0.5, "1": 0.7}
    }

def test_normalize_data(sample_file):
    processor = SongDataProcessor(sample_file)
    normalized = processor.normalize_data()
    assert isinstance(normalized, pd.DataFrame)
    assert list(normalized.columns) == ['index', 'id', 'title', 'danceability']
    assert normalized.shape == (2, 4)

def test_save_to_csv(sample_file, tmp_path):
    processor = SongDataProcessor(sample_file)
    output_path = tmp_path / "output.csv"
    processor.save_to_csv(str(output_path))
    assert os.path.exists(output_path)
    df = pd.read_csv(output_path)
    assert list(df.columns) == ['index', 'id', 'title', 'danceability']
    assert df.shape == (2, 4)