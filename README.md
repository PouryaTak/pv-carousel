# pv-carousel
[See Example](https://pouriversal.github.io/pv-carousel/)

-----------------------------

This carousel needs atleast 3 items (li) to work properly
It uses css classes to make animation and positioning. so you can adjust the classes to suit your needs. the classes are as bellow and Js will switch these classes automatically on every "$time" intervals :


    .post_inactive
                                  ------------;
                .post_active                  |
                                              |
                            .active           |---->    " use these classes as the visible part "
                                              |
                .pre_active                   |
                                  ------------!
    .pre_inactive


### How to use:

Create a ul with ID of "#pvc_container", and and add your Carousel items as li's.
Include thes script tags to your html file:
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script src="app.js"></script>
