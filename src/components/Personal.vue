<template>
  <div>
    <Card>
      <template #title>Personal Information</template>
      <template #subtitle>Enter your information</template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <label>Firstname</label>
            <InputText
              v-model="$v.firstname.$model"
              :class="{ 'p-invalid': $v.firstname.$invalid && submitted }"
            />
            <small v-show="$v.firstname.$invalid && submitted" class="p-error">
              Firstname is required.
            </small>
          </div>
          <div class="p-field">
            <label>Lastname</label>
            <InputText
              v-model="$v.lastname.$model"
              :class="{ 'p-invalid': $v.lastname.$invalid && submitted }"
            />
            <small v-show="$v.lastname.$invalid && submitted" class="p-error">
              Lastname is required.
            </small>
          </div>
          <div class="p-field">
            <label>Age</label>
            <InputText
              v-model="$v.age.$model"
              :class="{ 'p-invalid': $v.age.$error && submitted }"
            />
            <small v-show="$v.age.$invalid && submitted" class="p-error">
              Age should be a number.
            </small>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-grid p-nogutter p-justify-between">
          <i></i>
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
import InputText from "primevue/inputtext";
import { required, integer } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      age: "",
      lastname: "",
      firstname: "",
      submitted: false
    };
  },
  props: {
    formData: Object
  },
  components: {
    Button,
    InputText
  },
  validations: {
    firstname: { required },
    lastname: { required },
    age: { integer }
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: {
          firstname: this.firstname,
          lastname: this.lastname,
          age: this.age
        },
        pageIndex: 0
      });
    }
  },
  created() {
    this.firstname = this.formData.firstname || "";
    this.lastname = this.formData.lastname || "";
    this.age = this.formData.age || "";
  }
};
</script>
