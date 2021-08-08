
const pvProps = {
    // setting time for slider to switch (in ms)
    $time: 3000,
    // setting Auto play
    $autoPlay: true,
    // adds a pause to arrow btn functionality
    $btnClickPause: false,
    // adding Onclick event to slide cards, to make them switch
    $clickable: false,

};


//debounce function to control the intractivity behavior
const debounce = (func, delay, { leading } = {}) => {
    let timerId

    return (...args) => {
        if (!timerId && leading) {
            func(...args)
        }
        clearTimeout(timerId)

        timerId = setTimeout(() => func(...args), delay)
    }
}

// setting initial number to start from. adding setter and getter to watch the value
const initialNum = {
    num: 0,
    aListener: function (val) { },
    set n(val) {
        this.num = val;
        this.aListener(val);
    },
    get n() {
        return this.num;
    },
    switchListener: function (listener) {
        this.aListener = listener;
    }
}

// Getting card list
let cards = document.querySelectorAll("#pvc_container li");
let main = document.querySelector("#pvc_container");
let anim_targ = document.querySelectorAll(".pvc_item")

// check if there is enough item in container
if (cards.length < 5) {
    //if there is less than 5 item, then every item will be duplicated to reach the proper limit
    let cards01 = document.querySelectorAll("#pvc_container li");
    for (var i = 0; i < cards01.length; ++i) {
        main.appendChild(cards01[i].cloneNode(true));
    }
    cards.forEach(function (item) {
        item.classList = "pvc_item";
    });
} else {
    //set all divs to class ".pvc_item" only
    cards.forEach(function (item) {
        item.classList = "pvc_item";
    });
}
//creating function for adding and removeing classes as a chain
function counting() {
    //set all divs to class ".pvc_item" only
    cards.forEach(function (item) {
        item.classList = "pvc_item";
    });

    // placing ".post_inactive" class and removeing previously added one

    if (initialNum.n == 0) {
        cards[cards.length - 2].classList.add("post_inactive");
        cards[cards.length - 2].classList.remove("post_active");
    } else if (initialNum.n == 1) {
        cards[cards.length - 1].classList.add("post_inactive");
        cards[cards.length - 1].classList.remove("post_active");
    } else {
        cards[initialNum.n - 2].classList.add("post_inactive");
        cards[initialNum.n - 2].classList.remove("post_active");
    }

    // placing ".post_active" class and removeing previously added one

    if (initialNum.n == 0) {
        cards[cards.length - 1].classList.add("post_active");
        cards[cards.length - 1].classList.remove("active");
    } else {
        cards[initialNum.n - 1].classList.add("post_active");
        cards[initialNum.n - 1].classList.remove("active");
    }

    // placing ".active" class and removeing previously added one

    cards[initialNum.n].classList.add("active");
    cards[initialNum.n].classList.remove("pre_active");

    // placing ".pre_active" class and removeing previously added one

    if (initialNum.n + 1 >= cards.length) {
        cards[0].classList.add("pre_active");
        cards[0].classList.remove("pre_inactive");
    } else {
        cards[initialNum.n + 1].classList.add("pre_active");
        cards[initialNum.n + 1].classList.remove("pre_inactive");
    }

    // placing ".pre_inactive" class and removeing previously added one

    if (initialNum.n + 2 > cards.length - 1) {
        cards[initialNum.n + 2 - cards.length].classList.add("pre_inactive");
        cards[initialNum.n + 2 - cards.length].classList.remove("post_inactive");
    } else {
        cards[initialNum.n + 2].classList.add("pre_inactive");
        cards[initialNum.n + 2].classList.remove("post_inactive");
    }
}

function initialNumLoop() {
    if (initialNum.n >= cards.length - 1) {
        initialNum.n = 0;
    } else {
        initialNum.n++;
    }
    counting();
};

function goNext() {
    if (pvProps.$btnClickPause) { return }
    pvProps.$btnClickPause = true
    setTimeout(() => { pvProps.$btnClickPause = false }, 1000)
    debouncer()
    if (initialNum.n >= cards.length - 1) {
        initialNum.n = 0;
    } else {
        initialNum.n++;
    }
    counting();
    clearInterval(slideLoop)
}
function goPrev() {
    if (pvProps.$btnClickPause) { return }
    pvProps.$btnClickPause = true
    setTimeout(() => { pvProps.$btnClickPause = false }, 500)
    debouncer()
    if (initialNum.n == 0) {
        initialNum.n = cards.length - 1;
    } else {
        initialNum.n--;
    }
    counting();
    clearInterval(slideLoop)
}

// adding onClick event for card Items
if (pvProps.$clickable) {
    cards.forEach((item, index) => {
        item.addEventListener('click', () => {
            initialNum.n = index
            debouncer()
            counting();
            clearInterval(slideLoop)
        })
    })
}


// adding onDrag functionality
// let dragMove;
// let dragArr = []
// cards.forEach((item, index) => {
//     item.addEventListener('dragover', (event) => {
//         dragArr.push(event.clientY)
//     })
//     item.addEventListener('dragend', () => {
//         dragMove = dragArr[0] - dragArr[dragArr.length - 1]
//         dragArr = []
//         console.log(dragMove);
//         console.log(initialNum.n)
//         if (dragMove > 0 && initialNum.n < cards.length - 1) {
//             initialNum.n++
//         } else if (dragMove > 0 && initialNum.n >= cards.length - 1) {
//             initialNum.n = 0
//         }
//         else if (dragMove < 0 && initialNum.n !== 0) {
//             initialNum.n--
//         }
//         else if (dragMove < 0 && initialNum.n == 0) {
//             initialNum.n = cards.length - 1;

//         } else {
//             return
//         }

//         debouncer()
//         counting();
//         clearInterval(slideLoop)
//     })
// })

// running "counting()" function evey "$time" secoends to make a loop
counting();
let slideLoop = setInterval(() => {
    if (pvProps.$autoPlay) {
        initialNumLoop()
    }
}, pvProps.$time);
let debouncer = debounce(() => {
    counting();
    slideLoop = setInterval(() => {
        if (pvProps.$autoPlay) {
            initialNumLoop()
        }
    }, pvProps.$time);
}, 500);