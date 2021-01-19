<template>
  <div>
    <Card>
      <template #title>Seat Information</template>
      <template #subtitle>Choose your seat</template>
      <template #content>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label>Class</label>
            <Dropdown
              v-model="$v.selectedClass.$model"
              :options="classes"
              optionLabel="name"
              placeholder="Select a Class"
              :class="{ 'p-invalid': $v.selectedClass.$invalid && submitted }"
            />
            <small
              class="p-error"
              v-show="$v.selectedClass.$invalid && submitted"
            >
              Class is required.
            </small>
          </div>
          <div class="p-field p-col-12">
            <label>Seat</label>
            <Dropdown
              v-model="seat"
              :options="seats"
              optionLabel="seat"
              placeholder="Select a Seat"
              :class="{ 'p-invalid': $v.seat.$invalid && submitted }"
            />
            <small v-show="$v.seat.$invalid && submitted" class="p-error">
              Seat is required.
            </small>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Next"
            @click="nextPage(!$v.$invalid)"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      seat: "",
      submitted: false,
      selectedClass: "",
      classes: [
        { name: "First Class", code: "A", factor: 1 },
        { name: "Second Class", code: "B", factor: 2 },
        { name: "Third Class", code: "C", factor: 3 }
      ],
      seats: [{ seat: 1 }, { seat: 2 }, { seat: 3 }, { seat: 4 }, { seat: 5 }]
    };
  },
  props: {
    formData: Object
  },
  components: {
    Button,
    Dropdown
  },
  validations: {
    seat: { required },
    selectedClass: { required }
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: {
          class: this.selectedClass,
          seat: this.seat
        },
        pageIndex: 1
      });
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 1 });
    }
  },
  created() {
    this.seat = this.formData.seat || "";
    this.selectedClass = this.formData.class || "";
  }
};
</script>
