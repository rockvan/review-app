import type { Actions } from '@sveltejs/kit';

import { SECRET_FEEDBACK_API_KEY, SECRET_FEEDBACK_DB } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const feedback = data.get('feedback');

		if (
			!username ||
			!email ||
			!feedback ||
			typeof username !== 'string' ||
			typeof email !== 'string'
		) {
			throw new Error('⚠️  Form data is not valid');
		}

		try {
			const notionResponse = await fetch(`https://api.notion.com/v1/pages`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${SECRET_FEEDBACK_API_KEY}`,
					'Content-Type': 'application/json',
					'Notion-Version': '2022-06-28'
				},
				body: JSON.stringify({
					parent: {
						database_id: SECRET_FEEDBACK_DB
					},
					properties: {
						Name: {
							title: [
								{
									type: 'text',
									text: {
										content: username
									}
								}
							]
						},

						Email: {
							email: email
						},
						Feedback: {
							rich_text: [
								{
									type: 'text',
									text: {
										content: feedback
									}
								}
							]
						}
					}
				})
			});

			if (!notionResponse.ok) {
				throw new Error('⚠️  Request failed with status ' + notionResponse.status);
			}
			const data = await notionResponse.json();
			await data;
			console.log('✅  Entry added:', { username, email, feedback });
		} catch (error) {
			console.error('❌  Error adding entry:', error);
		}
	}
};
