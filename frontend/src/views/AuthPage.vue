<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
    <div class="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-md border border-white border-opacity-20">
      <h2 class="text-3xl font-bold text-center text-white mb-6">
        {{ isLogin ? "Login" : "Sign Up" }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full p-3 pl-10 border rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="absolute left-3 top-3 text-white">
            📧
          </span>
        </div>

        <div class="relative">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-3 pl-10 border rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="absolute left-3 top-3 text-white">
            🔑
          </span>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          {{ isLogin ? "Login" : "Sign Up" }}
        </button>
      </form>

      <p class="mt-5 text-center text-white">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button
          @click="isLogin = !isLogin"
          class="text-yellow-300 hover:underline focus:outline-none ml-1"
        >
          {{ isLogin ? "Sign Up" : "Login" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const isLogin = ref(true);

    const handleSubmit = async () => {
      try {
        if (isLogin.value) {
          await authStore.login({ email: email.value, password: password.value });
        } else {
          await authStore.signup({ email: email.value, password: password.value });
        }
        router.push("/"); // Redirect to home page
      } catch (error) {
        alert(error.response?.data?.message || "Authentication failed!");
      }
    };

    return { email, password, isLogin, handleSubmit };
  }
};
</script>
