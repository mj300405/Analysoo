"use client";

type ResultsProps = {
	results: any | null;
};

const fakeJson = {
	status: "COMPLETED",
	results: {
		readability: {
			gunning_fog_index: 8.05,
			flesch_reading_ease: 60.01
		},
		text_analysis: {
			sentiment:
				'{\n    "overall_sentiment": "negatywny",\n    "emotion_score": {\n        "radość": 0,\n        "smutek": 0.4,\n        "złość": 0.6,\n        "strach": 0,\n        "zaskoczenie": 0.1\n    },\n    "explanation": "Ten tekst ma negatywny sentyment, ponieważ opisuje niegospodarne i niecelowe wydatkowanie środków publicznych, co jest negatywne dla społeczności. Odbiorcy mogą czuć smutek i złość z powodu tego niewłaściwego zarządzania funduszami."\n}',
			key_phrases:
				'\n{\n    "main_topics": ["audyt", "środki publiczne", "dotacje", "niegospodarność", "niecelowość wydatków", "kryteria konkursowe"],\n    "key_phrases": ["96 podmiotów", "około 100 miliardów złotych", "niegospodarne i niecelowe wydatkowanie", "udzielenie dotacji podmiotom, które nie spełniały kryteriów konkursowych"],\n    "summary": "Przeprowadzony audyt na 96 podmiotach o wartości ok. 100 mld zł ujawnił niegospodarność i niecelowe wydatkowanie środków publicznych, w tym udzielanie dotacji podmiotom nie spełniającym kryteriów konkursowych."\n}',
			speech_errors:
				'{\n    "grammatical_errors": [\n        {"error": "udzielenie dotacji podmiotów", "correction": "udzielenie dotacji podmiotom"}\n    ],\n    "stylistic_issues": [],\n    "overall_quality": "wysoka"\n}',
			target_audience:
				'{\n    "age_group": "dorosli",\n    "education_level": "wyższe",\n    "expertise": "zaawansowany",\n    "interests": ["audyt", "finanse", "prawo", "polityka"],\n    "explanation": "Tekst jest związany z audytem finansowym i prawnym, a więc wymaga zaawansowanej wiedzy specjalistycznej. Jest skierowany do osób dorosłych z wyższym wykształceniem, które interesują się tymi tematami."\n}',
			subtitle_quality:
				'{\n    "accuracy": "wysoka",\n    "grammar": "poprawna",\n    "formatting": "dobra",\n    "overall_quality": "wysoka",\n    "improvement_suggestions": ["Poprawić interpunkcję dodając przecinki tam, gdzie są wymagane: ...udzielenie dotacji podmiotom, które nie spełniały kryteriów konkursowych."]\n}',
			comprehensibility:
				'{\n    "score": 9,\n    "explanation": "Tekst jest klarowny i dobrze sformułowany, z jednym wyjątkiem – brakuje informacji, czy podmioty, które nie spełniały kryteriów konkursowych, otrzymały dotacje.",\n    "clarity": "wysoka",\n    "structure": "dobra",\n    "vocabulary": "średnie"\n}',
			language_detection:
				'\n            {\n                "main_language": "polski",\n                "confidence": "wysoka",\n                "foreign_phrases": [],\n                "dialects": []\n            }',
			generated_questions:
				'\n            {\n                "questions": [\n                    {"question": "Ile podmiotów zostało objętych audytem?", "type": "faktograficzne"},\n                    {"question": "Jaka była łączna kwota badanych środków publicznych?", "type": "faktograficzne"},\n                    {"question": "Jakie nieprawidłowości stwierdzono w toku działań?", "type": "faktograficzne"},\n                    {"question": "Czy wszystkie podmioty, które otrzymały dotacje, spełniały kryteria konkursowe?", "type": "analityczne"},\n                    {"question": "Jakie mogą być rezultaty niegospodarnego i niecelowego wydatkowania środków publicznych?", "type": "opiniotwórcze"}\n                ]\n            }',
			structure_assessment:
				'\n{\n    "introduction": {"present": true, "quality": "dobra"},\n    "main_body": {"present": true, "quality": "dobra"},\n    "conclusion": {"present": false, "quality": "słaba"},\n    "logical_flow": "dobry",\n    "overall_assessment": "Wypowiedź ma dobrą strukturę, ale brakuje jej wyraźnej konkluzji."\n}',
			speaker_identification:
				'{\n    "speaker_count": 1,\n    "confidence": "wysoka",\n    "explanation": "Tekst jest zapisem jednobiegunowej wypowiedzi. Piszący używa pierwszej osoby liczby mnogiej (\'my\'), ale nie jest to rozmowa, w której uczestniczyłby ktoś inny, dlatego liczba mówiących osób to 1."\n}'
		},
		transcription:
			"Audytem objęliśmy 96 podmiotów, a łączna kwota badanych środków publicznych to około 100 miliardów złotych. W toku działań stwierdziliśmy m.in. niegospodarne i niecelowe wydatkowanie środków publicznych, udzielenie dotacji podmiotów, które nie spełniały kryteriów konkursowych.",
		speech_quality: {
			pauses: 8,
			speech_ratio: 0.4014637184677671,
			average_pause_duration: 2402.375
		},
		video_analysis: {
			emotions: {
				sad: 21.940327259279236,
				fear: 21.068914325837493,
				angry: 50.831223784878425,
				happy: 0.45466447044259695,
				disgust: 1.4705235539851256,
				neutral: 2.6324682899926017,
				surprise: 1.6018788774620727
			},
			gestures: "Face detected",
			movements: "Body movement detected"
		}
	}
};

