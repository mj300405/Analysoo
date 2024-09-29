"use client";

import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import Timeline from "./timeline/Timeline";
import Form from "./Form";

type VideoPlayerProsp = {
	src: string;
};

export default function VideoPlayer(props: VideoPlayerProsp) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [progress, setProgress] = useState<number>(0);
	const [timeClicked, setTimeClicked] = useState<number>(0);

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
				<video src={props.src} controls onTimeUpdate={timeUpdateHandler} ref={videoRef} />
				{/* <Timeline
					tags={[
						{ message: "Tag1", timestamp: 0.24 },
						{ message: "Tag2", timestamp: 0.56 }
					]}
					cursor={progress}
					setTimeClicked={setTimeClicked}
				/> */}
			</div>
		</>
	);
}
