<template>
  <div class="home">
    <Steps :model="items" />
    <router-view
      :formData="formObject"
      @prevPage="prevPage($event)"
      @nextPage="nextPage($event)"
      @complete="complete"
    >
    </router-view>
  </div>
</template>

<script>
import Steps from "primevue/steps";
export default {
  data() {
    return {
      items: [
        { label: "Personal", to: "/" },
        { label: "Seat", to: "/seat" },
        { label: "Payment", to: "/payment" },
        { label: "Confirmation", to: "/confirmation" }
      ],
      formObject: {}
    };
  },
  components: {
    Steps
  },
  methods: {
    nextPage(event) {
      this.formObject = { ...event.formData, ...this.formObject };
      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      if (event.refreshData) {
        this.formObject = {};
      }
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    complete() {
      this.$toast.add({
        severity: "success",
        summary: "Order submitted",
        detail:
          "Dear, " +
          this.formObject.firstname +
          " " +
          this.formObject.lastname +
          " your order completed."
      });
    }
  }
};
</script>
