from app import create_app, db
from app.models import Song
from app.services.song_data_processor import SongDataProcessor

app = create_app()

def init_db():
    with app.app_context():
        db.create_all()
        if Song.query.count() == 0:
            processor = SongDataProcessor('data/playlist[76][36][48].json')
            data = processor.normalize_data()
            for _, row in data.iterrows():
                song_data = row.to_dict()
                if 'class' in song_data:
                    song_data['class_'] = song_data.pop('class')
                song = Song(**song_data)
                db.session.add(song)
            db.session.commit()

if __name__ == '__main__':
    init_db()
    app.run()