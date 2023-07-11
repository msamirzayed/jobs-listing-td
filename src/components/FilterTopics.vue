<template>
  <div class="filter">
    <div class="controls container mt-5 px-0">
      <div
        class="job-card-blank p-4 mb-5 bg-body rounded row justify-content-center align-items-center position-relative"
      >
        <div
          class="d-flex justify-content-sm-start align-items-center flex-wrap"
        >
          <div
            class="controls__btn d-flex justify-content-start align-items-center flex-wrap"
            v-for="(filter, i) in filters"
            :key="i"
          >
            <div class="mx-3">
              <h4 class="d-flex justify-content-center align-items-baseline">
                <span class="badge bg-tags-filters">{{ filter }}</span>
                <button
                  @click="removeFilter(filter)"
                  class="btn p-0 m-0 text-light col-5 border-4 controls__btn__remove"
                >
                  <img src="../assets/imgs/icon-remove.svg" alt="removeTagFilter" />
                </button>
              </h4>
            </div>
          </div>
          <div class="clear__btn">
            <button
              @click="clearFilters"
              class="btn clear__btn text-center text-secondary fw-bolder"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterTopics",
  props: {
    filters: {
      required: true,
    },
  },
  methods: {
    removeFilter(filter) {
      this.$emit("remove-filter", filter);
    },
    clearFilters() {
      this.$emit("clear-filters");
    },
  },
};
</script>
