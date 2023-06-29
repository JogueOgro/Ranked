$(document).ready(function() {

    $('tbody#tb_escolhas tr').click(function () {
        var tr = $(this).closest('tr').hide().clone();
        if ($('div#player1').html() == '') $('div#player1').html(tr.find('td.nome').text());
        else if ($('div#player2').html() == '') {
            $('div#player2').html(tr.find('td.nome').text());
            $('button#enter').show();
        }
        else alert('Ambos os jogadores já foram selecionados. Finalize o desafio antes de iniciar um novo!');
    });

    $('#enter').click(function () {
        $('#cb1').show();
        $('#cb2').show();
        $('#enter').hide();
    });

    $('#cb1').hover(function () {
            $(this).css("background-color","#6EA743");
            $('#cb2').css("background-color","red");
            $(this).html("V");
            $('#cb2').html("D");
        }, function () {
            $(this).css("background-color","#337ab7");
            $('#cb2').css("background-color","#337ab7");
            $(this).html("X");
            $('#cb2').html("X");
        }
    );

            $('#cb2').hover(function () {
            $(this).css("background-color","#6EA743");
            $('#cb1').css("background-color","red");
            $(this).html("V");
            $('#cb1').html("D");
        }, function () {
            $(this).css("background-color","#337ab7");
            $('#cb1').css("background-color","#337ab7");
            $(this).html("X");
            $('#cb1').html("X");
        }
    );

    $('#cb1').click(function () {
        alert('aa');
    });

    $('#cb2').click(function () {
        alert('aa');
    });


});
