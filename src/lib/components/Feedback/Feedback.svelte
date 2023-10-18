<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
</script>

<div class="grid place-items-center gap-10">
	<!--  Feedback Form -->

	<form
		method="POST"
		use:enhance
		class="grid gap-5 rounded-lg border-4 border-amber-400 bg-amber-400 p-5 text-lg text-black sm:w-2/4"
	>
		<input
			id="username"
			type="text"
			name="username"
			placeholder="Username"
			class="rounded-md p-2 shadow-lg"
			required
		/>
		<input
			id="email"
			type="email"
			name="email"
			placeholder="Email"
			class="rounded-md p-2 shadow-lg"
			required
		/>

		<textarea
			name="feedback"
			id="feedback"
			cols="30"
			rows="4"
			placeholder="Feedback and Suggestion"
			class="rounded-md p-2 shadow-lg"
			required
		/>
		<button
			aria-label="Submit Feedback"
			type="submit"
			class="mx-auto rounded-full border-2 border-amber-400 bg-slate-800 px-3 py-1 text-xl text-white drop-shadow-lg"
		>
			Send Feedback
		</button>
	</form>
</div>
