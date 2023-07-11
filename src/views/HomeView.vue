<template>
  <div class="home">
    <header class="header mb-5"></header>

    <main class="container mt-5 px-lg-0 px-5">
      <job-card></job-card>
    </main>
  </div>
</template>

<script>
import JobCard from "@/components/JobCard";

export default {
  name: "HomeView",
  components: {
    JobCard,
  },

};
</script>
