import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Empleado } from '../../interfaces/empleado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from '../../services/empleado.service';
import { trace } from 'console';


@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrl: './listado-empleado.component.css'
})


export class ListadoEmpleadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id' , 'nombreCompleto',  'edad' ,'fechaNacimiento' , 'cargo' , 'estatus', 'acciones' ];
  dataSource = new MatTableDataSource<Empleado>();
  loading: boolean = false;

  @ViewChild('edadInput', { static: false }) edadInput: ElementRef | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _empleadoService:EmpleadoService) {}
  ngOnInit(): void {
    this.obtenerEmpleados();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items por pagina'
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  obtenerEmpleados(){
    this.loading = true
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.loading = false
      this.dataSource.data = data;
    });
  }

  eliminarEmpleado(id: number){
    this.loading = true;
    this._empleadoService.deleteEmpleado(id).subscribe( () => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerEmpleados();
    });
  }

  cambiarEstatus(id:number , nuevoEstatus: boolean){
    this._empleadoService.cambiarEstatusEmpleado(id , nuevoEstatus).subscribe( () => {
      console.log('Estatus actualizado con éxito');
      this.obtenerEmpleados();
    });
  }



  iniciarEdicionEdad(element: any): void {
    // Guarda la edad actual antes de editar
    element.nuevaEdad = element.edad;
    element.editandoEdad = true;
  }



  confirmarEdicionEdad(id: number ,element: any): void {
    console.log(element);
    // Puedes agregar lógica adicional aquí, como enviar la nueva edad al servidor
    element.edad = element.nuevaEdad;
    element.editandoEdad = false;
    this._empleadoService.updateEmpleado(id, element).subscribe(data =>{
      console.log(data);
    })
    console.log(element.edad);
  }

  cancelarEdicionEdad(element: any): void {
    // Restaura la edad original y cancela la edición
    element.editandoEdad = false;
  }

  mensajeExito(){
    this._snackBar.open('Se elimino el empleado', '',{
      duration:4000,
      horizontalPosition: 'right' ,
      verticalPosition: 'top'
    });
  }
}
