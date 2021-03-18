<template>
  <div class="admin_dashboard">
      <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
        <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse"
                id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item" role="presentation"><a class="nav-link active" href="dashboard1.html">Dashboard</a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" @click="logout" href="#">LOGOUT</a></li>
                </ul>
            </div>
        </div>
      </nav>
      <main class="page" style="background-color: #f6f6f6;">
        <section class="clean-block about-us">
            <div class="container">
                <div class="block-heading" style="padding: 0px;">
                    <h4 class="text-left" style="margin-bottom: 10px;">Welcome to the Administration Dashboard</h4>
                    <h5 class="text-left" style="margin-bottom: 30px;">Name: <strong>{{ user_name }}</strong></h5>
                    <div class="row">
                        <div class="col">
                            <div class="block-heading" style="padding-top: 0px;margin-bottom: 10px;">
                                <h2 class="text-info">All Patients</h2>
                                <p>Click on Patient to view and respond to reported issues</p>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div v-for="user in users" :key="user._id" class="col-sm-6 col-lg-4" style="padding: 15px;">
                            <div class="card clean-card text-center">
                                <div class="card-body info">
                                    <h4 class="card-title" style="font-size: 20px;">{{ user.name }}</h4>
                                    <p class="card-text" style="font-size: 15px;">{{ user.reports }} reported issues</p><a class="card-link stretched-link" href="#"></a></div>
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
      users: [],
      showAddReport: false,
      errorDialog: false,
      reported: false,
      errormessage: "",
      user_name: "",
      user_id: "",
      addReportDetails: { subject: '', issue: '', image: '', token: '' },
    };
  },
  computed: {
    reverseReports() {
      return this.reports.slice().reverse();
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
      .post("/doctor/getAllPatients", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          this.users = Response.data.users;

          for(let i = 0; i < this.users.length; i++){
            this.users[i].reports = Response.data.reports[i];
          }

        }
        if (Response.data.error) {
          this.$router.push("/admin-login");
        }
      })
      .catch(Error => {
        // TO-DO
    });
  },
  methods: {
    logout() {
      cookies.remove("token");
      this.$router.push("/admin-login");
    },
    addReport() {
      this.addReportDetails.token = cookies.get("token");
      this.$axios
        .post('/user/addReport', this.addReportDetails)
        .then((Response) => {
          if (Response.data.success) {
            this.errorDialog = false;
            this.showAddReport = false;
            this.reported = true;
            this.reports.push(Response.data.reports);
          }
          if (Response.data.error) {
            this.errormessage = Response.data.error;
            this.errorDialog = true;
          }
        })
        .catch((Error) => {
          // TO-DO
        });

    },
    getResponds(id) {
      return true;
    }
  }
};
</script>
