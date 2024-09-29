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

	// useEffect(() => {
	// 	const videoPlayer = videoRef.current as HTMLVideoElement;
	// 	const duration = videoPlayer.duration;
	// 	// console.log(duration);
	// 	// console.log(timeClicked);
	// 	// console.log(duration * timeClicked);
	// 	videoRef.current?.fastSeek(duration * timeClicked);
	// }, [timeClicked]);
	//

	return (
		<div className="w-screen h-screen flex bg-slate-400 justify-center pt-5 flex-col items-center">
			<Form />

			<Tooltip id="tooltipId" />
			{/* <div className="w-8/12">
				<video src={props.src} controls onTimeUpdate={timeUpdateHandler} ref={videoRef} />
				<Timeline
					tags={
						[
							// { message: "Tag1", timestamp: 0.24 },
							// { message: "Tag2", timestamp: 0.56 }
						]
					}
					cursor={progress}
					setTimeClicked={setTimeClicked}
				/>
			</div> */}
		</div>
	);
}
