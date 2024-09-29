import openai
from django.conf import settings

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def call_openai_api(prompt, content):
    """Call OpenAI API for various tasks."""
    if prompt == "whisper":
        with open(content, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
        return transcript.text
    else:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Jesteś ekspertem w analizie języka polskiego i komunikacji. Twoim zadaniem jest szczegółowa analiza podanego tekstu. Odpowiadaj zawsze w języku polskim, zwracając wyniki w formacie JSON zgodnie z podanym schematem."},
                {"role": "user", "content": f"{prompt}\n\nTEKST DO ANALIZY:\n{content}"}
            ]
        )
        
        return response.choices[0].message.content