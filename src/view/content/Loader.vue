<template>
  <!-- begin::Page loader -->
  <div class="page-loader page-loader-logo">
    <img alt="Logo" src="@/custom/media/logos/logo-letter-1.png" class="max-w-50"  />
    <div class="spinner text-center" v-bind:class="spinnerClass || 'spinner-primary'"></div>
  </div>
  <!-- end::Page Loader -->
</template>

<script>
export default {
  name: "Loader",
  props: {
    logo: String,
    spinnerClass: String
  }
};
</script>
