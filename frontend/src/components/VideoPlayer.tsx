"use client";

import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

type VideoPlayerProps = {
	src: File;
};

export default function VideoPlayer(props: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [progress, setProgress] = useState<number>(0);
	const [fileURL, setFileURL] = useState<string>("");

	// Supported video MIME types
	const supportedMimeTypes = ["video/mp4", "video/webm", "video/ogg"];

	// Generate file URL only once when the component mounts
	useEffect(() => {
		// Check if the file type is supported
		if (supportedMimeTypes.includes(props.src.type)) {
			const url = URL.createObjectURL(props.src);
			setFileURL(url);

			// Clean up the URL when the component unmounts
			return () => {
				URL.revokeObjectURL(url);
			};
		} else {
			console.error("Unsupported video format: " + props.src.type);
			setFileURL(""); // Clear file URL if unsupported
		}
	}, [props.src]);

	const timeUpdateHandler: ReactEventHandler<HTMLVideoElement> = (event) => {
		const videoPlayer = event.target as HTMLVideoElement;
		const timestamp = videoPlayer.currentTime;
		const duration = videoPlayer.duration;
		const videoProgress = timestamp / duration;
		setProgress(videoProgress);
	};

	return (
		<>
			<Tooltip id="tooltipId" />
			<div className="w-2/6">
				{fileURL ? (
					<video src={fileURL} controls onTimeUpdate={timeUpdateHandler} ref={videoRef} />
				) : (
					<p>Unsupported video format. Please upload an MP4, WebM, or Ogg file.</p>
				)}
			</div>
		</>
	);
}
