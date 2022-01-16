<script>
    import "../app.css";
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />
<main>
    <div class='container mx-auto mt-8 antialiased'>
         <slot />
    </div>
</main>
