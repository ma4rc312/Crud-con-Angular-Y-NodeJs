import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  buttonEnv = 'CREAR'
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute ) {
      
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id'); //obtener el id
}

ngOnInit(): void {
  this.esEditar();
}

  agregarProducto() {
    // console.log(this.productoForm.get('producto')?.value); //acceder lo q el usuario a colocado
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

   if(this.id !== null) {
    //edita el producto

    this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
      this.toastr.info('El producto fue actualizado con exito!', 'Producto actualizado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })

   } else {
    //agregamos el producto

    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })
   }

  }

  esEditar() {

    if(this.id !== null ) {
      this.titulo = 'Editar Producto';
      this.buttonEnv = 'Editar';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,

        })
      })
    }
  }
}
