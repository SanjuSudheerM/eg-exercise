<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "input-field",
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
    },
    placeholder: {
      type: String,
      required: true,
    },
    fieldValue: {
      type: String,
      default: "",
    },
    validator: {
      type: Object,
    },
    icon: {
      type: String,
    },
    explanationStyle: {
      type: String,
      default: "text-gray-500",
    },
    showAsterisk: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getErrors() {
      console.log(this.validator?.$errors);
      return (
        this.validator?.$errors
          ?.map((error: any) => {
            return error.$message;
          })
          .join(", ") || ""
      );
    },
  },
  methods: {
    handleOnInput(e: any) {
      this.$emit("update:fieldValue", (e.target as any)?.value);
      this.$emit("valueChange", (e.target as any)?.value);
    },
  },
});
</script>

<template>
  <div class="relative">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900"
      >{{ name }} <sup v-if="showAsterisk" class="text-red-700">*</sup></label
    >
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5"
      >
        <vue-icon :name="icon" scale="1" />
      </div>

      <input
        :id="id"
        :class="`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 font-normal ${
          icon ? 'ps-10' : ''
        }`"
        :placeholder="placeholder"
        :type="type"
        :value="fieldValue"
        @change="$emit('onChange', ($event.target as any)?.value)"
        @input="handleOnInput($event)"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500"
      >
        <slot />
      </div>
    </div>
    <p
      v-if="explanation"
      :id="`${id}-helper-text-explanation`"
      :class="`mt-1 text-xs ${explanationStyle}`"
    >
      {{ explanation }}
    </p>
    <p class="mt-1 text-xs text-red-500 bottom-0">{{ getErrors }}</p>
  </div>
</template>

<style scoped></style>
