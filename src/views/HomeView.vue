<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import RecentTrips from "@/components/ui/RecentTrips.vue";

import router from "@/router";

const goRoute = (route) => {
  router.push({ name: route });
};

const subscribe = () => {
  userStore.subscribe();
};
</script>

<template>
  <MainLayout>
    <main>
      <div class="relative isolate">
        <svg
          class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              stroke-width="0"
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style="
              clip-path: polygon(
                63.1% 29.5%,
                100% 17.1%,
                76.6% 3%,
                48.4% 0%,
                44.6% 4.7%,
                54.5% 25.3%,
                59.8% 49%,
                55.2% 57.8%,
                44.4% 57.2%,
                27.8% 47.9%,
                35.1% 81.5%,
                0% 97.7%,
                39.2% 100%,
                35.2% 81.4%,
                97.2% 52.8%,
                63.1% 29.5%
              );
            "
          />
        </div>
        <div class="overflow-hidden">
          <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div
              class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
            >
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1
                  class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue to-secondaryBlue sm:text-6xl leading-relaxed xl:h-20"
                >
                  Imagine, Tag, Travel
                </h1>
                <p
                  class="relative mt-4 text-base leading-8 text-gray-800 sm:max-w-md lg:max-w-none"
                >
                  Describe any trip you can dream of and specify with tags, we'll turn it
                  into your next adventure.
                </p>
                <div class="mt-10 flex items-center gap-x-6">
                  <BaseButton
                    @click="goRoute('create')"
                    class="bg-primaryOrange text-white rounded-lg px-4 py-2 cursor-pointer"
                    >Create new trip</BaseButton
                  >
                  <a
                    @click="goRoute('explore')"
                    class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                    >Explore trips <span aria-hidden="true">→</span></a
                  >
                </div>
              </div>
              <div
                class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
              >
                <div
                  class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
                >
                  <div class="relative">
                    <img
                      src="@/assets/images/hero/tropical-hammock.webp"
                      alt="tropical hommack on a beautiful beach"
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
                <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div class="relative">
                    <img
                      src="@/assets/images/hero/culture-experience.webp"
                      alt="South east asia food market"
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                  <div class="relative">
                    <img
                      src="@/assets/images/hero/adventure-landscape.webp"
                      alt="Hot air balloon rises over the canyon"
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
                <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div class="relative">
                    <img
                      src="@/assets/images/hero/historic-centre.webp"
                      alt="Cobbled streets of a european city"
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                  <div class="relative">
                    <img
                      src="@/assets/images/hero/relaxing-spa.webp"
                      alt="Hottub overlooking the cold mountains"
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <RecentTrips :cols="3" />
      </div>
    </main>
  </MainLayout>
</template>
