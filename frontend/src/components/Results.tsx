"use client";

type ResultsProps = {
	results: any | null;
};
const fake = {
	status: "COMPLETED",
	results: {
		readability: {
			gunning_fog_index: 15.33,
			flesch_reading_ease: 13.31
		},
		text_analysis: {
			sentiment: {
				explanation:
					"Tekst ma pozytywny wydźwięk, ponieważ informuje o rozwiązaniu problemu i zapewnia, że wszystkie usługi działają prawidłowo. Element zadowolenia wynika z naprawienia awarii, mimo że wcześniej miały miejsce trudności techniczne. Wprowadza uczucie ulgi i zaskoczenia, ale dominuje pozytywny ton wynikający z przywrócenia normalności.",
				emotion_score: {
					smutek: 0.1,
					strach: 0.2,
					radość: 0.6,
					złość: 0.1,
					zaskoczenie: 0.4
				},
				overall_sentiment: "pozytywny"
			},
			key_phrases: {
				summary:
					"Awaria infrastruktury IT została naprawiona, dzięki czemu wszystkie usługi resortu są dostępne, a dane podatników pozostają niezagrożone. Problemy były natury technicznej, ale Centrum Informatyki zdiagnozowało i rozwiązało je.",
				key_phrases: [
					"awaria infrastruktury IT",
					"usługi resortu dostępne",
					"dane podatników niezagrożone",
					"problemy techniczne",
					"Centrum Informatyki",
					"rozwiązanie problemu"
				],
				main_topics: ["awaria IT", "naprawa systemu", "dostępność usług", "bezpieczeństwo danych"]
			},
			speech_speed: {
				assessment: "Średnia szybkość mowy, odpowiednia dla większości słuchaczy.",
				speed_rating: 5,
				words_per_minute: 140,
				improvement_suggestions: [
					"Jeśli potrzebujesz bardziej dynamicznej prezentacji, zwiększ tempo mowy.",
					"Dla lepszego zrozumienia skomplikowanych informacji, utrzymuj umiarkowane tempo."
				]
			},
			speech_errors: {
				overall_quality: "wysoka",
				stylistic_issues: [],
				grammatical_errors: []
			},
			speech_clarity: {
				assessment:
					"Tekst jest jasny i wyraźny. Informacje są przekazane w sposób zrozumiały i precyzyjny, bez zbędnych szczegółów.",
				articulation: "dobra",
				pronunciation: "dobra",
				clarity_rating: 9,
				improvement_suggestions: [
					"Można dodać szczegóły dotyczące natury problemów technicznych, aby zwiększyć przejrzystość komunikatu.",
					"Można podać informacje o czasie trwania awarii oraz działaniach podjętych w celu jej rozwiązania."
				]
			},
			target_audience: {
				age_group: "25-60",
				expertise: "średni",
				interests: ["informatyka", "technologia", "administracja publiczna"],
				explanation:
					"Tekst jest napisany w formalnym, technicznym języku, który wskazuje na grupę docelową związaną z informatyką czy technologią. Poruszane są problemy infrastruktury IT, co sugeruje, że odbiorcy mają przynajmniej średni poziom wiedzy w tej dziedzinie. Ponadto, wzmianka o danych podatników i usługach resortu skierowana jest do osób zainteresowanych administracją publiczną.",
				education_level: "średnie/wysokie"
			},
			subtitle_quality: {
				grammar: "poprawna",
				accuracy: "wysoka",
				formatting: "dobra",
				overall_quality: "wysoka",
				improvement_suggestions: []
			},
			comprehensibility: {
				score: 8,
				clarity: "wysoka",
				structure: "dobra",
				vocabulary: "łatwe",
				explanation:
					"Tekst ma pozytywny wydźwięk, informuje o naprawieniu awarii i przywróceniu usług. Jest uspokajający, podkreśla brak zagrożenia dla danych."
			},
			facial_expressions: {
				assessment:
					"Wyrazy twarzy są zróżnicowane, jednak dominuje gniew, co może sugerować silne zaangażowanie emocjonalne. Śladowe ilości innych emocji wskazują na rozpiętość uczuć.",
				engagement_level: "wysoki",
				expression_variety: 8,
				dominant_expression: "angry",
				congruence_with_speech: "wysoka",
				improvement_suggestions: [
					"Zachowanie większej neutralności w sytuacjach publicznych",
					"Częstsze wyrażanie pozytywnych emocji, takich jak radość"
				]
			},
			language_detection: {
				dialects: [],
				confidence: "wysoka",
				main_language: "polski",
				foreign_phrases: []
			},
			overall_impression: {
				strengths: ["Szybka i skuteczna reakcja na problem", "Zrozumiała komunikacja i klarowne informacje"],
				weaknesses: [
					"Dominujące emocje negatywne (gniew, strach)",
					"Wysoka złożoność tła, co może odwracać uwagę widza"
				],
				credibility: "średnia",
				overall_rating: 4,
				engagement_level: "średni",
				overall_assessment:
					"Komunikat jest skuteczny w przekazaniu kluczowych informacji, jednakże prezentacja zawiera kilka elementów, które mogą negatywnie wpłynąć na percepcję widza, takie jak dominujące negatywne emocje i złożone tło.",
				key_improvement_areas: [
					"Kontrola emocji w trakcie prezentacji",
					"Stosowanie prostszego tła dla lepszej koncentracji widza"
				],
				professionalism_assessment: "średni"
			},
			background_elements: {
				assessment:
					"Dane są użyteczne, ale brakuje określonych informacji wizualnych dotyczących tła, co utrudnia pełną ocenę.",
				lighting_quality: "średnia",
				distracting_elements: ["brak szczegółowych informacji o tło", "brak opisu sceny"],
				professionalism_rating: 5,
				improvement_suggestions: [
					"Dodaj bardziej szczegółowy opis tła.",
					"Zamieść fotografie lub przykłady dla lepszej oceny.",
					"Oceń konkretne elementy wizualne, takie jak meble, dekoracje, itd."
				],
				background_appropriateness: "średnia"
			},
			generated_questions: {
				questions: [
					{
						type: "faktograficzne",
						question: "Jaka była przyczyna niedostępności usług resortu?"
					},
					{
						type: "faktograficzne",
						question: "Czy dane podatników były zagrożone podczas awarii?"
					},
					{
						type: "faktograficzne",
						question: "Który zespół zajął się diagnozowaniem i naprawą problemu technicznego?"
					},
					{
						type: "faktograficzne",
						question: "Jakie działania podjęto, aby naprawić awarię infrastruktury IT?"
					},
					{
						type: "analityczne",
						question:
							"Jakie mogą być potencjalne konsekwencje technicznych problemów w infrastrukturze IT dla podatników?"
					},
					{
						type: "opiniotwórcze",
						question: "Czy uważasz, że Centrum Informatyki zareagowało odpowiednio szybko na awarię?"
					},
					{
						type: "analityczne",
						question: "Jakie środki zapobiegawcze można wdrożyć, aby uniknąć podobnych awarii w przyszłości?"
					},
					{
						type: "faktograficzne",
						question: "W jaki sposób informowano użytkowników o stanie naprawy usług?"
					},
					{
						type: "opiniotwórcze",
						question: "Czy incydent ten wpłynął na zaufanie podatników do usług elektronicznych resortu? Dlaczego?"
					},
					{
						type: "opiniotwórcze",
						question: "Jak oceniasz sposób komunikacji resortu w sytuacji awarii infrastruktury IT?"
					}
				]
			},
			structure_assessment: {
				main_body: {
					present: true,
					quality: "dobra"
				},
				conclusion: {
					present: false,
					quality: "brak"
				},
				introduction: {
					present: true,
					quality: "średnia"
				},
				logical_flow: "średni",
				overall_assessment: "Tekst informacyjny jest zrozumiały, ale brakuje wyraźnej konkluzji."
			},
			speaker_identification: {
				confidence: "wysoka",
				explanation:
					"Cały tekst ma spójny charakter informacyjny, prawdopodobnie pochodzi od jednej instytucjonalnej jednostki (np. Centrum Informatyki lub innego przedstawiciela resortu). Nie ma żadnych wyraźnych zmian w stylu czy tonie, które mogłyby sugerować udział więcej niż jednej osoby.",
				speaker_count: 1
			}
		},
		transcription:
			"Informujemy, że awaria infrastruktury IT została naprawiona. Wszystkie usługi resortu są już dostępne, a dane podatników niezagrożone. Sytuacja była spowodowana problemami technicznymi. Centrum Informatyki zdiagnozowało przyczynę i rozwiązało problem.",
		speech_quality: {
			pauses: 2,
			speech_ratio: 0.5205797101449275,
			average_pause_duration: 5789.0
		},
		video_analysis: {
			gestures: "Face detected",
			movements: "Body movement detected",
			background: {
				assessment: "Complex",
				complexity: 311.3101160862355
			},
			facial_expressions: {
				emotions: {
					sad: 10.327172934855144,
					fear: 20.915749546472895,
					angry: 41.274849448482804,
					happy: 0.8049459752480239,
					disgust: 0.07890123775538847,
					neutral: 20.34077540785534,
					surprise: 6.25760639397692
				},
				dominant_emotion: "angry"
			}
		}
	}
};

