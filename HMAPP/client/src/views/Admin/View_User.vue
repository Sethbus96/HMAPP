<template>
  <div class="admin">
    <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container"><a class="navbar-brand logo" href="#">HMA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse"
              id="navcol-1">
              <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item" role="presentation"><a class="nav-link" href="dashboard1.html">Dashboard</a></li>
                  <li class="nav-item" role="presentation"><a class="nav-link" href="index1.html">LOGOUT</a></li>
              </ul>
          </div>
      </div>
    </nav>
    <main class="page" style="background-color: #f6f6f6;">
      <section class="clean-block about-us">
          <div class="container">
              <h4 class="text-left" style="margin-bottom: 10px;">Welcome to the Administration Dashboard</h4>
              <h5 class="text-left" style="margin-bottom: 30px;">Name: <strong>Dr. Sampson Nketia</strong></h5>
              <div class="row">
                  <div class="col">
                      <div class="block-heading" style="padding-top: 0px;margin-bottom: 0px;">
                          <h2 class="text-info" style="margin-bottom: 0px;">John Smith's Reported Issues</h2>
                      </div>
                  </div>
              </div>
              <div class="block-heading" style="padding: 0px;">
                  <div class="d-flex justify-content-center" style="margin-top: 30px;"></div>
                  <div class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-10 col-lg-9" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;">
                          <div class="row" style="background-color: #ffffff;">
                              <div class="col" style="padding: 10px;padding-right: 16px;">
                                  <p class="text-left" style="font-weight: bold;font-size: 18px;margin: 0px;max-width: none;">I need help now!</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">I have a stomach problem. I am not able visit the toilet now adays. I need help with that urgently since I may die from constipation. I need a personal doctor to assist with my health.</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">12:12pm 02/01/2021</p><button class="btn btn-primary btn-sm" type="button" style="width: 170px;padding: 6px;">Respond</button></div>
                              </div>
                          </div>
                          <div class="row d-flex justify-content-center" style="background-color: #f7f8ff;padding: 10px;">
                              <div class="col-md-10 col-lg-9 col-xl-8" style="padding: 20px;background-color: #ffffff;">
                                  <form><textarea class="form-control" id="rmessage" style="margin-top: 15px;" placeholder="Enter response" required="" name="rmessage"></textarea><button class="btn btn-primary" type="submit" style="margin-top: 15px;">Done</button></form>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="d-flex justify-content-center" style="margin-top: 30px;">
                      <div class="col-md-10 col-lg-9" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;">
                          <div class="row" style="background-color: #ffffff;">
                              <div class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;"><img src="assets/img/Seth3e.jpg" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;">
                                  <p class="text-left" style="font-weight: bold;font-size: 18px;margin: 0px;max-width: none;">I need help now!</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">I have a stomach problem. I am not able visit the toilet now adays. I need help with that urgently since I may die from constipation. I need a personal doctor to assist with my health.</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">12:12pm 02/01/2021</p>
                                  </div>
                              </div>
                          </div>
                          <div class="row" style="padding-left: 47px;background-color: #f7f8ff;">
                              <div class="col-3 col-md-2 col-lg-2 col-xl-2" style="padding: 10px 15px;background-color: #f7f8ff;"><img src="assets/img/Seth3e.jpg" style="width: 100%;"></div>
                              <div class="col" style="padding: 10px;padding-right: 16px;background-color: #f7f8ff;">
                                  <p class="text-left" style="font-size: 12px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;font-weight: bold;">DR. Rahim Mohamed</p>
                                  <p class="text-left" style="font-size: 15px;margin-right: 0px;margin-left: 0px;max-width: none;margin-bottom: 10px;">You must rest and get medical attention soon!</p>
                                  <div class="d-flex align-items-center">
                                      <p class="text-left" style="width: 100%;margin: 0px;max-width: none;font-size: 12px;">12:12pm 02/01/2021</p>
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

</script>
