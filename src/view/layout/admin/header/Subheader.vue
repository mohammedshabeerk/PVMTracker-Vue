<template>
  <div
    class="subheader-solid" v-bind:class="subheaderClasses" id="kt_subheader"  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-0"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-center flex-wrap mr-1">
        <ul
          class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-lg"
        >
          

          <template>
            <li class="breadcrumb-item" v-for="(breadcrumb, i) in breadcrumbs" :key="`${i}-${breadcrumb.id}`">
              <router-link
                v-if="breadcrumb.route"
                :key="i"
                :to="breadcrumb.route"
                class="text-dark"
              >
                {{ breadcrumb.title }}
              </router-link>
              <span class="text-dark font-weight-bolder" :key="i" v-if="!breadcrumb.route">
                {{ breadcrumb.title }}
              </span>
            </li>
          </template>
        </ul>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.custom-v-dropdown {
  &.dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  &.dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTSubheader",
  props: {
    breadcrumbs: Array,
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if subheader width is fluid
     */
    widthFluid() {
      return this.layoutConfig("subheader.width") === "fluid";
    },

    subheaderClasses() {
      const classes = [];
      const style = this.layoutConfig("subheader.style");
      if (style) {
        classes.push(style);

        if (style === "solid") {
          classes.push("");
        }

        if (this.layoutConfig("subheader.fixed")) {
          classes.push("border-0");
        }
      }
      return classes.join(" ");
    }
  }
};
</script>
