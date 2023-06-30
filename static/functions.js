$(document).ready(function() {

    $('tbody#tb_escolhas tr').click(function () {
        var tr = $(this).closest('tr').hide().clone();
        if ($('div#player1').html() == '') {
            $('div#player1').html(tr.find('td.nome').text());
            $('input#nome1').attr('value', tr.find('td.nome').text())
            $('input#rating1').attr('value', tr.find('td.rating').text())
        }

        else if ($('div#player2').html() == '') {
            $('div#player2').html(tr.find('td.nome').text());
            $('input#nome2').attr('value', tr.find('td.nome').text())
            $('input#rating2').attr('value', tr.find('td.rating').text())
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
        var delta = calcRating($('input#rating1').attr('value'),$('input#rating2').attr('value'));
        message = $('input#nome1').attr('value')+' ganhou '+delta+' e '+$('input#nome2').attr('value')+' perdeu '+delta;
        $('#cb1').hide();
        $('#cb2').hide();
        $('#enter').show();

        if(confirm(message)) {
            $.post( "/post_results", {
                'vencedor': $('input#nome1').attr('value'),
                'perdedor': $('input#nome2').attr('value'),
                'delta': delta
            },
                function (response) { window.location = "/"; }
            );
        }

    });

    $('#cb2').click(function () {
        var delta = calcRating($('input#rating2').attr('value'),$('input#rating1').attr('value'));
        message = $('input#nome2').attr('value')+' ganhou '+delta+' e '+$('input#nome1').attr('value')+' perdeu '+delta;
        $('#cb1').hide();
        $('#cb2').hide();
        $('#enter').show();

        if(confirm(message)) {
            $.post( "/post_results", {
                'vencedor': $('input#nome2').attr('value'),
                'perdedor': $('input#nome1').attr('value'),
                'delta': delta
            },
                function (response) { window.location = "/"; }
            );
        }
    });

});

function calcRating (r_vencedor, r_perdedor) {
    var rt = Number(r_vencedor) + Number(r_perdedor);
    var d = Number(r_perdedor)/rt;

    return Math.round(20*d);
}