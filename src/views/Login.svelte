<script>
  'use strict';
  import { autoSelectOnFocus, blurOnEsc } from '/@actions/inputDirectives.js';
  import { push } from 'svelte-spa-router';

  let refs = { fieldSandi: null },
    revealPass = false,
    username = 'donnisnononi',
    sandi = 'don@r34lm4dr1d';

  function login() {
    push('/admin');
  }

  function handleInputSandi(event) {
    sandi = event.target.value;
  }
</script>

<div
  class="min-w-full min-h-full"
  style="background-image: url('/img/login-bg.jpg')">
  <div
    class="flex items-center justify-center min-w-full min-h-full"
    style="background-color:#00000063;backdrop-filter:blur(3px)">
    <form
      class="flex flex-col sm:w-full bg-white p-3 backdrop-filter:blur(10px) shadow-md rounded-md"
      on:submit|preventDefault={login}
      style="min-width: 300px; max-width: 400px">
      <h3 class="my-5 text-lg font-bold text-center">LOGIN</h3>

      <div class="flex flex-col my-2">
        <label for="username">Username</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
          autocomplete="username"
          autofocus
          bind:value={username}
          class="p-3 border border-gray-200 rounded-md bg-gray-50"
          id="username"
          minlength="8"
          required
          type="text"
          use:autoSelectOnFocus
          use:blurOnEsc />
      </div>

      <div class="flex flex-col my-2">
        <label for="sandi">Sandi</label>
        <div class="relative flex items-center">
          <input
            autocomplete="current-password"
            bind:this={refs.fieldSandi}
            class="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
            id="sandi"
            minlength="8"
            on:input={handleInputSandi}
            required
            type={revealPass ? 'text' : 'password'}
            use:autoSelectOnFocus
            use:blurOnEsc
            value={sandi} />
          <div
            class:hidden={!sandi.length}
            class="absolute top-0 right-0 flex h-full px-2"
            on:click={() => (revealPass = !revealPass)}
            role="button">
            <!-- on:mousedown={() => (revealPass = true)} -->
            <!-- on:mouseup={() => (revealPass = false)} -->
            <i
              class="mdi {revealPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'} my-auto mdi-2xl" />
          </div>
        </div>
      </div>

      <hr class="my-3" />

      <div class="flex flex-col">
        <button
          aria-label="Login"
          class="btn btn-primary"
          type="submit">LOGIN</button>
      </div>
    </form>
  </div>
</div>
