<template>
  <div class="user">
    <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse"
              id="navcol-1">
              <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation"><a class="nav-link" @click="logout" href="#">LOGOUT</a></li>
              </ul>
          </div>
      </div>
    </nav>
    <main class="page" style="background-color: #f6f6f6;">
      <section class="clean-block about-us">
          <div class="container">
              <div class="block-heading" style="padding: 0px;">
                  <h4 class="text-left" style="margin-bottom: 30px;">Welcome to your Dashboard, {{ user_name }}.</h4>
                  <div class="d-flex justify-content-center" style="width: 100%;margin-bottom: 30px;">
                      <div v-if="errorDialog" class="text-center border rounded-0 border-danger" style="width: 50%;height: auto;padding: 15px;background-color: rgba(255,0,0,0.37);">
                          <p style="margin-bottom: 0px;color: rgb(99,0,0);">There was an error!</p>
                      </div>
                  </div><button class="btn btn-light" @click="showAddReport =! showAddReport" type="button">Add A New Report</button>
                  <div v-if="showAddReport" class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-9 col-lg-7 col-xl-6" style="padding: 20px;background-color: #ffffff;">
                          <form @submit.prevent="addReport">
                          <input class="form-control" type="text" v-model="addReportDetails.subject" id="subject" placeholder="Subject" required="" name="subject">
                          <textarea class="form-control" v-model="addReportDetails.issue" id="issue" style="margin-top: 15px;" placeholder="Medical issue" required="" name="issue"></textarea>
                          <input class="form-control" type="text" v-model="addReportDetails.image" id="imageurl" style="margin-top: 15px;" placeholder="Image URL - Optional" name="imageurl">
                          <button class="btn btn-primary" type="submit" style="margin-top: 15px;">Add Report</button>
                            </form>
                      </div>
                  </div>
                  <div v-if="!reported" class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-10 col-lg-9" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;background-color: #ffffff;padding: 20px;">
                          <h5 style="margin-bottom: 0px;">Please add a report</h5>
                      </div>
                  </div>

                  <div v-for="report in reverseReports" :key="report._id" class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-10 col-lg-9" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;">
                          <div class="row" style="background-color: #ffffff;">
                              <div v-if="report.image" class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;"><img v-if="report.image" :src="report.image" :alt="report.image" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;">
                                  <p class="text-left" style="font-weight: bold;font-size: 18px;margin: 0px;max-width: none;">{{ report.subject }}</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">{{ report.issue }}</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">{{ report.created }}</p>
                                      </div>
                              </div>
                          </div>
                          <div v-if="report.response" class="row" style="padding-left: 47px;background-color: #f7f8ff;">
                              <div class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;background-color: #f7f8ff;"><img v-if="report.response.image" :src="report.response.image" :alt="report.response.doc_name" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;background-color: #f7f8ff;">
                                  <p class="text-left" style="font-size: 12px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;font-weight: bold;">{{ report.response.doc_name }}</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">{{ report.response.message }}</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">{{ report.response.created }}</p>
                                  </div>
                              </div>
                          </div>
                          <div v-if="!report.response" class="row" style="padding-left: 47px;background-color: #f7f8ff;">
                              <div class="col" style="padding: 20px;">
                                  <p>Waiting for Doctor's reply</p>
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
      reports: [],
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
      .post("/user/verify", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          this.user_name = Response.data.name;
          this.user_id = Response.data.id;
        }
        if (Response.data.error) {
          this.$router.push("/");
        }
      })
      .catch(Error => {
        // TO-DO
      });
  },
  mounted() {
    this.$axios
      .post("/user/getReports", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          if(Response.data.reports.length === 0){
            this.reported = false;
          }
          else{
            this.reported = true;
            this.reports = Response.data.reports;

            for(let i = 0; i < this.reports.length; i++){

            this.$axios
              .get("/user/getResponse", { issue_id: this.reports[i]._id })
              .then(Response => {
                if (Response.data.success) {
                  this.reports[i]["response"] = Response.data.response;
                  this.user_name = Response.data.name;
                  this.user_id = Response.data.id;
                }
              })
              .catch(Error => {
                // TO-DO
              });

            }

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
      this.$router.push("/");
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
