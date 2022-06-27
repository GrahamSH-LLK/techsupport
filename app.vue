<template>
  <main class="p-3 m-2">
    <h1
      class="text-4xl mb-6 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
    >
      Contact Me
    </h1>

    <alert class="my-2" type="info" title="Sent!" v-show="sentSuccessfully"
      >Your message has been sent successfully.</alert
    >
    <alert
      class="my-2"
      type="error"
      title="Sorry, we couldn't send that"
      v-show="sentErrored"
      >Try again later</alert
    >
    <form class="w-full max-w-lg" @submit.prevent="send()">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="John Doe"
            v-model="name"
            autocomplete="name"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="tel"
          >
            Phone number
          </label>
              <ClientOnly>

          <vue-tel-input
            v-model="phoneNum"
            :onlyCountries="onlyCountries"
            :inputOptions="inputOptions"
          ></vue-tel-input>
              </ClientOnly>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Message
          </label>
          <textarea
            class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
            v-model="content"
          ></textarea>
          <p class="text-gray-600 text-xs italic">
            Include any details I need to know, including the problem and your
            address.
          </p>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <button
            class="shadow bg-yellow-700 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-default disabled:hover:bg-yellow-700"
            type="submit"
            :disabled="sentSuccessfully || sending"
          >
            Send
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
    </form>
  </main>
</template>
<script setup>
let content = ref("");
  let name = ref("");
  let phoneNum = ref("");
  let onlyCountries = ref(["us"]);
  let inputOptions = ref({ autocomplete: "tel" });
  let sentSuccessfully = ref(false);
  let sentErrored = ref(false);
  let sending = ref(false);

const send = async () => {
  
  if (sentSuccessfully.value) return;
  sending.value = true;
  const body = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    content:content.value,
    name:name.value,
    phoneNum: phoneNum.value,
  };
  try {
    const res = await fetch("https://tech-contact.glitch.me/send", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if ((await res.text()) === "sent!") {
      sentSuccessfully.value = true;
      sentErrored.value = false;
      sending.value = false;
    } else {
      sentErrored.value = true;
      sentSuccessfully.value = false;
      sending.value = false;
    }
  } catch (err) {
    sentErrored.value = true;
    sentSuccessfully.value = false;
    sending.value = false;
  }
};
</script>
<style>
.vti__dropdown {
  display: none;
}
.vti__input {
  @apply appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border
            rounded
            py-3
            px-4
            mb-3
            leading-tight
            focus:outline-none
            focus:bg-white;
}
.vue-tel-input {
  border: none !important;
}
</style>
