<script lang="ts">
	import { page } from '$app/stores';
	import { bounceIn, bounceOut, elasticIn, elasticOut, quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	let currentIndex = 0;
	let selectedAnswer = '';
	let answerSubmitted = false;
	let score = 0;

	// RandomQuestion
	let shuffledQuestions: { [key: string]: any[] } = {
		'10-item-quiz1': shuffle($page.data.quiz1).slice(0, 10),
		'25-item-quiz1': shuffle($page.data.quiz1).slice(0, 25),
		'50-item-quiz1': shuffle($page.data.quiz1).slice(0, 50)
	};
	// Assign the value of shuffledQuestions10
	let shuffledQuestions10 = shuffledQuestions['10-item-quiz1'];
	let shuffledQuestions25 = shuffledQuestions['25-item-quiz1'];
	let shuffledQuestions50 = shuffledQuestions['50-item-quiz1'];

	$: currentQuestion = shuffledQuestions[$page.params.quizId][currentIndex];

	function shuffle(array: any[]) {
		let currentIndex = array.length,
			randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	function nextQuestion() {
		currentIndex++;
		answerSubmitted = false;
	}

	function checkAnswer(choice: string) {
		selectedAnswer = choice;

		if (!answerSubmitted) {
			if (choice === currentQuestion.correct_answer) {
				score++;
			}
			answerSubmitted = true;
			console.log(answerSubmitted);
		}

		console.log(selectedAnswer);
	}
</script>

<div
	class=" container mx-auto grid min-h-screen place-content-evenly gap-5 p-5 text-xl"
	in:scale={{ duration: 800, delay: 300 }}
>
	<!-- Quiz Info -->
	{#if currentQuestion}
		<div class=" container mx-auto justify-evenly p-5 text-center">
			<h2 class="font-semibold">{$page.params.quizId.toUpperCase().split('Z').join('Z-')}</h2>
			<div class=" flex justify-between text-2xl">
				<p>
					Question # {#if $page.params.quizId === '10-item-quiz1'}{currentIndex +
							1}{/if}{#if $page.params.quizId === '25-item-quiz1'}{currentIndex +
							1}{/if}{#if $page.params.quizId === '50-item-quiz1'}{currentIndex + 1}{/if}
				</p>
				<p>✨ Score: {score}</p>
			</div>
		</div>

		<!-- Question -->
		{#key currentQuestion.question}
			<div class="grid gap-5">
				<strong in:fly={{ y: 100, duration: 800, delay: 300 }}> {currentQuestion.question}</strong>
			</div>
		{/key}
		<!-- Choices -->
		<div class="grid gap-5">
			{#each currentQuestion.choices as choice}
				{#key choice}
					<button
						class="rounded-xl border-2 border-amber-400 p-2 text-start"
						class:selected={selectedAnswer === choice}
						on:click={() => checkAnswer(choice)}
						in:fly={{ y: 100, duration: 800, delay: 300 }}
						>{#if choice === currentQuestion.correct_answer && answerSubmitted === true}
							<span in:scale={{ duration: 800, delay: 800 }} class="text-2xl">✅</span>
						{:else if choice !== currentQuestion.correct_answer && answerSubmitted === true}
							<span in:scale={{ duration: 800, delay: 300 }} class="text-2xl">❌</span>
						{/if}

						{choice}
					</button>
				{/key}
			{/each}
		</div>
	{/if}
	<div class="grid place-content-center gap-10 text-center">
		<!-- Quiz Completed -->
		{#if currentIndex >= shuffledQuestions10.length && (($page.params.quizId === '10-item-quiz1' && currentIndex >= shuffledQuestions10.length) || ($page.params.quizId === '25-item-quiz1' && currentIndex >= shuffledQuestions25.length) || ($page.params.quizId === '50-item-quiz1' && currentIndex >= shuffledQuestions50.length))}
			<div><img src="/goodjob.webp" alt="two beautiful girls" /></div>

			<div class="text-center text-4xl">
				<h2>Quiz Completed</h2>
				<p>Your Score: {score}</p>
			</div>
		{/if}

		<!-- Next, Start New Quiz Buttons -->

		{#if currentIndex >= shuffledQuestions10.length && (($page.params.quizId === '10-item-quiz1' && currentIndex >= shuffledQuestions10.length) || ($page.params.quizId === '25-item-quiz1' && currentIndex >= shuffledQuestions25.length) || ($page.params.quizId === '50-item-quiz1' && currentIndex >= shuffledQuestions50.length))}
			<div>
				<button class="rounded-full border-2 border-amber-400 px-3 text-2xl"
					><a href="/">Start New Quiz</a></button
				>
			</div>
		{:else}
			<div class="grid grid-flow-col place-content-center justify-around">
				<button class="rounded-full border-2 border-amber-400 px-3 text-2xl" on:click={nextQuestion}
					>Next Question</button
				>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.selected {
		@apply bg-amber-400 font-bold text-black;
	}
</style>
