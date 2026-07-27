<template>
  <div>
    <section class="max-w-2xl">
      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-highlighted text-balance">
        Free &amp; open source tools
      </h1>
      <p class="mt-4 text-lg text-muted text-pretty">
        A small collection of privacy-first, browser-based utilities by
        <a
          class="text-default underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          href="https://thespielplatz.com"
          target="_blank"
          rel="noopener"
        >TheSpielplatz</a>. Nothing you type ever leaves your device.
      </p>
    </section>

    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li
        v-for="tool in tools"
        :key="tool.to"
      >
        <NuxtLink
          :to="tool.to"
          class="group relative flex h-full items-start gap-4 rounded-xl border border-default bg-elevated/30 p-5 transition-all duration-200 hover:border-primary/50 hover:bg-elevated hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span class="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
            <UIcon
              :name="tool.icon"
              class="size-6"
            />
          </span>
          <div class="min-w-0">
            <div class="font-medium text-highlighted transition-colors group-hover:text-primary">
              {{ tool.name }}
            </div>
            <p class="mt-1 text-sm text-muted text-pretty">
              {{ tool.description }}
            </p>
          </div>
          <UIcon
            name="i-ph-arrow-up-right"
            class="absolute right-4 top-4 size-4 text-dimmed opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-primary"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
