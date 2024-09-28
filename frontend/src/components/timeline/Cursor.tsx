"use client";

export default function Cursor(props: { place: number }) {
	return <div className="bg-blue-600 w-2 relative min-h-10 float-left" style={{ left: `${props.place}px` }}></div>;
}
