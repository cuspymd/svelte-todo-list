<script context="module" lang="ts">
    export async function load({ session }) {
        if (!session?.user) {
            return {
                status: 302,
                redirect: "/sign-in"
            }
        }

        const response = await fetch('/api/sync', {
            method: 'POST'
        });
        if (response.ok) {
            const url = (await response.json()).url;
            return {
                status: 302,
                redirect: url
            }
        }
        //window.location.href = '/'
    }
</script>

<h1 class="text-2xl font-semibold text-center">Sync page</h1>
