"use client";
import axios from "axios";

export default function Form() {
	function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		axios.post("localhost:8000/api/video/upload/", formData).then((response) => {
			console.log(response);
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" name="video" id="video" />
			<input type="submit" value="Wyslij" />
		</form>
	);
}
