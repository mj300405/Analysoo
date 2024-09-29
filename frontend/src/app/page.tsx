"use client";
import VideoPlayer from "@/components/VideoPlayer";
import Form from "@/components/Form";
import { useState } from "react";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);

	return (
		<div className="w-screen h-screen flex bg-slate-400 justify-center pt-5 flex-col items-center overflow-scroll">
			{file !== null && <VideoPlayer src={file} />}
			<Form file={file} setFile={setFile} />
		</div>
	);
}
