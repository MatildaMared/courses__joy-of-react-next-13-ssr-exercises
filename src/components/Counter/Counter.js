"use client";
import React from "react";
import Spinner from "../Spinner/Spinner";

function Counter() {
	const [count, setCount] = React.useState(null);

	React.useEffect(() => {
		const savedCount = window.localStorage.getItem("saved-count");
		if (savedCount) {
			setCount(Number(savedCount));
		}
	}, []);

	React.useEffect(() => {
		window.localStorage.setItem("saved-count", count);
	}, [count]);

	return (
		<button className="count-btn" onClick={() => setCount(count + 1)}>
			Count: {count ? count : <Spinner />}
		</button>
	);
}

export default Counter;
