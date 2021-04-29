<template>
  <v-date-picker
    mode='range'
    :max-date='new Date()'
    v-model='selectedDate'
    show-caps>

    <b-form-input
      class="input-filter"
      :size="'sm'"
      slot-scope="props"
      readonly
      :value='props.inputValue'
      @change.native='props.updateValue($event.target.value)'
      autocomplete="off">

    </b-form-input>
  </v-date-picker>
</template>

<script>
import { setupCalendar, DatePicker } from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

setupCalendar({
  firstDayOfWeek: 2, // Monday
  datePickerShowDayPopover: false,
  popoverVisibility: 'focus',
  datePickerTintColor: '#f5be37',
});

export default {
  name: 'DatePicker',
  components: {
    'v-date-picker': DatePicker,
  },
  data() {
    return {
      selectedDate: {
        start: this.$moment.utc().startOf('day'),
        end: this.$moment.utc().startOf('day'),
      },
    };
  },
  computed: {
    rangeStart() {
      return this.selectedDate
        ? this.$moment.utc(this.selectedDate.start).unix()
        : null;
    },
    rangeEnd() {
      return this.selectedDate
        ? this.$moment.utc(this.selectedDate.end).endOf('day').add(1, 'day').unix()
        : this.$moment.utc().endOf('day');
    },
  },
  watch: {
    rangeStart(val) {
      return this.$emit('range-start', val);
    },
    rangeEnd(val) {
      return this.$emit('range-end', val);
    },
  },
};
</script>

<style scoped>

</style>
