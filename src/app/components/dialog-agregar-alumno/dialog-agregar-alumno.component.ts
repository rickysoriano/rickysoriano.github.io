import { CDK_TREE_NODE_OUTLET_NODE } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Alumno } from 'src/app/interfaces/alumno.interface';
import { AlumnoServiceService } from 'src/app/services/alumno-service.service';
import { QRCodeComponent } from 'ngx-qrcode2';

import { NgxQRCodeModule, QrcodeComponent } from 'ngx-qrcode2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialog-agregar-alumno',
  templateUrl: './dialog-agregar-alumno.component.html',
  styleUrls: ['./dialog-agregar-alumno.component.css']
})
export class DialogAgregarAlumnoComponent implements OnInit {

  formTutor = this.formBuilder.group({
    nombre_tutor: ['', Validators.required],
    apellido_paterno_tutor: ['', Validators.required],
    apellido_materno_tutor: ['', Validators.required],
    telefono_tutor: ['', Validators.required],
  })

  formAlumno = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    tipo_pago: ['', Validators.required],
    pago_mensual: ['', Validators.required],
    descuento : [0],
    fecha_pago: ['', Validators.required],
    tipo_alumno: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    turno: ['', Validators.required],
    ciclo_escolar: ['', Validators.required],
    proxima_fecha_pago: ['', Validators.required],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private alumnoService : AlumnoServiceService
  ) { }

  textoParaQR: string = ''

  ngOnInit() {

  }

  guardarAlumno() {

  }

  saveTutor() {
    console.log(this.formTutor.value)
  }

  saveAlumno() {
    console.log(this.formAlumno.value)

    let id = "1"
    let nombre = id + '\n' + this.formAlumno.get('nombre')?.value + ' ' + this.formAlumno.get('apellido_paterno')?.value + ' ' + this.formAlumno.get('apellido_materno')?.value

    console.log(nombre)
  }


  @ViewChild('qrCode') qrCode!: QrcodeComponent;
  selectedImage: HTMLImageElement | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = new Image();
        this.selectedImage.src = e.target.result;
        this.selectedImage.onload = () => {
          // Ahora que la imagen está cargada, puedes generar el PDF
        };
      };
      reader.readAsDataURL(file);
    }
  }


  getQR(){
    let id = "1"
    let nombre = id+'\n'+this.formAlumno.get('nombre')?.value +' '+this.formAlumno.get('apellido_paterno')?.value+' '+this.formAlumno.get('apellido_materno')?.value +'\n'+'BU_M5'

    console.log(nombre)
    this.textoParaQR = nombre


    const img = this.qrImage?.nativeElement
    img.src = NgxQRCodeModule.toDataURL(textoParaQR)



   



  }


  generarPDF() {
    const pdf = new jsPDF();
  
    // Use html2canvas to convert the QR code element to an image
    html2canvas(this.qrCode.qrcElement.nativeElement).then((canvas) => {
      const qrCodeImage = canvas.toDataURL('image/png');
  
      pdf.text('FICHA DE DATOS', 90, 10);
      pdf.addImage(qrCodeImage, 'PNG', 60, 20, 400, 100);
      //pdf.save('ficha.pdf');

      if (this.selectedImage) {
        const xPos = 10; // Posición X de la imagen en el PDF
        const yPos = 80; // Posición Y de la imagen en el PDF
        const imgWidth = 50; // Ancho de la imagen en el PDF
        const imgHeight = 50; // Altura de la imagen en el PDF
  
        pdf.addImage(this.selectedImage, 'JPEG', xPos, yPos, imgWidth, imgHeight);
      }


       // Obtener el contenido del PDF como una cadena de datos
       pdf.output('dataurlnewwindow');

       
  





    });
  }



}
