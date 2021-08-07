# pv-carousel
[See Example](https://pouriversal.github.io/pv-carousel/)

---
PV-Carousel is based on CSS class shift so you can set any style and transition you want.
This will work on more than 2 items on the list.
Auto play, on click, next and prev buttons options are available.
The transition position and functions will adjusted by CSS only.. Classes are as bellow and Js will switch these classes automatically on every "$time" intervals :


    .post_inactive
                                  ------------;
                .post_active                  |
                                              |
                            .active           |---->    " Use these css classes for the visible part "
                                              |
                .pre_active                   |
                                  ------------!
    .pre_inactive



## How to use:


- Download and including these script tags to your html file:

```html
  <script src="js/app.js"></script>
```

- Create an ul tag with id of **_"#pvc_container"_** and add your Carousel items as li tag's.
Then style **" .pvc_item "** in your css and set desired styles for **' .active '**, **' .post_active '**, **' .post_inactive '**, **' .pre_active '** and **' .pre_inactive '** states.

You can use **" goNext() "** and **" goPrev() "** for arrow buttons.

To sync any outer functionality to carousel switch, use this watcher:

```js
initialNum.switchListener((val) => {
/* your function */
})
```


- In the app.js adjust these values if needed:

```js

      const pvProps = {
        // setting time for slider to switch (in ms)
        $time: 3000,
        // setting Auto play
        $autoPlay: true,
    };

```
