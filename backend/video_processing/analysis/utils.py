from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

def compare_texts(text1, text2):
    """Compare two texts and return their similarity score."""
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return similarity

def clean_json_strings(data):
    if isinstance(data, dict):
        return {k: clean_json_strings(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_json_strings(item) for item in data]
    elif isinstance(data, str):
        # Remove JSON formatting markers and 'json' string
        cleaned = data.strip().strip('`').strip()
        if cleaned.lower().startswith('json'):
            cleaned = cleaned[4:].strip()
        if cleaned.startswith('{') and cleaned.endswith('}'):
            try:
                return json.loads(cleaned)
            except json.JSONDecodeError:
                return cleaned
        return cleaned
    else:
        return data
