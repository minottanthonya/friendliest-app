var $friends = $("#friends");
var $name = $("#name");
var $occupation = $("#occupation");
var $age = $("#age");
var friendTemplate =  "<tr>" + "<td>{{name}}</td>" + 
     "<td>{{occupation}}</td>"  +
     "<td>{{age}}</td>" + "<td><button id='{{id}}' class='remove btn btn-info'>X</button></td>" + "</tr>" + "<br>";
function addFriend(friend){
    $friends.append(Mustache.render(friendTemplate, friend));

    //emptys the input field
    $name.val(""),
    $occupation.val(""),
    $age.val("")
}

$(document).ready(function(){
    //  alert("it works")

    //GET Data request
    $.ajax({
        type : "GET",
        url  : "http://rest.learncode.academy/api/learncode/friends",

        //is success linked to ajax
        success: function(friends){
            friends.shift();
            friends.shift();
            $.each(friends, function(i, friend){
                addFriend(friend);
            });
            $("#numfriend").append(friends.length);
        },
        //Error
        error : function(){
            alert("Error loading friends");
        }
    });


    //POST Data request
    $("#add-friend").on("click", function(){

        //creating new friend
        var friend = {
            name: $name.val(),
            occupation: $occupation.val(),
            age: $age.val()
        };

        //adding friend
        $.ajax({
            type: "POST",
            url: "http://rest.learncode.academy/api/learncode/friends",
            data: friend,

            success: function(newFriend){
                addFriend(newFriend);
                $("#numfriend").append(friends.length);
            },
            error: function(){
                alert("Error added friend");
            }

        });
    });

    //DELETE button 
    $friends.delegate('.remove', 'click', function(){

        var $li = $(this).closest('tr');
        //AJAX DELETE Function - click the .remove class button and the id identifies what to delete
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
            success: function(){
                $li.fadeOut(300, function(){
                    $(this).remove();
                });
                $("#numfriend").append(friends.length);
            },
            error: function(){
                alert("nope");
            }
        });
    });
    
    $("#table").css("background-color", "powderblue");
});