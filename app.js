
//// this carousel needs atleast 3 or more items (li) to work properly
/* This carousel uses classes to make animation and positioning. so you can adjust the classes to suit your needs. the classes are as bellow :



    .post_inactive

                                    ------------;
                .post_active	    			|
                                                            |
                                    .active			|---->    " visible part "
                                                            |
                .pre_active						|
                                    ------------!
                                	
    .pre_inactive

 
*/


let anim_targ = document.querySelectorAll(".card")
// setting initial number for starting from
let n = 0;
// setting time for slider to switch (in ms)
let $time = 3000;

// Getting card list
let cards = document.querySelectorAll("#slider_parent .card");
let main = document.querySelector("#slider_parent");


// check if there is enough item in container
if (cards.length < 5) {
    //if there is less than 5 item, then every item will be duplicated to reach the proper limit
    let cards01 = document.querySelectorAll("#slider_parent li");
    for (var i = 0; i < cards01.length; ++i) {
        main.appendChild(cards01[i].cloneNode(true));
    }
    cards = document.querySelectorAll("#slider_parent li");
    cards.forEach(function (item) {
        item.classList = "card";
    });
} else {
    //set all divs to class ".card" only
    cards.forEach(function (item) {
        item.classList = "card";
    });
}

//creating function for adding and removeing classes as a chain
function counting() {
    //set all divs to class ".card" only
    cards.forEach(function (item) {
        item.classList = "card";
    });

    // placing ".post_inactive" class and removeing previously added one

    if (n == 0) {
        cards[cards.length - 2].classList.add("post_inactive");
        cards[cards.length - 2].classList.remove("post_active");
    } else if (n == 1) {
        cards[cards.length - 1].classList.add("post_inactive");
        cards[cards.length - 1].classList.remove("post_active");
    } else {
        cards[n - 2].classList.add("post_inactive");
        cards[n - 2].classList.remove("post_active");
    }

    // placing ".post_active" class and removeing previously added one

    if (n == 0) {
        cards[cards.length - 1].classList.add("post_active");
        cards[cards.length - 1].classList.remove("active");
    } else {
        cards[n - 1].classList.add("post_active");
        cards[n - 1].classList.remove("active");
    }

    // placing ".active" class and removeing previously added one

    cards[n].classList.add("active");
    cards[n].classList.remove("pre_active");

    // placing ".pre_active" class and removeing previously added one

    if (n + 1 >= cards.length) {
        cards[0].classList.add("pre_active");
        cards[0].classList.remove("pre_inactive");
    } else {
        cards[n + 1].classList.add("pre_active");
        cards[n + 1].classList.remove("pre_inactive");
    }

    // placing ".pre_inactive" class and removeing previously added one

    if (n + 2 > cards.length - 1) {
        cards[n + 2 - cards.length].classList.add("pre_inactive");
        cards[n + 2 - cards.length].classList.remove("post_inactive");
    } else {
        cards[n + 2].classList.add("pre_inactive");
        cards[n + 2].classList.remove("post_inactive");
    }
}

function eadge() {
    if (n >= cards.length - 1) {
        n = 0;
    } else {
        n++;
    }
    counting();
};

function goNext() {

    anim_targ.forEach((i) => {
        i.style.transition = "all .3s ease"
    })


    debouncer()
    if (n >= cards.length - 1) {
        n = 0;
    } else {
        n++;
    }
    counting();
    clearInterval(slideLoop)
}
function goPrev() {
    anim_targ.forEach((i) => {
        i.style.transition = "all .3s ease"
    })
    debouncer()
    if (n == 0) {
        n = cards.length - 1;
    } else {
        n--;
    }
    counting();
    clearInterval(slideLoop)
}

// adding onClick event for card Items 
cards.forEach((item, index) => {
    item.addEventListener('click', () => {
        n = index
        debouncer()
        counting();
        clearInterval(slideLoop)
    })
})

// running "counting()" function evey "$time" secoends to make a loop
counting();
let slideLoop = setInterval(eadge, $time);

let debouncer = _.debounce(() => {
    counting();
    slideLoop = setInterval(eadge, $time);
    anim_targ.forEach((i) => {
        i.style.transition = "all 1s ease"
    })
}, 500);