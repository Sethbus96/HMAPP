<template>
  <div class="home">
    <b-nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse"
              id="navcol-1">
              <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation"><a class="nav-link active" href="/">HOME</a></li>
                  <li class="nav-item" role="presentation"><a class="nav-link" href="/about">ABOUT US</a></li>
              </ul>
          </div>
      </div>
    </b-nav>
    <main class="page landing-page" style="padding: 0px;width: 100%;">
        <section class="d-flex align-items-center clean-block clean-hero" style="background-image: url(&quot;assets/img/walter-otto-PT70CT6mATQ-unsplash.jpg&quot;);color: rgba(9, 162, 255, 0.85);height: 100vh;">
            <div class="text">
                <div class="container" style="margin-bottom: 30px;" v-if="errorDialog">
                    <div class="text-center border rounded-0 border-danger" style="width: 100%;height: auto;padding: 15px;background-color: rgba(255,0,0,0.37);">
                        <p style="margin-bottom: 0px;color: rgb(255,187,187);">{{errormessage}}</p>
                    </div>
                </div>
                <div class="container" style="margin-bottom: 30px;" v-if="loginDialog">
                    <div class="text-center border rounded-0 border-success" style="width: 100%;height: auto;padding: 15px;background-color: rgba(255, 255, 255, 0.88);">
                        <p style="margin-bottom: 0px;color: rgb(42, 153, 1);">You have successfully Registered. <br>Please login with your Email and Password</p>
                    </div>
                </div>
                <h2>Hospital Management Assistance</h2>
                <h5 style="margin-bottom: 40px;">We connect you to the doctors</h5>
                <div class="container" style="margin-top: 30px;background-color: rgba(255,255,255,0.3);margin-bottom: 30px;padding: 0px;">

                    <form @submit.prevent="login" v-if="!showRegisterForm" style="padding: 40px;border-top: 2px solid #004189;">
                        <div class="input-group" style="margin-bottom: 16px;font-size: 16px;">
                            <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-user" style="font-size: 20px;"></i></span></div>
                              <input class="form-control" type="text" v-model="loginDetails.emailorphone" id="user" required="" placeholder="Email or Phone..." name="user" autocomplete="off" pattern="([0-9]{9,})$|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$" title="Must contain either a mobile number(eg. 0234567890) or a valid email address(eg. yourname@email.com)">
                            </div>
                        <div class="input-group" style="margin-bottom: 16px;font-size: 16px;">
                            <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-key" style="font-size: 20px;"></i></span></div>
                              <input class="form-control" type="password" v-model="loginDetails.password" id="pass" required="" placeholder="Password..." pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and must be at least 6 or more characters" name="pass" autocomplete="off">
                            </div>
                        <div class="form-group" style="margin-bottom: 0px;"><button class="btn btn-primary btn-block" style="margin-bottom: 16px;" type="submit">LOGIN</button></div>
                        <a href="#">
                            <p style="margin-bottom: 0px;font-size: 15px;" @click="showRegisterForm =! showRegisterForm">New here? Register</p>
                        </a>
                    </form>

                    <form @submit.prevent="register" v-if="showRegisterForm" style="padding: 40px;border-top: 2px solid #004189;"><input class="form-control" v-model="registerDetails.name" type="text" id="fname" name="fname" placeholder="Full name...(eg. John Doe)" pattern="(?=.*[' '][A-Z][a-z]).{6,}" title="Must contain at least two seperate names, with uppercase and lowercase letters. (eg. John Doe, Janet Morgan...)"
                            required="" autocomplete="off" style="margin-bottom: 16px;"><input class="form-control" type="text" v-model="registerDetails.emailorphone" id="user" required="" placeholder="Email or Phone..." name="user" autocomplete="off" pattern="([0-9]{9,})$|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$"
                            title="Must contain either a mobile number(eg. 0234567890) or a valid email address(eg. yourname@email.com)" style="margin-bottom: 16px;"><input class="form-control" type="password" v-model="registerDetails.password" id="pass" required="" placeholder="Password..."
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and must be at least 6 or more characters" name="pass" autocomplete="off" style="margin-bottom: 16px;">
                        <input
                            class="form-control" type="password" v-model="registerDetails.cpassword" id="cpass" required="" placeholder="Retype Password..." name="cpass" autocomplete="off" style="margin-bottom: 16px;">
                            <div class="form-group" style="margin-bottom: 16px;"><button class="btn btn-primary btn-block" type="submit">REGISTER</button></div>
                            <a href="#">
                                <p style="margin-bottom: 0px;font-size: 15px;" @click="showRegisterForm =! showRegisterForm">Already a member? Login</p>
                            </a>
                    </form>

                </div>
            </div>
        </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {
  data: () => ({
    showRegisterForm: false,
    loginDetails: { emailorphone: '', password: '' },
    registerDetails: {
      name: '', emailorphone: '', password: '', cpassword: '',
    },
    errorDialog: false,
    loginDialog: false,
    errormessage: '',
  }),
  methods: {
    login() {
      this.$axios
        .post('/user/login', this.loginDetails)
        .then((Response) => {
          if (Response.data.success) {
            cookies.set('token', Response.data.success, {
              expires: new Date(Date.now() + 2.592e8),
            });
            this.$router.push(Response.data.url);
          }
          if (Response.data.error) {
            this.loginDialog = false;
            this.errormessage = Response.data.error;
            this.errorDialog = true;
          }
        })
    },
    register() {
      this.$axios
        .post('/user/register', this.registerDetails)
        .then((Response) => {
          if (Response.data.success) {
            this.errorDialog = false;
            this.showRegisterForm = false;
            this.loginDialog = true;
          }
          if (Response.data.error) {
            this.loginDialog = false;
            this.errormessage = Response.data.error;
            this.errorDialog = true;
          }
        })
    },
  },
  beforeCreate() {
    if (cookies.get('token')) {
      this.$axios
        .post('/user/verify', { token: cookies.get('token') })
        .then((Response) => {
          if (Response.data.success) {
            this.$router.push('/dashboard');
          }
          if (Response.data.error) {
            this.errormessage = Response.data.error;
            this.errorDialog = true;
          }
        });
    }
  },
  destroyed() {
    this.$router.go(0);
  },
};

</script>
