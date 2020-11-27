





$('#search-input').on('keyup', function(){
    var value = $(this).val();
    console.log(value);
});

function getAllMovies(){

    $.ajax({
        type:'GET',
        url: 'http://192.168.1.150:3000/api/movies',
        success: (movies)=>{
            placeAllMovies(movies);
        }
    });
}


function placeAllMovies(movies){
    var $movielist = $('#panel1');
    $movielist.append("<li><div class='bg'></div><p id='title'>Test</p></li>");


    var $LiElement = $movielist.find('li');



    var $LiWidth = $LiElement.outerWidth(true);
    var $LiHeight = $LiElement.outerHeight(true);
    $movielist.find('li').remove();

    var $PanelWidth = $movielist.width();
    var $PanelHeight = $movielist.height();

    var $maxElementsPerRow = Math.floor( $PanelWidth/$LiWidth);
    var $maxRows = Math.floor($PanelHeight/$LiHeight);


    var $maxElementsPerPage = $maxRows * $maxElementsPerRow;

    console.log("Max Rows = " + $maxRows + "   max elements per row = " + $maxElementsPerRow + " Max elements: " + $maxElementsPerPage);


    var i = 0;
    $.each(movies, (i, movie)=>{
        if(i < $maxElementsPerPage)
        $movielist.append("<li><div class='bg'><p id='title'>"+movie.title+"</p><p id='desc'>"+movie.desc+"</p><div class='container'><a href='' class='btn btn-2'>more</a></div></li>");

       i++;

    });
}



$(function (){



    getAllMovies();


    $(window).resize(function(){
        console.log("resize");
        getAllMovies();
    });

    var $filter = $('#Filter');
    var $searchInput =  $filter.find('#searchInput');
    $searchInput.on('keyup', function(){

        var value = $('#searchInput').val();

        var rows = $('.ContentList li');
        rows.filter(function(){
            console.log(value + " compared to " +  $(this).find('p').text());
            $(this).toggle($(this).find('p').text().toLowerCase().indexOf(value) > -1);
        });

    });

});

/*
    Side note. preferably if we could calculate how many elemnts there can be in one "page"
*   Checks if there is overlflow in the list, if there is put items on another page untill it isn't
*   Add buttons based on how many pages there are
*
*    ADD A PAGE
*   Add a ul with class panel to #content to to make a page.
*   ul
*
*    ADD AN ITEM
*   Add a li with tag movieItem with a div inside with class bg and a
*   tag with class title
*   li>div.bg+p.title
*/
function thing(){
    $listcontainer = $(".ContentList");
    $item = $(".item");
    width = $listcontainer.width();
    height = $listcontainer.height();

    ItemMargin = 20;
    ItemWidth = $item.width();
    ItemHeight = $item.height();






}



