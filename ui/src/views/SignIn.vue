<script lang="ts">
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Button from "../components/Button.vue";
import InputField from "../components/InputField.vue";
import { ErrorMessages } from "../constants/error-message.validator.ts";
import { AuthService } from "../services/auth.service.ts";

export default defineComponent({
  name: "SignIn",
  components: { Button, InputField },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      passwordViewToggle: false,
      isLoading: false,
      authService: new AuthService(),
    };
  },
  mounted() {
    this.clearStorage();
  },
  validations() {
    return {
      form: {
        email: {
          email: helpers.withMessage(ErrorMessages.email, email),
          required: helpers.withMessage(ErrorMessages.required, required),
        },
        password: {
          required: helpers.withMessage(ErrorMessages.required, required),
        },
      },
    };
  },

  methods: {
    async login(): Promise<void> {
      try {
        await this.v$.$validate();
        if (this.v$.$errors.length > 0) return;
        this.isLoading = true;
        await this.authService.signIn({
          email: this.form.email,
          password: this.form.password,
        });
        this.$router.push("/home");
        this.isLoading = false;
      } catch (e: any) {
        this.isLoading = false;
        console.log(e.response.data.exception.message);
        this.handleErrors(e.response.data.exception.message);
      }
    },
    handleErrors(message: string) {
      console.log(message);
      const errorMessages: { [key in string]: Function } = {
        "Invalid credentials": () => {
          toast.error(message);
        },
      };
      if (errorMessages[message]) {
        errorMessages[message].bind(this).call();
      }
    },

    clearStorage() {
      localStorage.clear();
    },
  },
});
</script>

<template>
  <div class="h-full bg-wrapper">
    <div class="container mx-auto h-full p-2">
      <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 h-full">
        <div
          class="auth-wrapper flex items-center justify-center flex-col w-full md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-end-2"
        >
          <div class="bg-white rounded-lg shadow-sm px-4 py-8 w-full border">
            <h1 class="text-3xl font-medium text-gray-900 text-center">
              Get start here
            </h1>
            <div class="mt-10 px-6 py-0 w-full">
              <div class="mb-4">
                <input-field
                  id="username"
                  v-model:field-value="form.email"
                  :validator="v$.form.email"
                  icon="bi-envelope-paper"
                  name="Email Address"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </div>
              <div class="mb-4">
                <input-field
                  id="user-password"
                  v-model:field-value="form.password"
                  :validator="v$.form.password"
                  icon="bi-shield-lock"
                  name="Password"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div class="mb-4">
                <Button
                  :show-loader="isLoading"
                  additional-classes="w-full flex gap-4"
                  label="Login"
                  @onClick="login()"
                />
              </div>
              <div class="text-sm text-center w-full cursor-pointer underline">
                <a>Forgot your password?</a>
              </div>
              <hr class="h-px my-8 bg-gray-200 border-0" />
              <div class="text-sm text-center w-full cursor-pointer mt-4">
                <a href="/signup"
                  >Don't have an account?
                  <span class="underline font-semibold">Sign Up!</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
