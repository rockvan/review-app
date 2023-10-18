import type { PageLoad } from './$types';
import quizData from '$quiz/quiz1.json';

export const load: PageLoad = async () => {
	return {
		quiz1: quizData
	};
};
