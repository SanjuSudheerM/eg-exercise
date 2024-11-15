<script lang="ts">
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import InputField from "../components/InputField.vue";
import Button from "../components/Button.vue";
import {
  CustomValidators,
  ErrorMessages,
} from "../constants/error-message.validator.ts";
import { AuthService } from "../services/auth.service.ts";
import { toast } from "vue-sonner";

export default defineComponent({
  name: "CreateAccount",
  components: { InputField, Button },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      isLoading: false,
      authService: new AuthService(),
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage(ErrorMessages.required, required),
        },
        email: {
          required: helpers.withMessage(ErrorMessages.required, required),
          email: helpers.withMessage(ErrorMessages.email, email),
        },
        password: {
          required: helpers.withMessage(ErrorMessages.required, required),
          passwordValidator: CustomValidators.password,
        },
        confirmPassword: {
          required: helpers.withMessage(ErrorMessages.required, required),
          confirmPasswordValidator: {
            $validator: (value: string, { password }: { password: string }) =>
              value === password,
            $message: "Password doesn't match",
          },
        },
      },
    };
  },
  methods: {
    async createAccount() {
      try {
        await this.v$.$validate();
        if (this.v$.$errors.length > 0) return;
        this.isLoading = true;
        await this.authService.createAccount({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        });
        this.isLoading = false;
        this.$router.push("/home");
      } catch (e: any) {
        console.log(e, e.response.data.exception.message);
        this.isLoading = false;
        toast.error(
          e.response.data.exception.message || "Something went wrong",
        );
      }
    },
  },
});
</script>

<template>
  <div class="h-full bg-wrapper">
    <div class="container mx-auto mt-6 h-full">
      <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 h-full">
        <div
          class="auth-wrapper flex items-center justify-center flex-col w-full md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-end-2"
        >
          <div class="bg-white rounded-lg shadow-sm px-4 py-8 w-full border">
            <form>
              <h1 class="text-3xl font-medium text-gray-900 text-center">
                Create Account
              </h1>
              <div class="mt-10 px-6 py-0 w-full">
                <div class="mb-4">
                  <input-field
                    id="username"
                    v-model:field-value="form.name"
                    :validator="v$.form.name"
                    icon="bi-person"
                    name="Name"
                    placeholder="John Doe"
                  />
                </div>
                <div class="mb-4">
                  <input-field
                    id="user-email"
                    v-model:field-value="form.email"
                    :validator="v$.form.email"
                    icon="bi-envelope-paper"
                    name="Email Address"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div class="mb-4">
                  <input-field
                    id="user-password"
                    v-model:field-value="form.password"
                    :validator="v$.form.password"
                    explanation="Password must contain minimum 8 characters that includes uppercase & lowercase letters, numbers & special characters"
                    explanation-style="text-orange-400"
                    icon="bi-shield-lock"
                    name="Password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div class="mb-4">
                  <input-field
                    id="user-confirm-password"
                    v-model:field-value="form.confirmPassword"
                    :validator="v$.form.confirmPassword"
                    icon="bi-shield-lock"
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>

                <div class="mb-4">
                  <Button
                    :show-loader="isLoading"
                    additional-classes="w-full flex gap-4"
                    label="Create Account"
                    @onClick="createAccount()"
                  />
                </div>

                <hr class="h-px my-8 bg-gray-200 border-0" />
                <div class="text-sm text-center w-full cursor-pointer mt-4">
                  <a href="/signin"
                    >Already have an account?
                    <span class="underline font-semibold">Login now!</span></a
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
