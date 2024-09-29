"use client";

type ResultsProps = {
	results: any | null;
};

export default function Results(props: ResultsProps) {
	const { status, results } = props.results;

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
