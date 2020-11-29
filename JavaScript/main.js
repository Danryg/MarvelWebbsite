



var $Content;
var AllMovies;
var $moviesFromStart;


$(function (){


    $Content = $('#Content');
    getAllMovies();



    $(window).resize(function(){
        onResize();

    }).delay(1000, function(){


    });



    var $filter = $('#Filter');
    var $searchInput =  $filter.find('#searchInput');
    $searchInput.on('keyup', function(){

        var value = $('#searchInput').val();

        var rows = $('#Content li');

        placeAllMovies($moviesFromStart, value);
    });

});

function getAllMovies(){

    $.ajax({
        type:'GET',
        url: 'http://192.168.1.150:3000/api/movies',
        success: (movies)=>{
            placeAllMovies(movies, "");
            $moviesFromStart = movies;
        }
    });
}




function placeAllMovies(movies, value){

    $Content.find('ul').remove();
    removeButtons();

    $Content.append('<ul  class="ContentList" id="panel1"></ul>');
    var $movielist = $('#panel1');
    addMovie($movielist, "Test");
    var $LiElement = $movielist.find('li');


    var calc = new PanelAndItemCalculator($movielist, $LiElement);


    $movielist.find('li').remove();



    var $maxElementsPerRow = calc.getMaxElementsPerRow();
    var $maxRows = calc.getMaxRows();


    var $maxElementsPerPage = $maxRows * $maxElementsPerRow;






    var o = 0;
    var panelNumber = 1;
    var $currentList = $movielist;
    addButton(1);
    $.each(movies, (i, movie)=>{


        if(ifMovieHasLetters(movie,value)){
            return;
        }

        if(o < $maxElementsPerPage){
        addMovie($currentList, movie);


        }else{
            console.log("i: " +i);
            if(i == movies.length){
                return false;
            }
            panelNumber++;
            o = 0;

            addPanel(panelNumber);
            var id = "#panel" +panelNumber;

            $currentList = $Content.find(id);


            addButton(panelNumber);
            addMovie($currentList, movie);

        }

       o++;

    });
}

class PanelAndItemCalculator{


    constructor(panel, item){
        this.$LiWidth = item.outerWidth(true);
        this.$LiHeight = item.outerHeight(true);
        this.$PanelWidth = panel.width();
        this.$PanelHeight = panel.height();

    }

    getMaxElementsPerRow(){
        var $maxElementsPerRow = Math.floor( this.$PanelWidth/this.$LiWidth);
        return $maxElementsPerRow;

    }

    getMaxRows(){
        var $maxRows = Math.floor(this.$PanelHeight/this.$LiHeight);
        return $maxRows;
    }

    getMaxElementsPerPage(){
        var $maxElementsPerPage = this.getMaxRows() * this.getMaxElementsPerRow();
        return $maxElementsPerPage;
    }

}


function ifMovieHasLetters(movie, value){
    if(!(movie.title.toLowerCase().indexOf(value) > -1)){
            return true;
        }

    return false;

}

function addPanel(panelNumber){
    $Content.append("<ul class'ContentList' id='panel"+panelNumber+"'></ul>");
}

function addMovie(list, movie){
    list.append("<li><div class='bg'><p id='title'>"+movie.title+"</p><p id='desc'>"+movie.desc+"</p><div class='container'><a href='' class='btn btn-2'>more</a></div></li>");
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
function removeButtons(){
    var $buttonContainer = $Content.find('#pageButtons');
    $buttonContainer.find("div").remove();
}

function hideAllPanels(){
    $panels = $Content.find('ul');
    $panels.hide();
}


function onResize(){
    getAllMovies();
}




/*
TODOs
Add Filters
- Sort by Name
- Sort by
*/


