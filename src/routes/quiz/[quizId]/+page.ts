import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const fetchQuiz_1 = async () => {
		const res = await fetch(`/src/lib/quiz/quiz1.json`); // Update the fetch URL to the correct path
		const quizData = await res.json();

		return quizData;
	};

	return {
		quiz1: await fetchQuiz_1()
	};
};
