function padTo2Digits(num: number) {
	return num.toString().padStart(2, "0");
}

export function millisFormat(millis: number) {
	const minutes = Math.floor(millis / 60000);
	const seconds = Math.round((millis % 60000) / 1000);

	return seconds === 60
		? `${padTo2Digits(minutes + 1)}:00`
		: `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
