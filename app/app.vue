<template>
  <div>
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <AppLoadingOverlay />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