export default function Results(props: ResultsProps) {
	const { status, results } = fakeJson;

	return (
		<div className="p-6 bg-gray-100 overflow-auto">
			<h1 className="text-2xl font-bold mb-4">Analysis Status: {status}</h1>

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
					<p>
						<strong>Overall Sentiment:</strong> {JSON.parse(results.text_analysis.sentiment).overall_sentiment}
					</p>
					<p>
						<strong>Emotion Score:</strong>
					</p>
					<ul className="list-disc ml-6">
						{Object.entries(JSON.parse(results.text_analysis.sentiment).emotion_score).map(([emotion, score]) => (
							<li key={emotion}>
								{emotion}: {score}
							</li>
						))}
					</ul>
					<p>
						<strong>Explanation:</strong> {JSON.parse(results.text_analysis.sentiment).explanation}
					</p>
				</div>

				{/* Key Phrases */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Key Phrases</h3>
					<p>
						<strong>Main Topics:</strong> {JSON.parse(results.text_analysis.key_phrases).main_topics.join(", ")}
					</p>
					<p>
						<strong>Key Phrases:</strong> {JSON.parse(results.text_analysis.key_phrases).key_phrases.join(", ")}
					</p>
					<p>
						<strong>Summary:</strong> {JSON.parse(results.text_analysis.key_phrases).summary}
					</p>
				</div>

				{/* Speech Errors */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Speech Errors</h3>
					<ul className="list-disc ml-6">
						{JSON.parse(results.text_analysis.speech_errors).grammatical_errors.map((error, index) => (
							<li key={index}>
								<strong>Error:</strong> {error.error}, <strong>Correction:</strong> {error.correction}
							</li>
						))}
					</ul>
					<p>
						<strong>Overall Quality:</strong> {JSON.parse(results.text_analysis.speech_errors).overall_quality}
					</p>
				</div>

				{/* Target Audience */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Target Audience</h3>
					<p>
						<strong>Age Group:</strong> {JSON.parse(results.text_analysis.target_audience).age_group}
					</p>
					<p>
						<strong>Education Level:</strong> {JSON.parse(results.text_analysis.target_audience).education_level}
					</p>
					<p>
						<strong>Expertise:</strong> {JSON.parse(results.text_analysis.target_audience).expertise}
					</p>
					<p>
						<strong>Interests:</strong> {JSON.parse(results.text_analysis.target_audience).interests.join(", ")}
					</p>
					<p>
						<strong>Explanation:</strong> {JSON.parse(results.text_analysis.target_audience).explanation}
					</p>
				</div>
			</section>

			{/* Speech Quality Section */}
			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Speech Quality</h2>
				<p>
					<strong>Pauses:</strong> {results.speech_quality.pauses}
				</p>
				<p>
					<strong>Speech Ratio:</strong> {results.speech_quality.speech_ratio.toFixed(2)}
				</p>
				<p>
					<strong>Average Pause Duration:</strong> {results.speech_quality.average_pause_duration} ms
				</p>
			</section>

			{/* Video Analysis Section */}
			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Video Analysis</h2>

				{/* Emotions */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Emotions</h3>
					<ul className="list-disc ml-6">
						{Object.entries(results.video_analysis.emotions).map(([emotion, score]) => (
							<li key={emotion}>
								{emotion}: {score.toFixed(2)}%
							</li>
						))}
					</ul>
				</div>

				{/* Gestures and Movements */}
				<p>
					<strong>Gestures:</strong> {results.video_analysis.gestures}
				</p>
				<p>
					<strong>Movements:</strong> {results.video_analysis.movements}
				</p>
			</section>
		</div>
	);
}
