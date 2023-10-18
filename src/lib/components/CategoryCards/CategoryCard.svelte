<script lang="ts">
	import { page } from '$app/stores';

	export let title = '';
	export let scope = '';
	export let numberofquestions = '';
	let scopes = scope.split(',');
</script>

<div
	class="bg-white-800 grid w-fit gap-5 rounded-lg border-4 border-amber-400 p-5 text-lg shadow-lg shadow-amber-400/30"
>
	<div>
		<h3 class="text-center font-bold">{title.toUpperCase().split('Z').join('Z-')}</h3>
		<p>Number of Questions: {numberofquestions}</p>
	</div>
	<div>
		<p>Scope of Quiz:</p>
		{#each scopes as scope}
			<li>{scope}</li>
		{/each}
	</div>
	<div class="grid place-content-center gap-5 text-center sm:grid-flow-col">
		<button class="rounded-full border-2 border-amber-400 px-2 py-1 font-bold drop-shadow-lg">
			<a href="/quiz/10-item-{title}">10-Item Quiz</a>
		</button>
		<button class="rounded-full border-2 border-amber-400 px-2 py-1 font-bold drop-shadow-lg">
			<a href="/quiz/25-item-{title}">25-Item Quiz</a>
		</button>
		<button class="rounded-full border-2 border-amber-400 px-2 py-1 font-bold drop-shadow-lg">
			<a href="/quiz/50-item-{title}">50-Item Quiz</a>
		</button>
	</div>
</div>
