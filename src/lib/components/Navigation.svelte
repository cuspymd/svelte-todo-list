<script>
    import {session} from '$app/stores';
  
    const navigation = [
      {
        href: `${$session.user ? "/" : "/sign-in"}`,
        name: 'Home'
      },
      {
        href: '/protected',
        name: `${$session.user ? "🔓" : "🔒"} Protected`
      }
    ];
  
    async function handleSignOut() {
      await fetch("/api/sign-out")
  
      window.location = "/sign-in";
    }
  </script>
  
  <header class='bg-indigo-600'>
    <nav class='container mx-auto'>
      <div class='w-full py-4 flex items-center justify-between'>
        <div class='flex items-center'>
          <div class='ml-10 space-x-8'>
            {#each navigation as link}
              <a href={link.href} class='text-lg font-medium text-white hover:text-indigo-50'>
                {link.name}
              </a>
            {/each}
          </div>
        </div>
        <div class='flex items-center ml-10 space-x-4'>
          <div class="font-medium text-white">
            {#if $session.user }
              {$session.user.email}
            {/if}
          </div>
          <div>
            {#if $session.user }
              <button
                on:click={handleSignOut}
                class='inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'>
                Sign out
              </button>
            {:else}
              <a
                href='/sign-in'
                class='inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'
                >
                Sign in
              </a>
              <a
                href='/sign-up'
                class='inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50'
                >
                Sign up
              </a>
            {/if}
            <div>
        </div>
      </div>
    </nav>
  </header>
