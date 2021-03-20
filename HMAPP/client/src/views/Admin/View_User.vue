<template>
  <div class="admin">
    <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse"
              id="navcol-1">
              <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation"><a class="nav-link active" href="/admin">Dashboard</a></li>
                  <li class="nav-item" role="presentation"><a class="nav-link" @click="logout" href="/admin-login">LOGOUT</a></li>
              </ul>
          </div>
      </div>
    </nav>
    <main class="page" style="background-color: #f6f6f6;">
      <section class="clean-block about-us">
          <div class="container">
              <h4 class="text-left" style="margin-bottom: 10px;">Welcome to the Administration Dashboard</h4>
              <h5 class="text-left" style="margin-bottom: 30px;">Name: <strong>{{ user_name }}</strong></h5>
              <div class="row">
                  <div class="col">
                      <div class="block-heading" style="padding-top: 0px;margin-bottom: 0px;">
                          <h2 class="text-info" style="margin-bottom: 0px;">{{ patient_name }}'s Reported Issues</h2>
                      </div>
                  </div>
              </div>
              <div v-for="log in reverseLogs" :key="log._id" class="block-heading" style="padding: 0px;">
                  <div class="d-flex justify-content-center" style="margin-top: 30px;"></div>
                  <div class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-10 col-lg-9" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;">
                          <div class="row" style="background-color: #ffffff;">
                              <div v-if="log.image" class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;"><img :src="log.image" :alt="log.subject" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;">
                                  <p class="text-left" style="font-weight: bold;font-size: 18px;margin: 0px;max-width: none;">{{ log.subject }}</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">{{ log.issue }}</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">{{ log.created }}</p></div>
                              </div>
                          </div>
                          <div v-if="!log.response" class="row d-flex justify-content-center" style="background-color: #f7f8ff;padding: 10px;">
                              <div class="col-md-10 col-lg-9 col-xl-8" style="padding: 20px;background-color: #ffffff;">
                                  <form @submit.prevent="addResponse(log._id)" >
                                  <textarea v-model="addResponseDetails.response" class="form-control" id="rmessage" style="margin-top: 15px;" placeholder="Enter response" required="" name="rmessage"></textarea>
                                  <button class="btn btn-primary" type="submit" style="margin-top: 15px;">Done</button>
                                  </form>
                              </div>
                          </div>
                          <div v-if="log.response" class="row" style="padding-left: 47px;background-color: #f7f8ff;">
                              <div v-if="log.response.image" class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;background-color: #f7f8ff;"><img :src="log.response.image" :alt="log.response.doctor_name" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;background-color: #f7f8ff;">
                                  <p class="text-left" style="font-size: 12px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;font-weight: bold;">Doctor: {{ log.response.doctor_name }}</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">{{ log.response.message }}</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">{{ log.response.created }}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default {
  data: () => {
    return {
      user_name: "",
      patient_name: "",
      user_logs: [],
      addResponseDetails: { response: '' },
    };
  },
  computed: {
    reverseLogs() {
      return this.user_logs.slice().reverse();
    },
  },
  beforeCreate() {
    this.$axios
      .post("/doctor/verify", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          this.user_name = Response.data.name;
        }
        if (Response.data.error) {
          this.$router.push("/admin-login");
        }
      })
      .catch(Error => {
        // TO-DO
      });
  },
  mounted() {
  this.$axios
    .post("/doctor/getUserLogs", { user_id: cookies.get("-u"), token: cookies.get("token") })
    .then(Response => {
      if (Response.data.success) {
        this.user_logs = Response.data.reports;
        this.patient_name = Response.data.patient;

        for(let i = 0; i < this.user_logs.length; i++){
          this.user_logs[i].response = Response.data.response[i];
        }

      }
      if (Response.data.error) {
        // TO-DO: I'll handle the error here
      }
    })
    .catch(Error => {
      // TO-DO
    });
  },
  methods: {
    logout() {
      cookies.remove("token");
    },
    addResponse(id) {
      this.addResponseDetails.issue_id = id;
      this.addResponseDetails.token = cookies.get("token");

      this.$axios
        .post('/doctor/addResponse', this.addResponseDetails)
        .then((Response) => {
          if (Response.data.success) {
            this.$router.go();
          }
          if (Response.data.error) {
            // TO-DO
          }
        })
        .catch((Error) => {
          // TO-DO
        });

    },
  },
};
</script>
