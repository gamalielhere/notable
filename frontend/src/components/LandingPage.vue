<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col cols="3">
        <div class="side-menu pt-5 px-2">
          <h1 class="white--text text-uppercase pb-5 text-left">Notable</h1>
          <v-list dense flat rounded v-if="!fetchingPhysicians">
            <v-subheader>Physicians</v-subheader>
            <v-list-item-group v-model="selectedPhysician" color="primary">
              <v-list-item
                v-for="(value, key) in physicians"
                :key="`physician${key}`"
              >
                <v-list-item-content>
                  {{ value.lname }}, {{ value.fname }}
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div v-else>Loading Physician info...</div>
        </div>
      </v-col>
      <v-col cols="9">
        <div
          class="main-content text-left pa-5"
          v-if="!fetchingAppointments && !fetchingPhysicians"
        >
          <h2>
            Dr. {{ selectedPhysicianInfo.fname }}
            {{ selectedPhysicianInfo.lname }}
          </h2>
          <h3>{{ selectedPhysicianInfo.email }}</h3>
          <v-data-table
            :headers="headers"
            :items="patients"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </div>
        <div v-else>Loading Appointments info...</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      selectedPhysician: 0,
      appointments: {},
      physicians: {},
      fetchingPhysicians: true,
      fetchingAppointments: true,
      headers: [
        { text: "#", sortable: true, value: "id" },
        { text: "Name", sortable: true, value: "name" },
        { text: "Time", sortable: true, value: "time" },
        { text: "Kind", sortable: true, value: "kind" },
      ],
    };
  },
  mounted() {
    this.fetchPhysicians();
  },
  computed: {
    selectedPhysicianInfo() {
      return this.physicians[this.selectedPhysician];
    },
    patients() {
      return Object.keys(this.appointments).map((id) => {
        return Object.assign({}, { id: id }, this.appointments[id]);
      });
    },
  },
  watch: {
    physicians: {
      handler: function (newVal) {
        const firstEntry = Object.keys(newVal);
        if (firstEntry.length > 0) {
          this.selectedPhysician = firstEntry[0];
          this.fetchAppointments(this.selectedPhysician);
        }
      },
      deep: true,
    },
    selectedPhysician(newVal) {
      if (typeof newVal === "undefined") {
        this.selectedPhysician = 0;
      }
      this.fetchAppointments(this.selectedPhysician);
    },
  },
  methods: {
    async fetchPhysicians() {
      this.physicians = await fetch("http://localhost:3001/physicians")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.fetchingPhysicians = false;
          return res;
        });
    },
    async fetchAppointments(id) {
      this.fetchingAppointments = true;
      this.appointments = {};
      this.appointments = await fetch(
        `http://localhost:3001/appointments?id=${id}`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.fetchingAppointments = false;
          return res;
        });
    },
  },
};
</script>

<style lang="scss">
.side-menu {
  background: #1a67c0;
  height: 100vh;
}

.main-content {
  background: #fafafa;
  height: 100vh;
}
</style>
