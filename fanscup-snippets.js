$().ready(function(){

	//jqTabs alterna el contenido de las pestañas que tengan la clase jqTabs
	$(".jqTabsRight").hide();
	$(".jqTabsContent").hide();
	$(".jqTabs").each(function() {
		// Para cada bloque de tabs miro si hay algún tab .active y muestro su contenido
		if ($(this).find("li").hasClass("active")) {
			var idx = $(this).find("li.active").index();
			$(this).parent().find(".jqTabsContent").eq(idx).show();
			$(this).parent().find(".jqTabsRight").eq(idx).show();
		}
		else {
			// Si no hay ningún tab .active, activo el primero
			$(this).find("li:first").addClass("active").show();
			$(this).parent().find(".jqTabsRight:first").show();
			$(this).parent().find(".jqTabsContent:first").show();
		}
	});
	$(".jqTabs li").live('click',function(event) {
		event.preventDefault();
		if (!$(this).hasClass("buttons")) {
			$(this).parent().find("li").removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().find(".jqTabsRight").hide();
			$(this).parent().parent().find(".jqTabsContent").hide();
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn();
		}
		return false;
	});

	//jqLinkPrev añade el símbolo « al final del enlace 
	$(".jqLinkPrev").prepend("« ");

	//jqLinkNext añade el símbolo » al final del enlace 
	$(".jqLinkNext").append(" »");


	// jqHide añade una X que cierra el elemento
	$(".jqHide").prepend('<a class="ui-silk ui-silk-close jqHideButton" href="" rel="nofollow"></a>');
	$(".jqHideButton").live('click',function(e) { e.preventDefault(); $(this).parent().fadeToggle(); });
	$(".jqToggle").live('click',function(e) {
		e.preventDefault();
		if($(this).parent().find('.jqToggleContent').length) 
			$(this).parent().find('.jqToggleContent').fadeToggle();
		else
			$(this).fadeToggle();
	});


	// jqColorbox al clicar abre un colorbox con el contenido del href
	// jqColorboxNoclose además no permite cerrarlo -> se debe cerrar con $.colorbox.close()
	if(jQuery.colorbox) {
		$(".jqColorbox").colorbox({
			initialWidth:10,
			initialHeight:10
		});
		$(".jqColorboxNoClose").colorbox({
			initialWidth:10,
			initialHeight:10,
			escKey:false, 
			overlayClose:false,
			onLoad: function() { 
				$('#cboxClose').remove(); 
				$('#cboxTitle').remove();
			}
		}); 
	}

	//--------- formularios ---------------------
	
	// jSuggest hace el autocompletar del buscador
	$('#ya').jSuggest({
		url: '/sections/wizard/ajax.Suggestion.php',
		loadingImg: '/media/img/recursos/ajax-loader.gif',
		loadingText: 'Cargando...',
		minchar: 2,
		delay: 1500,
		type: "POST",
		data: "",
		autoChange: false
	});
	$('.autocomp-list').live( 'click', function () {
		slug = $(this).data('slug');
		id = $(this).data('id');
		nombre = $(this).data('nombre');
		$('#ya').val(nombre);
		$('#id-equipo').val(id);
		$('#url-site').val('http://'+slug+'.incondicionales.com');
	});
	//cuando cambie se vuelve a poner cero
	$('#ya').focus( function () {
		$('#ya').val('');
		$('#id-equipo').val('');
		$('#url-site').val('');
	});
	
	/* TO DO:
	 * Hacer el ColoPicker en una sola función. El problema está en rescatar el this dentro del onChange,
	 * ya que el this que obtiene es el del div que se abre por encima, y no el del div que hace de botón
	 */
	// colorSelector crea el Color Picker. Lo customizamos.
	$('#colorSelector1').ColorPicker(
		{
		color: '#ffffff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector1').css('backgroundColor', '#' + hex);
			$('#colorSelector1input').val(hex);
		}
	});
	$('#colorSelector2').ColorPicker(
		{
		color: '#ff0000',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector2').css('backgroundColor', '#' + hex);
			$('#colorSelector2input').val(hex);
		}
	});
	$('#colorSelector3').ColorPicker(
		{
		color: '#fff000',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector3').css('backgroundColor', '#' + hex);
			$('#colorSelector3input').val(hex);
		}
	});

	//hay que poblar selects de fecha
	dia = $('#fechanacimdia');
	mes = $('#fechanacimmes');
	ano = $('#fechanacimano');
	dia.append('<option>Día</option>');
	for(i=1;i<=31;i++) {
		dia.append('<option value="'+i+'">'+i+'</option>');
	}
	meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
	mes.append('<option>Mes</option>');
	for(i=1;i<=12;i++) {
		mes.append('<option value="'+i+'">'+meses[i-1]+'</option>');
	}
	d = new Date();
	year = d.getFullYear();
	maxage = 100;
	minage = 16;
	ano.append('<option>Año</option>');
	for(i=year-minage;i>=year-maxage;i--) {
		ano.append('<option value="'+i+'">'+i+'</option>');
	}


	//--------- validate ------------------------
	$.validator.addMethod('regexp', function(value, element, param) {
	        return this.optional(element) || value.match(param);
	});
	//funcion auxiliar para validar fecha de nacimiento correcta
	jQuery.validator.addMethod("validdate", function(value, element) {
		var month = +$('#fechanacimmes').val() - 1; // Convert to numbers with "+" prefix
		var day = +$('#fechanacimdia').val();
		var year = +$('#fechanacimano').val();
		var date = new Date(year, month, day); // Use the proper constructor
		return date.getFullYear() == year && date.getMonth() == month && date.getDate() == day;
	});
	$.validator.addMethod('filesize', function(value, element, param) {
		// param = tamaño (en bytes)
		// element = elemento a validar
		// value = valor del elemento a validar
		//alert("valor: "+value+"\nelement: "+element+"\ntamaño: "+element.files[0].size);
		var size = 0;
		if( !supportFileAPI() ) {
			// No soporta File API (html5)
			if($.browser.msie){
				try {
					// sacado de http://goo.gl/KIbEI
					var myFSO = new ActiveXObject("Scripting.FileSystemObject");
					var filepath = document.altacreatuclub.escudo.value;
					var thefile = myFSO.getFile(filepath);
					size = thefile.size;	
				} catch (err) {
					//alert('Ha habido un error: '+err.description);
				}
			}
		} else {
			 size = element.files[0].size; // JS File API, IE no lo soporta
		}
		return this.optional(element) || (size <= param);
	});
	// funcion auxiliar para filesize
	function supportFileAPI() {
	    return $("<input type='file'>")    // create test element
	                 .get(0)               // get native element
	                 .files !== undefined; // check whether files property is not undefined
	}
	/*
	//funcion auxiliar para ver funcionamiento de type="file" con File API
	$('#escudo').change( function() {
		alert(this.files[0].size);
		alert($('#escudo')[0].files[0].size);
		alert($('#escudo')[0].size);
	});
	*/
    
	$('#altacreatuclub').validate({
		rules: {
			idEquipo: "required",
			escudo: { required: true, accept: "png|jpe?g|gif", filesize: 1048576  }, 
			perfil: "required",
			nombre: "required",
			apellidos: "required",
			movil: { required:true, regexp: /^9|6\d{8}$/ },
			email: { required:true, email:true },
			fechanacimdia: { required: true },
			fechanacimmes: { required: true },
			fechanacimano: { required: true, validdate: true },
			sexo: "required",
			condiciones: "required"
		},
		groups: {
			fechanacim: "fechanacimdia fechanacimmes fechanacimano"
		},
		messages: {
			idEquipo: "Por favor introduce un equipo existente.",
			escudo: "Archivo incorrecto.",
			perfil: "Por favor escoge un perfil.",
			nombre: "Por favor introduce tu nombre.",
			apellidos: "Por favor introduce tus apellidos.",
			movil: "Por favor introduce un número de móvil correcto.",
			email: "Por favor introduce un correo electrónico correcto.",
			fechanacimdia: "Fecha de nacimiento no es válida.",
			fechanacimmes: "Fecha de nacimiento no es válida.",
			fechanacimano: "Fecha de nacimiento no es válida.",
			sexo: "Por favor escoge sexo.",
			condiciones: "Debes aceptar las condiciones."
		}
	});
});