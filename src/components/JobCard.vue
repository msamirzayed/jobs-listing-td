<template>
  <filter-topic
    v-if="selectedFilters.length > 0"
    :filters="selectedFilters"
    @remove-filter="removeSelectedFilter"
    @clear-filters="clearSelectedFilters"
  ></filter-topic>
  <div class="job" v-if="jobs.length > 0">
    <section
      v-for="job in filteredJobs"
      :key="job.id"
      :class="{ active: isJobActive(job) }"
      class="job-card p-3 mb-5 bg-body rounded row justify-content-center align-items-center position-relative"
    >
      <div
        class="job-card__details col-lg-6 col-12 d-flex align-items-center justify-content-lg-start justify-content-center gap-3 p-lg-0 pt-4 px-2"
      >
        <div class="d-none d-lg-block">
          <img :src="job.logo" class="rounded d-none d-lg-block" alt="jobImg" />
        </div>
        <img
          :src="job.logo"
          class="rounded d-block d-lg-none img-responsive"
          alt="jobImg"
        />
        <div class="col-12">
          <div class="d-flex gap-1 align-items-baseline">
            <h6 class="primary-text fw-bolder">{{ job.company }}</h6>
            <div>
              <span
                v-if="job.new"
                class="badge rounded-pill bg-primary__pill text-center"
                >NEW!</span
              >
            </div>
            <div>
              <span
                v-if="job.featured"
                class="badge rounded-pill bg-secondary__pill text-center"
                >FEATURED</span
              >
            </div>
          </div>
          <div>
            <h5 class="fw-bold job__card__title">{{ job.position }}</h5>
          </div>
          <div class="d-flex text-secondary">
            <span>{{ job.postedAt }}</span>
            <ul class="d-flex gap-lg-5 gap-4">
              <li>{{ job.contract }}</li>
              <li>{{ job.location }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="job-card__tags col-lg-6 col-12">
        <hr class="container d-lg-none d-block" />
        <div
          class="d-flex justify-content-lg-end justify-content-sm-start align-items-center flex-wrap px-2"
        >
          <h4 v-if="job.languages">
            <span
              v-for="(lang, i) in job.languages"
              :key="i"
              class="badge bg-tags mx-1"
              @click="toggleSelectedFilter(lang)"
              :class="{ activeFilter: selectedFilters.includes(lang) }"
              >{{ lang }}</span
            >
          </h4>
          <h4 v-if="job.tools">
            <span
              v-for="(tool, i) in job.tools"
              :key="i"
              class="badge bg-tags mx-1"
              @click="toggleSelectedFilter(tool)"
              :class="{ activeFilter: selectedFilters.includes(tool) }"
              >{{ tool }}</span
            >
          </h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FilterTopic from "@/components/FilterTopics.vue";
export default {
  name: "JobCard",
  data() {
    return {
      url: "data.json",
      jobs: [],
      selectedFilters: [],
      activeItem: null,
    };
  },
  components: { FilterTopic },
  mounted() {
    fetch(this.url)
      .then((res) => res.json())
      .then(
        (data) => (this.jobs = data.map((job) => ({ ...job, isActive: false })))
      )
      .catch((err) => console.log(err.message));
  },
  computed: {
    filteredJobs() {
      if (this.selectedFilters.length === 0) {
        return this.jobs;
      } else {
        return this.jobs.filter((job) => {
          let hasLanguage = false;
          let hasTool = false;
          if (job.languages) {
            hasLanguage = job.languages.some((lang) =>
              this.selectedFilters.includes(lang)
            );
          }
          if (job.tools) {
            hasTool = job.tools.some((tool) =>
              this.selectedFilters.includes(tool)
            );
          }
          return hasLanguage || hasTool;
        });
      }
    },
  },
  methods: {
    isJobActive(job) {
      if (this.selectedFilters.length === 0) {
        return false;
      } else {
        let isActive = false;
        if (job.languages) {
          isActive = job.languages.some((lang) =>
            this.selectedFilters.includes(lang)
          );
        }
        if (!isActive && job.tools) {
          isActive = job.tools.some((tool) =>
            this.selectedFilters.includes(tool)
          );
        }
        return isActive;
      }
    },
    toggleSelectedFilter(filter) {
      const index = this.selectedFilters.indexOf(filter);
      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      } else {
        this.selectedFilters.push(filter);
      }
    },
    removeSelectedFilter(filter) {
      this.selectedFilters = this.selectedFilters.filter(
        (selectedFilter) => selectedFilter !== filter
      );
    },
    clearSelectedFilters() {
      this.selectedFilters = [];
    },
  },
};
</script>
