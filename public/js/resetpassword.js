$(document).ready(function () {

    let modalRoute = "/reset"
    $("#reset-btn").on("click", function(){
        $("#exampleModal").load(modalRoute)
    })

})