<template>
  <div class="admin">
      <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
        <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse"
                id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item" role="presentation"><a class="nav-link active" href="/admin-login">LOGIN</a></li>
                </ul>
            </div>
        </div>
      </nav>
      <main class="page landing-page" style="padding: 0px;">
        <section class="d-flex align-items-center clean-block clean-form dark" style="height: 100vh;">
            <div class="container">
                <div class="block-heading">
                    <div class="bg-light d-flex justify-content-center" style="width: 100%;margin-bottom: 30px;background-color: transparent !important;"">
                        <div v-if="loginDialog" class="text-center border rounded-0 border-success" style="width: 50%;height: auto;padding: 15px;">
                            <p class="text-success" style="margin-bottom: 0px;color: rgb(99,0,0);">Registration Successful.<br>Please Login</p>
                        </div>
                        <div v-if="errorDialog" class="text-center border rounded-0 border-danger" style="width: 50%;height: auto;padding: 15px;background-color: rgba(255,0,0,0.37);">
                            <p style="margin-bottom: 0px;color: rgb(99,0,0);">{{errormessage}}</p>
                        </div>
                    </div>
                    <h2 class="text-info">Admin Login</h2>
                </div>
                <form  @submit.prevent="login" v-if="!showRegisterForm">
                    <div class="input-group" style="margin-bottom: 16px;font-size: 16px;">
                        <div class="input-group-prepend"><span class="input-group-text">
                        <i class="fa fa-user" style="font-size: 20px;"></i></span></div>
                        <input v-model="loginDetails.email" class="form-control" type="text" id="email" required="" placeholder="Email" name="email" autocomplete="off" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Must contain a valid email address(eg. yourname@email.com)"></div>
                        <div class="input-group" style="margin-bottom: 16px;font-size: 16px;"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-key" style="font-size: 20px;"></i></span></div>
                        <input v-model="loginDetails.password" class="form-control" type="password" id="pass" required="" placeholder="Password..." pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" autocomplete="off"></div>
                        <button class="btn btn-primary btn-block" type="submit" style="margin-bottom: 16px;">LOGIN</button>
                        <a class="text-center" href="#"><p style="margin-bottom: 0px;font-size: 15px;" @click="showRegisterForm =! showRegisterForm" >Register as a new Doctor</p></a>
                </form>
                <form @submit.prevent="register" v-if="showRegisterForm">
                <input v-model="registerDetails.name" class="form-control" type="text" id="fname" name="fname" placeholder="Full name...(eg. John Doe)" pattern="(?=.*[' '][A-Z][a-z]).{6,}" title="Must contain at least two seperate names, with uppercase and lowercase letters. (eg. John Doe, Janet Morgan...)" required="" autocomplete="off" style="margin-bottom: 16px;">
                <input v-model="registerDetails.email" class="form-control" type="text" id="user" required="" placeholder="Email" name="user" autocomplete="off" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Must contain a valid email address(eg. yourname@email.com)" style="margin-bottom: 16px;">
                <input v-model="registerDetails.image" class="form-control" type="url" id="image" placeholder="Profile Picture Url (Optional)" name="image" autocomplete="off" title="Url to your profile image" style="margin-bottom: 16px;">
                <input v-model="registerDetails.password" class="form-control" type="password" id="pass" required="" placeholder="Password..." pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and must be at least 6 or more characters" name="pass" autocomplete="off" style="margin-bottom: 16px;">
                <input v-model="registerDetails.cpassword" class="form-control" type="password" id="cpass" required="" placeholder="Retype Password..." name="cpass" autocomplete="off" style="margin-bottom: 16px;">
                <div class="form-group" style="margin-bottom: 16px;"><button class="btn btn-primary btn-block" type="submit">REGISTER</button></div>
                <a class="text-center" href="#"><p style="margin-bottom: 0px;font-size: 15px;" @click="showRegisterForm =! showRegisterForm" >Login</p></a>
                </form>
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
    loginDetails: { email: '', password: '' },
    registerDetails: {
      name: '', email: '', image: '', password: '', cpassword: '',
    },
    errorDialog: false,
    loginDialog: false,
    errormessage: '',
  }),
  methods: {
    login() {
      this.$axios
        .post('/doctor/login', this.loginDetails)
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
        .post('doctor/register', this.registerDetails)
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
        .post('/doctor/verify', { token: cookies.get('token') })
        .then((Response) => {
          if (Response.data.success) {
            this.$router.push('/admin');
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
