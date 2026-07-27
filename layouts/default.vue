<template>
  <div class="flex flex-col min-h-dvh bg-default text-default">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:rounded-md focus:bg-primary focus:text-inverted focus:px-3 focus:py-2 focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>

    <AppHeader />

    <main
      id="main"
      class="flex-grow w-full"
    >
      <UContainer class="py-10 sm:py-14">
        <NuxtPage />
      </UContainer>
    </main>

    <FooterMain />
  </div>
</template>
