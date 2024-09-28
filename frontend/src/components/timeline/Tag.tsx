"use client";

import { useEffect, useRef, useState } from "react";

export default function Tag(props: { message: string; place: number }) {
	const tagRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState<number>(0);

	useEffect(() => {
		if (tagRef.current) {
			setOffset(tagRef.current.getBoundingClientRect().width / 2);
		}
	}, []);
	return (
		<div
			className="bg-red-600 w-4 relative min-h-10 float-left"
			style={{ left: `${props.place - offset}px` }}
			data-tooltip-id="tooltipId"
			data-tooltip-content={props.message}
			data-tooltip-place="bottom"
		></div>
	);
}
