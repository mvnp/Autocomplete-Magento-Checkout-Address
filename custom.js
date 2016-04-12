/*
Copyright (c) 2009 Victor Stanciu - http://www.victorstanciu.ro

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
jQuery(function($){
    $("#billing\\:taxvat").mask("999.999.999-99");
    $("#billing\\:postcode, #estimate_postcode, #postcode").mask("99999-999");
    $("#billing\\:telephone").mask("(99) x9999-9999");
    $("#billing\\:fax").mask("(99) x9999-9999");

    //////////////////////////////////////////////////////
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#billing\\:street1").val("");
        $("#billing\\:city").val("");
        $("#billing\\:region_id").val("");
    }

    $("#billing\\:region_id option[value='485']").attr("data-sigla", "AC");
    $("#billing\\:region_id option[value='486']").attr("data-sigla", "AL");
    $("#billing\\:region_id option[value='487']").attr("data-sigla", "AP");
    $("#billing\\:region_id option[value='488']").attr("data-sigla", "AM");
    $("#billing\\:region_id option[value='489']").attr("data-sigla", "BA");
    $("#billing\\:region_id option[value='490']").attr("data-sigla", "CE");
    $("#billing\\:region_id option[value='511']").attr("data-sigla", "DF");
    $("#billing\\:region_id option[value='491']").attr("data-sigla", "ES");
    $("#billing\\:region_id option[value='492']").attr("data-sigla", "GO");
    $("#billing\\:region_id option[value='493']").attr("data-sigla", "MA");
    $("#billing\\:region_id option[value='495']").attr("data-sigla", "MS");
    $("#billing\\:region_id option[value='494']").attr("data-sigla", "MT");
    $("#billing\\:region_id option[value='496']").attr("data-sigla", "MG");
    $("#billing\\:region_id option[value='499']").attr("data-sigla", "PR");
    $("#billing\\:region_id option[value='498']").attr("data-sigla", "PB");
    $("#billing\\:region_id option[value='497']").attr("data-sigla", "PA");
    $("#billing\\:region_id option[value='500']").attr("data-sigla", "PE");
    $("#billing\\:region_id option[value='501']").attr("data-sigla", "PI");    
    $("#billing\\:region_id option[value='502']").attr("data-sigla", "RJ");
    $("#billing\\:region_id option[value='503']").attr("data-sigla", "RN");
    $("#billing\\:region_id option[value='504']").attr("data-sigla", "RS");  
    $("#billing\\:region_id option[value='505']").attr("data-sigla", "RO");        
    $("#billing\\:region_id option[value='506']").attr("data-sigla", "RR");
    $("#billing\\:region_id option[value='507']").attr("data-sigla", "SC");
    $("#billing\\:region_id option[value='509']").attr("data-sigla", "SE");
    $("#billing\\:region_id option[value='508']").attr("data-sigla", "SP");
    $("#billing\\:region_id option[value='510']").attr("data-sigla", "TO"); 

    //Quando o campo cep perde o foco.
    $("#billing\\:postcode").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#billing\\:street1").val("...")
                $("#billing\\:city").val("...")
                $("#billing\\:region_id").val("...")

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#billing\\:street1").val(dados.logradouro);
                        $("#billing\\:city").val(dados.localidade);
                        $('#billing\\:region_id option').each(function() {
                            $(this).attr('selected', this.dataset.sigla == dados.uf);
                        });

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
    //////////////////////////////////////////////////////
});