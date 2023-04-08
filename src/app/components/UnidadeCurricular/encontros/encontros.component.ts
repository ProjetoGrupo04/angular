import { BadgeService } from './../../../services/badge.service';
import { PlanejamentoUcService } from './../../../services/planejamento-uc.service';
import { BibliografiaService } from './../../../services/bibliografia.service';
import { GrupoService } from './../../../services/grupo.service';
import { CompetenciaService } from './../../../services/competencia.service';
import { UnidadeCurricularService } from './../../../services/unidade-curricular.service';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaIndicador } from 'src/app/models/CompetenciaIndicador';
import { CompetenciaIndicadorService } from 'src/app/services/competencia-indicador.service';
import { Grupo } from 'src/app/models/Grupo';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Badge } from 'src/app/models/Badge';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-encontros',
  templateUrl: './encontros.component.html',
  styleUrls: ['./encontros.component.css'],
})
export class EncontrosComponent implements OnInit {
  nodes: TreeNode[];
  files: TreeNode[];

  idUsuarioLogado: string;
  grupoId: number;
  loading: boolean = true;

  encontros: Encontro[];

  leftNavDisabled = false;
  rightNavDisabled = false;

  grupo: Grupo = new Grupo();
  unidadeCurricular: UnidadeCurricular = new UnidadeCurricular();
  competencias: Competencia[] = [];
  competenciaIndicadores: CompetenciaIndicador[] = [];
  bibliografias: Bibliografia[] = [];
  planejamentoUC: PlanejamentoUC = new PlanejamentoUC();
  badges: Badge[] = [];

  statusAtividades: number = 5;

  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    private route: ActivatedRoute,
    private encontroService: EncontroService,
    private grupoService: GrupoService,
    private unidadeCurricularService: UnidadeCurricularService,
    private competenciaService: CompetenciaService,
    private competenciaIndicadorService: CompetenciaIndicadorService,
    private bibliografiaService: BibliografiaService,
    private planejamentoUcService: PlanejamentoUcService,
    private badgeService: BadgeService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.files = [
      {
        key: '0',
        label: 'Competência I',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-star',
        children: [
          {
            key: '0-0',
            label: 'Indicador I',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-folder',
            children: [
              { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
              { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
          },
          {
            key: '0-1',
            label: 'Indicador II',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-folder',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
          }
        ]
      },

      {
        key: '1',
        label: 'Competência II',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-star',
        children: [
          {
            key: '0-0',
            label: 'Indicador I',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-folder',
            children: [
              { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
              { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
          },
          {
            key: '0-1',
            label: 'Indicador II',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-folder',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
          }
        ]
      },

      {
        key: '2',
        label: 'Competência III',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-star',
        children: [
          {
            key: '0-0',
            label: 'Indicador I',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-folder',
            children: [
              { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
              { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
          },
          {
            key: '0-1',
            label: 'Indicador II',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-folder',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
          },
          {
            key: '0-1',
            label: 'Indicador III',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-folder',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
          }
        ]
      },
      
    ]

    this.nodes = [
      {
        key: '0',
        label: 'Introduction',
        children: [
          { key: '0-0', label: 'What is Angular', data: 'https://angular.io', type: 'url' },
          { key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url' },
          { key: '0-2', label: 'Learn and Explore', data: 'https://angular.io/guide/architecture', type: 'url' },
          { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' }
        ]
      },
      {
        key: '1',
        label: 'Components In-Depth',
        children: [
          { key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url' },
          { key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url' },
          { key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url' },
          { key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url' }
        ]
      }
    ];

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    //this.grupoId = this.route.snapshot.params['id'];
    this.grupoId = 7;
    this.ObterEncontros();
    //this.ds.moveTo(8);
    this.ObterDetalhesUC();
  }

  ObterEncontros = () => {
    this.encontroService.ObterEncontroPorGrupoId(this.grupoId, this.idUsuarioLogado).subscribe(resultado => {
      this.encontros = resultado;
      this.loading = false;
    });
  };

  ObterDetalhesUC = () => {
    this.grupoService.ObterGrupoPeloId(this.grupoId).subscribe(resultado => {
      this.grupo = resultado;

      this.unidadeCurricularService.ObterUnidadeCurricularPeloId(this.grupo.unidadeCurricularId).subscribe(
        (uc: UnidadeCurricular) => {
          this.unidadeCurricular = uc;
        },
      );

      this.competenciaService.filterByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
        (competencias: Competencia[]) => {
          this.competencias = competencias;
        }
      );

      this.competenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
        (competenciaIndicadores: CompetenciaIndicador[]) => {
          this.competenciaIndicadores = competenciaIndicadores;
        }
      );

      this.bibliografiaService.FiltrarbibliografiaByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
        (bibliografias: Bibliografia[]) => {
          this.bibliografias = bibliografias;
        }
      );

      this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupo.id).subscribe(
        (planejamentoUC: PlanejamentoUC) => {
          this.planejamentoUC = planejamentoUC;
        }
      );

      this.badgeService.ObterBadgesPeloGrupoId(this.grupo.id).subscribe(
        (badge: Badge[]) => {
          this.badges = badge;
          console.log(badge)
        }
      );

      this.loading = false;
    });
  }


  //Comandos do scroll de encontros
  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  moveTo(index: number) {
    this.ds.moveTo(index);
  }

}