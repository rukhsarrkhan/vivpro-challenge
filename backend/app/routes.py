from flask import Blueprint, jsonify, request
from app.models import Song
from app import db
from urllib.parse import unquote

main = Blueprint('main', __name__)

@main.route('/songs', methods=['GET'])
def get_songs():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    songs = Song.query.paginate(page=page, per_page=per_page, error_out=False)
    response = jsonify({
        'songs': [song.to_dict() for song in songs.items],
        'total': songs.total,
        'pages': songs.pages,
        'current_page': songs.page
    })
    return response

@main.route('/songs/<path:title>', methods=['GET'])
def get_song_by_title(title):
    # handled spacing in title name
    decoded_title = unquote(title)
    song = Song.query.filter(Song.title.ilike(f"%{decoded_title}%")).first()
    if song:
        return jsonify(song.to_dict())
    return jsonify({'error': 'Song not found'}), 404

@main.route('/songs/<string:id>/rate', methods=['POST'])
def rate_song(id):
    rating = request.json.get('rating')
    if not rating or not 1 <= rating <= 5:
        return jsonify({'error': 'Invalid rating'}), 400
    
    song = Song.query.get(id)
    if song:
        song.rating = rating
        db.session.commit()
        return jsonify(song.to_dict())
    return jsonify({'error': 'Song not found'}), 404