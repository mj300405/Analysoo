import textstat
import logging
from .openai_utils import call_openai_api

logger = logging.getLogger(__name__)

def assess_readability(text):
    """Assess readability of the text."""
    logger.info("Starting readability assessment")
    try:
        flesch_score = textstat.flesch_reading_ease(text)
        gunning_fog = textstat.gunning_fog(text)
        logger.info("Readability assessment completed successfully")
        return {
            "flesch_reading_ease": flesch_score,
            "gunning_fog_index": gunning_fog
        }
    except Exception as e:
        logger.error(f"Error in readability assessment: {str(e)}", exc_info=True)
        raise

def analyze_text_with_gpt(text, task):
    """Analyze text using GPT-4 for various tasks."""
    logger.info(f"Starting GPT analysis for task: {task}")
    try:
        prompts = {
            "comprehensibility": """
            Przeprowadź analizę sentymentu dla poniższego tekstu i zwróć wynik w formacie JSON bez żadnych dodatkowych oznaczeń (np. bez 'json' na początku lub znaczników ``):
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
            Na podstawie poniższego tekstu wygeneruj 10 pytań i zwróć je w formacie JSON:
            {
                "questions": [
                    {"question": "<pytanie1>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie2>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie3>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie4>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie5>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie6>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie7>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie8>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie9>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"},
                    {"question": "<pytanie10>", "type": "<typ pytania: faktograficzne/analityczne/opiniotwórcze>"}
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
            """,
            
            # New prompts
            "speech_speed": """
            Przeanalizuj poniższy tekst pod kątem szybkości mowy i zwróć wynik w formacie JSON:
            {
                "speed_rating": <ocena od 1 do 10, gdzie 1 to bardzo wolno, a 10 to bardzo szybko>,
                "words_per_minute": <szacunkowa liczba słów na minutę>,
                "assessment": "<krótka ocena szybkości mowy>",
                "improvement_suggestions": ["<sugestia1>", "<sugestia2>", ...]
            }
            """,
            "speech_clarity": """
            Przeanalizuj poniższy tekst pod kątem jasności i wyraźności mowy i zwróć wynik w formacie JSON:
            {
                "clarity_rating": <ocena od 1 do 10, gdzie 1 to bardzo niewyraźnie, a 10 to bardzo wyraźnie>,
                "articulation": "<ocena artykulacji: dobra/średnia/słaba>",
                "pronunciation": "<ocena wymowy: dobra/średnia/słaba>",
                "assessment": "<krótka ocena jasności mowy>",
                "improvement_suggestions": ["<sugestia1>", "<sugestia2>", ...]
            }
            """,
            "facial_expressions": """
            Przeanalizuj poniższe informacje o wyrazach twarzy i zwróć wynik w formacie JSON:
            {
                "expression_variety": <ocena od 1 do 10, gdzie 1 to bardzo monotonne, a 10 to bardzo zróżnicowane>,
                "dominant_expression": "<dominujący wyraz twarzy>",
                "engagement_level": "<poziom zaangażowania: wysoki/średni/niski>",
                "congruence_with_speech": "<zgodność z treścią wypowiedzi: wysoka/średnia/niska>",
                "assessment": "<krótka ocena wyrazów twarzy>",
                "improvement_suggestions": ["<sugestia1>", "<sugestia2>", ...]
            }
            """,
            "background_elements": """
            Przeanalizuj poniższe informacje o elementach tła i zwróć wynik w formacie JSON:
            {
                "professionalism_rating": <ocena od 1 do 10, gdzie 1 to bardzo nieprofesjonalne, a 10 to bardzo profesjonalne>,
                "distracting_elements": ["<element1>", "<element2>", ...],
                "lighting_quality": "<jakość oświetlenia: dobra/średnia/słaba>",
                "background_appropriateness": "<stosowność tła: wysoka/średnia/niska>",
                "assessment": "<krótka ocena elementów tła>",
                "improvement_suggestions": ["<sugestia1>", "<sugestia2>", ...]
            }
            """,
            "overall_impression": """
            Przeanalizuj poniższy tekst i informacje o wideo, aby ocenić ogólne wrażenie i zwróć wynik w formacie JSON:
            {
                "overall_rating": <ocena od 1 do 10, gdzie 1 to bardzo słabe, a 10 to doskonałe>,
                "strengths": ["<mocna strona1>", "<mocna strona2>", ...],
                "weaknesses": ["<słaba strona1>", "<słaba strona2>", ...],
                "professionalism_assessment": "<ocena ogólnego profesjonalizmu>",
                "engagement_level": "<poziom angażowania widza: wysoki/średni/niski>",
                "credibility": "<ocena wiarygodności: wysoka/średnia/niska>",
                "overall_assessment": "<krótka ogólna ocena>",
                "key_improvement_areas": ["<obszar1>", "<obszar2>", ...]
            }
            """
        }
        
        result = call_openai_api(prompts[task], text)
        logger.info(f"GPT analysis for task {task} completed successfully")
        return result
    except Exception as e:
        logger.error(f"Error in GPT analysis for task {task}: {str(e)}", exc_info=True)
        raise