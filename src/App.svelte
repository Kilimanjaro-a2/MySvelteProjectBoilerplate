<style global lang="postcss">
    /* purgecss start ignore */
    @tailwind base;
    @tailwind components;
    /* purgecss end ignore */

    @tailwind utilities;
</style>

<script lang="ts">
    import CapitalizedText from "~/components/CapitalizedText.svelte"
    import { multiply } from "~/logics/Utility"
</script>

<CapitalizedText>my svelte project</CapitalizedText>
<p>2×3={multiply(2, 3)}</p>
