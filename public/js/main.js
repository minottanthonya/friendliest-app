var $friends = $("#friends");
var $name = $("#name");
var $occupation = $("#occupation");
var $age = $("#age");
var friendTemplate = "" + "<li>" +
    "<p><strong>Name: </strong> {{name}}</p>" +
    "<p><strong>Occupation: </strong>{{occupation}}</p>" +
    "<p><strong>Age: </strong> {{age}}</p>"+
    "</li>";
function addFriend(friend){
    $friends.append(Mustache.render(friendTemplate, friend));
}

$(document).ready(function(){
    //     alert("it works")

    //GET Data request
    $.ajax({
        type : "GET",
        url  : "http://rest.learncode.academy/api/learncode/friends",

//is success linked to ajax
        success: function(friends){
            $.each(friends, function(i, friend){
                addFriend(friend);
            });
        },
        //Error
        error : function(){
            alert("Error loading friends");
        }
    

    });

});