"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
	try {
		const parsedURL = new URL(url);
		const hostname = parsedURL.hostname;
		if (
			hostname.includes("amazon.com") ||
			hostname.includes("amazon.") ||
			hostname.endsWith("amazon")
		)
			return true;
	} catch (e) {
		return false;
	}
};

const SeaerchBar = () => {
	const [searchPrompt, setsearchPrompt] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(searchPrompt);
		const isValidLink = isValidAmazonProductURL(searchPrompt);

		if (!isValidLink) return alert("Please provide a valid link!!");

		try {
			setLoading(true);
			//Scrape the error
			const product = await scrapeAndStoreProduct(searchPrompt);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
			<input
				type="text"
				placeholder="Enter product link"
				className="searchbar-input"
				value={searchPrompt}
				onChange={(e) => setsearchPrompt(e.target.value)}
				
			/>
			<button disabled={searchPrompt === ""} type="submit" className="searchbar-btn">
				{loading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default SeaerchBar;
