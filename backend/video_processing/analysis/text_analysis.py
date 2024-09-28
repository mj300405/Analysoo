import textstat
from .openai_utils import call_openai_api

def assess_readability(text):
    """Assess readability of the text."""
    flesch_score = textstat.flesch_reading_ease(text)
    gunning_fog = textstat.gunning_fog(text)
    return {
        "flesch_reading_ease": flesch_score,
        "gunning_fog_index": gunning_fog
    }

def analyze_text_with_gpt(text, task):
    """Analyze text using GPT-4 for various tasks."""
    prompts = {
        "comprehensibility": """
        Przeanalizuj poniższy tekst pod kątem jego zrozumiałości i zwróć wynik w formacie JSON:
        {
            "score": <ocena od 1 do 10>,
            "explanation": "<krótkie wyjaśnienie oceny>",
            "clarity": "<ocena jasności przekazu: wysoka/średnia/niska>",
            "structure": "<ocena struktury logicznej: dobra/średnia/słaba>",
            "vocabulary": "<ocena trudności słownictwa: łatwe/średnie/trudne>"
        }
        """,
        "sentiment": """
        Przeprowadź analizę sentymentu dla poniższego tekstu i zwróć wynik w formacie JSON:
        {
            "overall_sentiment": "<pozytywny/neutralny/negatywny>",
            "emotion_score": {
                "radość": <0-1>,
                "smutek": <0-1>,
                "złość": <0-1>,
                "strach": <0-1>,
                "zaskoczenie": <0-1>
            },
            "explanation": "<krótkie wyjaśnienie analizy>"
        }
        """,
        "key_phrases": """
        Wyodrębnij główne idee i kluczowe frazy z poniższego tekstu i zwróć wynik w formacie JSON:
        {
            "main_topics": ["<temat1>", "<temat2>", ...],
            "key_phrases": ["<fraza1>", "<fraza2>", ...],
            "summary": "<krótkie podsumowanie głównych punktów>"
        }
        """,
        "generated_questions": """
        Na podstawie poniższego tekstu wygeneruj 5 pytań i zwróć je w formacie JSON:
        {
            "questions": [
                {"question": "<pytanie1>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                {"question": "<pytanie2>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                {"question": "<pytanie3>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                {"question": "<pytanie4>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                {"question": "<pytanie5>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"}
            ]
        }
        """,
        "speaker_identification": """
        Przeanalizuj poniższy tekst pod kątem liczby mówiących osób i zwróć wynik w formacie JSON:
        {
            "speaker_count": <liczba mówców>,
            "confidence": "<wysoka/średnia/niska>",
            "explanation": "<krótkie wyjaśnienie analizy>"
        }
        """,
        "language_detection": """
        Przeanalizuj poniższy tekst pod kątem użytego języka i zwróć wynik w formacie JSON:
        {
            "main_language": "<główny język>",
            "confidence": "<wysoka/średnia/niska>",
            "foreign_phrases": [
                {"phrase": "<fraza1>", "language": "<język1>"},
                {"phrase": "<fraza2>", "language": "<język2>"},
                ...
            ],
            "dialects": ["<dialekt1>", "<dialekt2>", ...]
        }
        """,
        "structure_assessment": """
        Oceń strukturę poniższej wypowiedzi i zwróć wynik w formacie JSON:
        {
            "introduction": {"present": <true/false>, "quality": "<dobra/średnia/słaba>"},
            "main_body": {"present": <true/false>, "quality": "<dobra/średnia/słaba>"},
            "conclusion": {"present": <true/false>, "quality": "<dobra/średnia/słaba>"},
            "logical_flow": "<dobry/średni/słaby>",
            "overall_assessment": "<krótka ogólna ocena struktury>"
        }
        """,
        "target_audience": """
        Określ grupę docelową dla poniższego tekstu i zwróć wynik w formacie JSON:
        {
            "age_group": "<przedział wiekowy>",
            "education_level": "<poziom wykształcenia>",
            "expertise": "<poziom wiedzy specjalistycznej: podstawowy/średni/zaawansowany>",
            "interests": ["<zainteresowanie1>", "<zainteresowanie2>", ...],
            "explanation": "<krótkie uzasadnienie oceny>"
        }
        """,
        "speech_errors": """
        Zidentyfikuj potencjalne błędy językowe w poniższym tekście i zwróć wynik w formacie JSON:
        {
            "grammatical_errors": [
                {"error": "<błąd1>", "correction": "<poprawka1>"},
                {"error": "<błąd2>", "correction": "<poprawka2>"},
                ...
            ],
            "stylistic_issues": ["<problem1>", "<problem2>", ...],
            "overall_quality": "<wysoka/średnia/niska>"
        }
        """,
        "subtitle_quality": """
        Oceń jakość napisów na podstawie poniższego tekstu i zwróć wynik w formacie JSON:
        {
            "accuracy": "<wysoka/średnia/niska>",
            "grammar": "<poprawna/średnia/słaba>",
            "formatting": "<dobra/średnia/słaba>",
            "overall_quality": "<wysoka/średnia/niska>",
            "improvement_suggestions": ["<sugestia1>", "<sugestia2>", ...]
        }
        """
    }
    
    return call_openai_api(prompts[task], text)