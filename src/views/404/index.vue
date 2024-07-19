<script setup>
import router, { RoutePath } from '@/router';
import { Button } from '@/components/ui/button';
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container flex flex-col md:flex-row-reverse items-center min-h-screen gap-8 px-6 py-12 mx-auto">
      <div class="w-full">
        <p class="text-4xl font-medium text-blue-500 dark:text-blue-400">404</p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Seem like you have been lost!!
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div class="flex items-center mt-6 gap-x-3 flex-col gap-2 md:max-w-96">
          <Button class="flex gap-2 items-center" @click="$router.go(-1)">
            <span>Go back</span>
          </Button>
          <Button class="flex gap-2 items-center" @click="$router.push(RoutePath.Dashboard)">
            Take me home, country roads
          </Button>
        </div>
      </div>
      <img src="/src/assets/images/404.png" />
    </div>
  </section>
</template>
