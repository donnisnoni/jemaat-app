<script>
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'

  let hidden = false,
    expanded = localStorage.getItem('admin-sidenav') == 'true' || localStorage.setItem('admin-sidenav', false)

  function toggleExpand() {
    expanded = !expanded
    localStorage.setItem('admin-sidenav', expanded)
  }

  $: expandButtonCaption = expanded ? 'Perkecil' : 'Perbesar'
</script>

<span
  on:click={() => (hidden = false)}
  class:hidden={!hidden}
  class="absolute top-0 z-30 inline-flex justify-center align-middle md:hidden"
  style="width:30px; height:30px;">
  <i class="text-lg mdi mdi-chevron-double-right" />
</span>

<nav
  class="relative sidenav sm:m-2 sm:rounded-md sm:text:lg"
  class:expand={expanded}
  style={hidden && 'display:none'}
  id="admin-sidenav">
  <ul>
    <li>
      <a href="/admin" title="Dashboard" use:link use:active>
        <i class="mdi mdi-apps" />
        <span class="link-label">Dashboard</span>
      </a>
    </li>
    <li>
      <a href="/admin/rayon" title="Rayon" use:link use:active>
        <i class="mdi mdi-account-group-outline" />
        <span class="link-label">Rayon</span>
      </a>
    </li>
    <li>
      <a href="/admin/kk" title="Kepala Keluarga" use:link use:active>
        <i class="mdi mdi-account-outline" />
        <span class="link-label">Kepala Keluarga</span>
      </a>
    </li>
  </ul>

  <ul class="mt-auto">
    <!-- svelte-ignore a11y-missing-attribute -->
    <li class="hidden lg:inline">
      <a
        class="cursor-pointer select-none"
        on:click={toggleExpand}
        role="button"
        tabindex="0"
        title={expandButtonCaption}>
        <i class="mdi mdi-chevron-double-right" class:mdi-rotate-180={expanded} />
        <span class="link-label">{expandButtonCaption}</span>
      </a>
    </li>
    <li class="md:hidden">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="cursor-pointer select-none" on:click={() => (hidden = true)} role="button">
        <i class="mdi mdi-chevron-double-left" />
        <span class="link-label">Sembunyikan Menu</span>
      </a>
    </li>
    <li>
      <a href="/" title="Logout" use:link><i class="mdi mdi-logout" /> <span class="link-label">Logout</span> </a>
    </li>
  </ul>
</nav>
