var correoExistente;

// MODULOS LOGIN
$("#btnLogin").click(function(e) {
  
   
   var datos= $("#emailLogin, #passLogin");
   var sipaso;
   var existemail;
   sipaso=true;
    
   $(datos).each(function(indice,elemento) {
       if (($(elemento).val()==='') && (sipaso)) {
           if (elemento.name === 'emailLogin') {
            sipaso=false; 
            mensajeError('#labelEmail','Correo Obligatorio',380);
           }
           else if(sipaso) {
            sipaso=false;    
            mensajeError('#labelPass','Contraseña Obligatorio',380);       
           }
        }
   });
   
   if (sipaso){
       existemail=correoExiste("emailLogin",0);
       if (existemail){
       
       //alert('todo ok');
   }else{
       mensajeError("#labelEmail","El correo no existe",380);
       e.preventDefault();
        
   }
   }
   
  });

$("#emailLogin").change(function(){
    var resp=correoExiste("emailLogin",0);
   
    if (!resp) {
        mensajeError("#labelEmail","El correo no existe",380);
    }
});


//MODULOS DE MESA DE SERVICIO

function cargaServicios() {
    
    $.ajax({ 
    type:'POST',
    data:{'peticion':'cargar_listas'},
    url:"vistas/modulos/ajax.php",
    success:function(listas_rep){
    
    $("#servs").html(listas_rep);    
        
    }
    });
    
};


$("#btnEnviarServicio").click(function(e) { 
   var datos=$(".ctrlsServicios");
   var sipaso;
   var mensaje;
   sipaso=true;
   
   $(datos).each(function(indice,elemento) {
       var valor=$(elemento).val(); 
       
       
       if ((valor==='') && (sipaso)) {
           
           sipaso=false;
           switch (elemento.name){
           case "matriculaMesa":
               mensaje='Matricula obligatoria';
               break;
           case "rematriculaMesa":
               mensaje='Matricula obligatorio';
               break;
          
           }
           mensajeError('#lb'+ elemento.name,mensaje,200); 
        }
    });
        if ((sipaso) && (checapass("#matriculaMesa, #rematriculaMesa"))) {
            //alert('Todo OK');
        }else{
            e.preventDefault();
        }
});

$("#rematriculaMesa").change(function (){

   checapass("#matriculaMesa, #rematriculaMesa"); 

});

// ******* MODULOS DE REGISTRO 
//********

$("#btnRegistro").click(function(e) {
  
  
   var datos= $(".inputreg");
   var sipaso;
   var mensaje;
   sipaso=true;
   
   $(datos).each(function(indice,elemento) {
       var valor=$(elemento).val(); 
       
       
       if ((valor==='') && (sipaso)) {
           
           sipaso=false;
           switch (elemento.name){
           case "correoReg":
               mensaje='Correo obligatorio';
               break;
           case "nombreReg":
               mensaje='Nombre obligatorio';
               break;
           case "ape1Reg":
               mensaje='Apellido paterno obligatorio';
               break;
           case "ape2Reg":
               mensaje='Apellido materno obligatorio';
               break;
               
           case "pass1Reg":
               mensaje='contraseña obligatoria';
               break;
           case "pass2Reg":
               mensaje='contraseña obligatoria';
               break;
           
           }
           mensajeError('#lb'+ elemento.name,mensaje,200); 
        }
   });
   
    if ((sipaso) && (checapass("#pass2Reg, #pass1Reg"))) {
       
      resp=correoExiste("correoReg",200);
        
      if (resp){
          e.preventDefault();  
       }
                        
                               
   
    }
       
  });
  
 $("#correoReg").change(function() {
    correoExiste("correoReg",200);
    
  });
  
  

//*** MODULOS UNIVERSALES
function SetExiste(x){
    correoExistente=x;
}


function correoExiste(correo,margen){
    var email= $("#" +correo).val();
    var datos= new FormData();
   
    
    datos.append("validarCorreo",email);
    
    $.ajax({
        url:"vistas/modulos/ajax.php",
        method:"POST",
        data:datos,
        cache:false,
        contentType:false,
        processData:false,
         async: false,
        success:function(respuesta){
           
        if (respuesta !== ";0"){    
            if (margen!==0){
             mensajeError("#lb"+correo,"El correo ya existe",margen);
            }
            SetExiste(true);
            
        }
        else {
            
            
            SetExiste(false);  }
         
        }
        
    });  
    
   return correoExistente;

}

function checapass(inputs){
   var pass=$(inputs);
   var flag;
   flag=true;
   if ($(pass).eq(0).val() !== $(pass).eq(1).val() ){
       mensajeError('#lb'+ pass.get(1).name,'las constraseñas no son iguales',200);
       flag=false;
       pass.get(0).focus();
   }
   
   return flag;
    
};

function mensajeError(elemento,mensaje,margen){
    $('<p class="tooltip"></p>')
    .text(mensaje)
    .appendTo(elemento)
    .css('margen-left',margen)
    .fadeIn('slow');

    setTimeout(function() { 
     
          //$('p').fadeOut(5000);
          $('p').remove();
    }, 2000);   
};

