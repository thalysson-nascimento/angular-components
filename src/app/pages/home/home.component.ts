import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listProduct = [
    {
      categoria: 'multimercado',
      nome_comercial: 'Absolute Hedge Seleção Multimercado',
      risco: 'médio',
      rentabilidade: '12,02 %',
      aplicacaoMinima: 'R$ 1,00',
      taxa_administrativa: '2,50% a.a',
    },
    {
      categoria: 'multimercado',
      nome_comercial: 'Kinea Atlas Multimercado',
      risco: 'alto',
      rentabilidade: '10,92 %',
      aplicacaoMinima: 'R$ 12,00',
      taxa_administrativa: '2,00% a.a',
    },
    {
      categoria: 'multimercado',
      nome_comercial: 'Legacy Capital Seleção Multimercado',
      risco: 'baixo',
      rentabilidade: '5,98 %',
      aplicacaoMinima: 'R$ 10,00',
      taxa_administrativa: '2,63% a.a',
    },
    {
      categoria: 'multimercado',
      nome_comercial: 'Absolute Hedge Seleção Multimercado',
      risco: 'médio',
      rentabilidade: '12,02 %',
      aplicacaoMinima: 'R$ 1,00',
      taxa_administrativa: '2,50% a.a',
    },
    {
      categoria: 'multimercado',
      nome_comercial: 'Kinea Atlas Multimercado',
      risco: 'alto',
      rentabilidade: '10,92 %',
      aplicacaoMinima: 'R$ 12,00',
      taxa_administrativa: '2,00% a.a',
    },
    {
      categoria: 'multimercado',
      nome_comercial: 'Legacy Capital Seleção Multimercado',
      risco: 'baixo',
      rentabilidade: '5,98 %',
      aplicacaoMinima: 'R$ 10,00',
      taxa_administrativa: '2,63% a.a',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.listProduct;
  }
}
