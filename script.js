const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const countText = document.getElementsByClassName("countText");
const seats = document.querySelectorAll(".seat");


getFromLocalStorage();
calculateTotal();



container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    

    const selectSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat){
        selectSeatsArr.push(seat);
    });

    seats.forEach(function (seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexes = selectSeatsArr.map(function (seat){
        return seatsArr.indexOf(seat);
    })


    let selectedSeatCount= selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value + " TL";

    saveToLocalStorage(selectedSeatIndexes);

}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !=null && selectedSeats.length > 0 ){
        seats.forEach(function (seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });

        
    }

    const selectMovieIndex = localStorage.getItem('selectMovieIndex');

    if(selectMovieIndex != null){
        select.selectedIndex = selectMovieIndex;

    }
}


function saveToLocalStorage(indexes){
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectMovieIndex', select.selectedIndex);
}

