<script>
	import { page } from '$app/stores';
	import CategoryCard from '$components/CategoryCards/CategoryCard.svelte';
	import Feedback from '$components/Feedback/Feedback.svelte';

	import SectionTitle from '$components/SectionTitle.svelte';

	import { fly } from 'svelte/transition';
</script>

<section
	class=" container col-span-1 mx-auto flex min-h-screen flex-col items-center justify-center p-5"
>
	<SectionTitle title="📑 Quizes" />
	<div
		class="container mx-auto grid place-items-center gap-10 sm:grid-cols-3"
		in:fly={{ y: 100, duration: 800, delay: 150 }}
	>
		<CategoryCard
			title="quiz1"
			numberofquestions="50"
			scope="Foundation of Nursing,Nursing Research,Professional Adjustment,Leadership and Management"
		/>
	</div>
</section>

<section class=" container mx-auto p-5">
	<p class="text-xl">
		👋 More categories soon, meanwhile you can fill up the form below if you have any suggestions,
		requests or feedback
	</p>
	<SectionTitle title="Feedback" />

	<Feedback />
</section>
