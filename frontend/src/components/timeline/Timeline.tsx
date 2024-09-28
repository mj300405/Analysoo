"use client";

import Tag from "./Tag";
import { TagData } from "@/types/TagData";
import { time } from "console";
import { useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import { Dispatch, SetStateAction } from "react";

type TimelineProps = {
	tags: TagData[];
	cursor: number;
	setTimeClicked: Dispatch<SetStateAction<number>>;
};

export default function Timeline(props: TimelineProps) {
	const timelineRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(0);

	function onClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const target = event.target as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		props.setTimeClicked(x / width);
	}

	useEffect(() => {
		if (timelineRef.current) setWidth(timelineRef.current.getBoundingClientRect().width);
	}, []);

	return (
		<div className="w-full min-h-10 max-h-15 bg-slate-800" ref={timelineRef} onClick={onClickHandler}>
			<Cursor place={props.cursor * width} />
			{props.tags.map((tag, index) => (
				<Tag key={index} message={tag.message} place={tag.timestamp * width} />
			))}
		</div>
	);
}
