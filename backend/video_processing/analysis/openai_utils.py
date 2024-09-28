import openai
import json
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

def call_openai_api(prompt, content):
    """Call OpenAI API for various tasks."""
    if prompt == "whisper":
        transcript = openai.Audio.transcribe("whisper-1", content)
        return transcript["text"]
    else:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Jesteś ekspertem w analizie języka polskiego i komunikacji. Twoim zadaniem jest szczegółowa analiza podanego tekstu. Odpowiadaj zawsze w języku polskim, zwracając wyniki w formacie JSON zgodnie z podanym schematem."},
                {"role": "user", "content": f"{prompt}\n\nTEKST DO ANALIZY:\n{content}"}
            ]
        )
        
        try:
            return json.loads(response.choices[0].message['content'])
        except json.JSONDecodeError:
            return {"error": "Nie udało się przetworzyć odpowiedzi do formatu JSON"}