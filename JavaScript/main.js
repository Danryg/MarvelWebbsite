





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
        url: 'http://localhost:3001/api/movies',
        success: (movies)=>{
            $.each(movies, (i, movie)=>{
                console.log(movie.title);

                $movielist.append("<li><div class='bg'></div><p id='title'>"+movie.title+"</p></li>");
            });



        }

    });


});

/*
    Side note. preferably if we could calculate how many elemnts there can be in one "page"
*   Checks if there is overlflow in the list, if there is put items on another page untill it isn't
*   Add buttons based on how many pages there are
*
*/
function thing(){

}



