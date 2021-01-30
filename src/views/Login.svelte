<script>
  import { blurOnEsc } from '/@actions/inputDirectives.js'
  import Button from '/@components/Button.svelte'
  import axios from 'axios'
  import { replace } from 'svelte-spa-router'

  if (localStorage['token']) replace('/admin')

  let fieldSandi,
    revealPass = false,
    username = 'donnisnoni',
    sandi = 'don@r34lm4dr1d',
    super_admin = false,
    loading = false

  function login() {
    loading = true
    axios
      .post('/api/login', { username, sandi, super_admin })
      .then(({ data }) => {
        localStorage['token'] = data.token
        replace('/admin')
      })
      .catch(() => alert('Login gagal, Username atau sandi salah!'))
      .finally(() => (loading = false))
  }

  function handleInputSandi(event) {
    sandi = event.target.value
  }
</script>

<div class="min-w-full min-h-full" style="background-image: url('/img/login-bg.jpg')">
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
          class="w-full field"
          id="username"
          minlength="8"
          required
          type="text"
          use:blurOnEsc />
      </div>

      <div class="flex flex-col my-2">
        <label for="sandi">Sandi</label>
        <div class="relative flex items-center">
          <input
            autocomplete="current-password"
            bind:this={fieldSandi}
            class="w-full field"
            id="sandi"
            minlength="8"
            on:input={handleInputSandi}
            required
            type={revealPass ? 'text' : 'password'}
            use:blurOnEsc
            value={sandi} />
          <div
            class:hidden={!sandi.length}
            class="absolute top-0 right-0 flex h-full px-2"
            on:click={() => (revealPass = !revealPass)}
            role="button">
            <i class="mdi {revealPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'} my-auto mdi-2xl" />
          </div>
        </div>
      </div>

      <div class="flex items-center my-2">
        <input
          bind:checked={super_admin}
          class="mr-2"
          style="width:15px;height:15px"
          id="is-super-admin"
          type="checkbox" />
        <label for="is-super-admin">Login sebagai super admin</label>
      </div>

      <hr class="my-3" />

      <div class="flex flex-col">
        <Button {loading} primary type="submit">LOGIN</Button>
      </div>
    </form>
  </div>
</div>
