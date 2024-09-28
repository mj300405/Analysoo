"use client";
import React, { useState, useRef, useEffect } from "react";
import "./VideoTimeline.css";

// Define types for tags
interface Tag {
	time: number; // The time in seconds where the tag will appear
	label: string; // Label of the tag
	description: string; // Description shown when hovering or clicking the tag
}

// Props for the VideoTimeline component
interface VideoTimelineProps {
	src: string; // Source URL for the video
	tags: Tag[]; // Array of tag objects
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ src, tags }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null); // Video reference
	const [currentTime, setCurrentTime] = useState<number>(0); // Video's current time
	const [hoveredTag, setHoveredTag] = useState<Tag | null>(null); // Tag to show tooltip for

	// Update the current time when the video is playing
	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	// Function to seek to a specific time in the video
	const seekToTime = (time: number) => {
		if (videoRef.current) {
			videoRef.current.currentTime = time;
		}
	};

	return (
		<div className="video-container">
			<video ref={videoRef} className="video-player" src={src} controls onTimeUpdate={handleTimeUpdate}></video>

			{/* Timeline with Tags */}
			<div className="timeline-container">
				{tags.map((tag, index) => (
					<div
						key={index}
						className="tag"
						style={{ left: `${(tag.time / (videoRef.current?.duration || 1)) * 100}%` }} // Safeguard against duration being undefined
						onClick={() => seekToTime(tag.time)}
						onMouseEnter={() => setHoveredTag(tag)}
						onMouseLeave={() => setHoveredTag(null)}
					>
						<span className="tag-marker">●</span>
						{hoveredTag === tag && (
							<div className="tag-description">
								<strong>{tag.label}</strong>
								<p>{tag.description}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

// Sample usage of the VideoTimeline component
export default function ChatTimeline() {
	const tags: Tag[] = [
		{ time: 10, label: "Tag 1", description: "This is the first tag description." },
		{ time: 30, label: "Tag 2", description: "This is the second tag description." },
		{ time: 50, label: "Tag 3", description: "This is the third tag description." }
	];

	return (
		<div className="App">
			<h1>Video Timeline with Custom Tags</h1>
			<VideoTimeline src="https://www.w3schools.com/html/mov_bbb.mp4" tags={tags} />
		</div>
	);
}
