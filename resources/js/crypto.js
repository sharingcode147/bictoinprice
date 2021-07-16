$(window).on('load', function() {
  var request = function () {
      jQuery.ajax({
          type: 'GET',
          url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=13D92790-289D-4A37-90FD-2BF6851C1F6A",
          success: function (data) {
              postValueInDatabase(data);
          }
      })
  };

  function postValueInDatabase(dataFromFirstAjax) {
      $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });

      jQuery.ajax({
      type:'POST',
      url:"/Bitcoin/bitcoinprice/public/home",
      data: {
            price:parseFloat(dataFromFirstAjax.rate),
            name:dataFromFirstAjax.asset_id_base,
            symbol:dataFromFirstAjax.asset_id_base,
            money:dataFromFirstAjax.asset_id_quote
      },
      success: function (data) {
              getVariationPorcentage(dataFromFirstAjax.rate);
          }
      })
    };

    function getVariationPorcentage (currenvalue) {
      jQuery.ajax({
          type: 'GET',
          url: '/Bitcoin/bitcoinprice/public/cryptovar',
          dataType: 'json',
          success: function (data) {
            if (data === undefined){
              var variation = 0
            }
            else {
              var old_price = data.cryptovar.price
              var variation = (currenvalue-old_price)/old_price
            }
            if (variation<0)
            {
              $('#crypto').text(currenvalue);
              $('#cryptovar').text('¡El precio ha bajado!');
              $('#cryptovar').append('<i class="bi bi-arrow-down"></i>').css({color: "green"});
              $('#cryptovarporcentage').text(variation+'%');
            }
            else if(variation==0){
              $('#crypto').text(currenvalue);
              $('#cryptovar').text('¡Precio sin variación!').css({color: "black"});
              $('#cryptovarporcentage').text('');
            }
            else{
              $('#crypto').text(currenvalue);
              $('#cryptovar').text('¡El precio ha subido!');
              $('#cryptovar').append('<i class="bi bi-arrow-up"></i>').css({color: "red"});
              $('#cryptovarporcentage').text(variation+'%');
            }
          },
          error: function(data){
            var errors = data.responseJSON;
            console.log(errors);
          }
      })
    };
  request();
  setInterval(request, 10000);

});


