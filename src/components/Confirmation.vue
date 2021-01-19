<template>
  <div>
    <Card v-if="!confirmation">
      <template #title>
        Confirmation
      </template>
      <template #content>
        <div class="p-field p-col-12">
          <label>Name</label>
          <b>
            {{ formData.firstname ? formData.firstname : "-" }}
            {{ formData.lastname ? formData.lastname : "-" }}
          </b>
        </div>
        <div class="p-field p-col-12">
          <label>Age</label>
          <b> {{ formData.age ? formData.age : "-" }}</b>
        </div>
        <div class="p-field p-col-12">
          <label>Seat Class</label>
          <b> {{ formData.class.name ? formData.class.name : "-" }} </b>
        </div>
        <div class="p-field p-col-12">
          <label>Seat</label>
          <b> {{ formData.seat.seat ? formData.seat.seat : "-" }} </b>
        </div>
      </template>
      <template #footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Complete"
            @click="complete()"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
          />
        </div>
      </template>
    </Card>
    <div v-else>
      <Message
        class="p-d-flex p-justify-center p-align-center"
        severity="success"
        :closable="false"
      >
        Your Ticket booked successfully
      </Message>
      <div class="p-d-flex p-justify-center p-align-center">
        <Button label="Book another ticket" @click="goToHome()" />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";
import Message from "primevue/message";

export default {
  data() {
    return {
      confirmation: false
    };
  },
  props: {
    formData: Object
  },
  components: {
    Button,
    Message
  },
  methods: {
    prevPage() {
      this.$emit("prevPage", { pageIndex: 3 });
    },
    goToHome() {
      this.$emit("prevPage", { pageIndex: 1, refreshData: true });
    },
    complete() {
      this.confirmation = true;
    }
  }
};
</script>
