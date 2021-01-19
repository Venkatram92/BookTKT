<template>
  <div>
    <Card>
      <template #title>
        Payment Information
      </template>
      <template #subtitle>
        Enter your card details
      </template>
      <template #content>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="class">Card holder name</label>
            <InputText
              type="text"
              v-model="$v.cardholderName.$model"
              :class="{ 'p-invalid': $v.cardholderName.$invalid && submitted }"
            />
            <small
              v-show="$v.cardholderName.$invalid && submitted"
              class="p-error"
            >
              Card holder name is required.
            </small>
          </div>
          <div class="p-field p-col-8">
            <label id="number" for="lastname">Card number</label>
            <InputMask
              id="number"
              mask="9999-9999-9999-9999"
              v-model="$v.cardholderNumber.$model"
              :class="{
                'p-invalid': $v.cardholderNumber.$invalid && submitted
              }"
            />
            <small
              v-show="$v.cardholderNumber.$invalid && submitted"
              class="p-error"
            >
              Card number is required.
            </small>
          </div>
          <div class="p-field p-col-2">
            <label id="date" for="date">Exp date</label>
            <InputMask
              id="date"
              mask="99/99"
              v-model="$v.date.$model"
              :class="{ 'p-invalid': $v.date.$invalid && submitted }"
            />
            <small v-show="$v.date.$invalid && submitted" class="p-error">
              Exp date is required.
            </small>
          </div>
          <div class="p-field p-col-2">
            <label for="cvv">CVV</label>
            <InputMask
              id="cvv"
              mask="999"
              v-model="$v.cvv.$model"
              :class="{ 'p-invalid': $v.cvv.$invalid && submitted }"
            />
            <small v-show="$v.cvv.$invalid && submitted" class="p-error">
              CVV is required.
            </small>
          </div>
          <div class="p-field-checkbox p-col-12">
            <Checkbox id="remember" v-model="remember" :binary="true" />
            <label for="remember" class="p-checkbox-label"
              >Save credit card information for future</label
            >
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
import Checkbox from "primevue/checkbox";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      cardholderName: "",
      cardholderNumber: "",
      date: "",
      cvv: "",
      remember: false,
      submitted: false
    };
  },
  props: {
    formData: Object
  },
  components: {
    Button,
    Checkbox,
    InputText,
    InputMask
  },
  validations: {
    cvv: { required },
    date: { required },
    cardholderName: { required },
    cardholderNumber: { required }
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: {
          cardholderName: this.cardholderName,
          cardholderNumber: this.cardholderNumber,
          date: this.date,
          cvv: this.cvv
        },
        pageIndex: 2
      });
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 2 });
    }
  },
  created() {
    this.cvv = this.formData.cvv || "";
    this.date = this.formData.date || "";
    this.cardholderName = this.formData.cardholderName || "";
    this.cardholderNumber = this.formData.cardholderNumber || "";
  }
};
</script>
