import json
from typing import Dict
import pandas as pd

class SongDataProcessor:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.normalized_data = None

    def load_data(self) -> Dict:
        with open(self.file_path, 'r') as file:
            return json.load(file)

    def normalize_data(self) -> pd.DataFrame:
        data = self.load_data()
        normalized = []

        for i in range(len(data['id'])):
            song = {attr: data[attr][str(i)] for attr in data.keys()}
            normalized.append(song)

        self.normalized_data = pd.DataFrame(normalized)
        
        # added an index for ordered data in the db
        self.normalized_data.insert(0, 'index', range(len(self.normalized_data)))
        
        if 'id' not in self.normalized_data.columns:
            self.normalized_data['id'] = ''
        if 'title' not in self.normalized_data.columns:
            self.normalized_data['title'] = ''
        
        # orgnaized the columns according to example in problem statement
        cols = ['index', 'id', 'title'] + [col for col in self.normalized_data.columns if col not in ['index', 'id', 'title']]
        self.normalized_data = self.normalized_data[cols]
        
        return self.normalized_data

    def save_to_csv(self, output_path: str) -> None:
        if self.normalized_data is None:
            self.normalize_data()
        self.normalized_data.to_csv(output_path, index=False)