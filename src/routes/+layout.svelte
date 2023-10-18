<script>
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>NCLEX QUIZ APP</title>
</svelte:head>
<Header />
<slot />
<Footer />
