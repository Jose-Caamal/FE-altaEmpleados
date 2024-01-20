import { Component, OnInit } from '@angular/core';
import { Cargo } from '../../interfaces/cargo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { CargoService } from '../../services/cargo.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agregar-editar-empleado',
  templateUrl: './agregar-editar-empleado.component.html',
  styleUrl: './agregar-editar-empleado.component.css'
})
export class AgregarEditarEmpleadoComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  accion: string = 'Agregar';
  cargoControl = new FormControl<Cargo | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  cargo: Cargo[] = [];

  constructor(private fb: FormBuilder,
    private _empleadoService:EmpleadoService ,
    private _cargoService: CargoService ,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {

    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(65)]],
      fechaNacimiento: ['', Validators.required],
      cargo: ['', Validators.required],
      idCargo: ['', Validators.required],
      estatus: [true]
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.accion = 'Editar';
      this.obtenerEmpleado(this.id);
    }
    this._cargoService.getCargo().subscribe(data =>{
      this.cargo = data;
    });
  }

  obtenerEmpleado(id: number){
    this.loading = true;
    this._empleadoService.getEmpleado(id).subscribe( data => {
      console.log(data);
      this.form.patchValue({
        nombreCompleto: data.nombreCompleto,
        estatus: data.estatus,
        edad: data.edad,
        fechaNacimiento: data.fechaNacimiento,
        cargo: data.cargo,
        idCargo: data.idCargo
      })
      this.loading = false;
    });
  }

  guardarEmpleado(){
    const empleado: Empleado = {
      nombreCompleto: this.form.value.nombreCompleto,
      estatus: this.form.value.estatus,
      edad: this.form.value.edad,
      fechaNacimiento: this.form.value.fechaNacimiento,
      cargo: this.form.value.cargo,
      idCargo: this.form.value.cargo.id
    }
    console.log(empleado);
    if(this.id != 0){
      empleado.id = this.id;
      this.editarEmpleado( this.id , empleado);
    } else{
      this.guardarNuevoEmpleado(empleado);
    }
  }

  editarEmpleado(id: number, empleado: Empleado){
    this.loading = true;
    this._empleadoService.updateEmpleado(id, empleado).subscribe(data =>{
      this.mensajeExito('Actualizada');
      this.router.navigate(['/listEmpleados'])
      this.loading = false;
    })
  }

  guardarNuevoEmpleado(empleado: Empleado){
    this._empleadoService.addEmpleado(empleado).subscribe(data => {
      this.mensajeExito('Registrada');
      this.router.navigate(['/listEmpleados'])
    }, error => {
      console.log(error);
    });
  }

  mensajeExito(texto: string){
    this._snackBar.open(`El empleado fue ${texto} con exito`, '',{
      duration:4000,
      horizontalPosition: 'right' ,
      verticalPosition: 'top'
    });
  }
}
