



var $Content;
var AllMovies;
var $moviesFromStart;
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
            $moviesFromStart = movies;
        }
    });
}




function placeAllMovies(movies, value){

    $Content.find('ul').remove();
    removeButtons();

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


    var o = 0;
    var panelNumber = 1;
    var $currentList = $movielist;
    addButton(1);
    $.each(movies, (i, movie)=>{


        if(movie.title.toLowerCase().indexOf(value) > -1){
            return false;
        }

        if(o < $maxElementsPerPage){
        $currentList.append("<li><div class='bg'><p id='title'>"+movie.title+"</p><p id='desc'>"+movie.desc+"</p><div class='container'><a href='' class='btn btn-2'>more</a></div></li>");


        }else{

            panelNumber++;
            o = 0;

            $Content.append("<ul class'ContentList' id='panel"+panelNumber+"'></ul>");
            var id = "#panel" +panelNumber;

            $currentList = $Content.find(id);

            console.log($currentList +"    i: " + o);
            addButton(panelNumber);



        }

       o++;

    });
}

function addButton(number){
    var $buttonContainer = $Content.find('#pageButtons');

    $buttonContainer.append("<div class='pButton' data-panelid='panel"+number+"'>"+number+"</div>");
    addButtonFucntionality($buttonContainer);

}

function addButtonFucntionality(buttonContainer){
    $buttons = buttonContainer.find('.pButton');

    $buttons.on("click", function(){
        hideAllPanels();
        var panelid = $(this).attr('data-panelid');
        panelid = '#' +panelid;
        console.log(panelid);
        $Content.find(panelid).show();

    });
}

function hideAllPanels(){
    $panels = $Content.find('ul');
    $panels.hide();
}

function addMovie(title, desc){


}

function removeButtons(){
    var $buttonContainer = $Content.find('#pageButtons');
    $buttonContainer.find("div").remove();
}
function onResize(){
    getAllMovies();
}


$(function (){



    $Content = $('#Content');
    getAllMovies();



    $(window).resize(function(){
        console.log("resize");

    }).delay(1000, function(){
        console.log("Resize 2");

    });



    var $filter = $('#Filter');
    var $searchInput =  $filter.find('#searchInput');
    $searchInput.on('keyup', function(){

        var value = $('#searchInput').val();

        var rows = $('#Content li');

        placeAllMovies($moviesFromStart, value);
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



