





$('#search-input').on('keyup', function(){
    var value = $(this).val();
    console.log(value);
});

$(function (){

    var $filter = $('#Filter');

    var $searchInput =  $filter.find('#searchInput');
    $searchInput.on('keyup', ()=>{

        var value = $('#searchInput').val();

        var rows = $('#listofmovies li');
        rows.filter(function(){
            console.log(value + " compared to " +  $(this).find('p').text());
            $(this).toggle($(this).find('p').text().toLowerCase().indexOf(value) > -1);
        });

    });

    var $movielist = $('#listofmovies');


    $.ajax({
        type:'GET',
        url: 'http://localhost:3000/api/movies',
        success: (movies)=>{
            $.each(movies, (i, movie)=>{
                console.log(movie.title);

                $movielist.append("<li><div class='bg'></div><p id='title'>"+movie.title+"</p></li>");
            });



        }

    });


});
function buildTable(data){




}

function searchTable(value, movies){

    var filterTable = [];

    $.each(movies, (i, movie)=>{


    });
}


    function sortByRating(){

    }

    function sortByOrder(){

    }

