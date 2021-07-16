@extends('layouts.plantillabase')

@section('contenido')
<div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">Precio Bitcoin</h5>
    <p class="card-text">Esta página muestra el precio en tiempo real del bitcoin, y una tabla de ejemplo con 5 precios del bitcoin a modo de referencia.</p>
  </div>
</div>

<div class="container">
  <div class="row align-items-center mt-3">
    <div class="col-lg-4 col-xs-12 align-self-center">
      <h3 id="crypto"></h3>
      <h5 id="cryptovar"></h5>
      <h5 id="cryptovarporcentage"></h5>
    </div>
    <div class="col-lg-8 col-xs-12">
    <div class="container mt-3">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3">
            <a class="btn btn-primary" href="/Bitcoin/bitcoinprice/public/home" role="button">Actualizar Tabla</a>
        </div>
      </div>
    </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Criptomoneda</th>
                <th scope="col">USD</th>
                <th scope="col">Fecha</th>
                </tr>
            </thead>
            <tbody id="crypto-crud">
              @foreach($cryptos as $u_info)
                <tr id="crypto_id_{{ $u_info->id }}">
                  <th scope="row">{{($loop->index)+1 }}</th>
                  <td>{{ $u_info->name }}</td>
                  <td>{{ $u_info->price  }}</td>
                  <td>{{ $u_info->updated_at }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
  </div>
</div>

<blockquote class="blockquote text-right">
  <p class="mb-0">Los datos presentes en esta página son de propiedad de coinapi.io</p>
  <footer class="blockquote-footer">Mas información en <cite title="Source Title">www.coinapi.io</cite></footer>
</blockquote>
@endsection