const AnalysisComponent = (props: ResultsProps) => {
	const { status, results } = props.results;

	return (
		<div className="max-h-80 flex flex-col p-6 bg-gray-100">
			{/* Title Section */}
			<div className="flex-none">
				<h1 className="text-2xl font-bold mb-4">Analysis Status: {status}</h1>
			</div>

			{/* Scrollable Content */}
			<div className="flex-grow overflow-y-auto p-4 bg-white shadow-md rounded-md">
				{/* Readability Section */}
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Readability</h2>
					<p>
						<strong>Gunning Fog Index:</strong> {results.readability.gunning_fog_index}
					</p>
					<p>
						<strong>Flesch Reading Ease:</strong> {results.readability.flesch_reading_ease}
					</p>
				</section>

				{/* Text Analysis Section */}
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Text Analysis</h2>

					{/* Sentiment */}
					<div className="mb-4">
						<h3 className="text-lg font-medium">Sentiment</h3>
						{results.text_analysis?.sentiment && (
							<>
								<p>
									<strong>Overall Sentiment:</strong> {results.text_analysis.sentiment.overall_sentiment}
								</p>
								<p>
									<strong>Emotion Scores:</strong>
								</p>
								<ul className="list-disc ml-6">
									{Object.entries(results.text_analysis.sentiment.emotion_score).map(([emotion, score]) => (
										<li key={emotion}>
											{emotion}: {score}
										</li>
									))}
								</ul>
								<p>
									<strong>Explanation:</strong> {results.text_analysis.sentiment.explanation}
								</p>
							</>
						)}
					</div>

					{/* Key Phrases */}
					<div className="mb-4">
						<h3 className="text-lg font-medium">Key Phrases</h3>
						{results.text_analysis?.key_phrases && (
							<>
								<p>
									<strong>Main Topics:</strong> {results.text_analysis.key_phrases.main_topics.join(", ")}
								</p>
								<p>
									<strong>Key Phrases:</strong> {results.text_analysis.key_phrases.key_phrases.join(", ")}
								</p>
								<p>
									<strong>Summary:</strong> {results.text_analysis.key_phrases.summary}
								</p>
							</>
						)}
					</div>

					{/* Speech Errors */}
					<div className="mb-4">
						<h3 className="text-lg font-medium">Speech Errors</h3>
						{results.text_analysis?.speech_errors && (
							<>
								<ul className="list-disc ml-6">
									{results.text_analysis.speech_errors.grammatical_errors.map((error, index) => (
										<li key={index}>
											<strong>Error:</strong> {error.error}, <strong>Correction:</strong> {error.correction}
										</li>
									))}
								</ul>
								<p>
									<strong>Overall Quality:</strong> {results.text_analysis.speech_errors.overall_quality}
								</p>
							</>
						)}
					</div>

					{/* Video Analysis Section */}
					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Video Analysis</h2>

						{/* Emotions */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">Emotions</h3>
							{results.video_analysis?.emotions && (
								<ul className="list-disc ml-6">
									{Object.entries(results.video_analysis.emotions).map(([emotion, score]) => (
										<li key={emotion}>
											{emotion}: {score.toFixed(2)}%
										</li>
									))}
								</ul>
							)}
						</div>

						{/* Gestures and Movements */}
						<p>
							<strong>Gestures:</strong> {results.video_analysis?.gestures || "N/A"}
						</p>
						<p>
							<strong>Movements:</strong> {results.video_analysis?.movements || "N/A"}
						</p>
					</section>
				</section>
			</div>
		</div>
	);
};

export default AnalysisComponent;
