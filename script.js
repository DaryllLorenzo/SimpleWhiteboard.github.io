    // Configuración básica del canvas
    let canvas = document.getElementById('whiteboard');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Estilo básico del lápiz
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    // Variables para el dibujo
    let drawing = false;

    // Funciones básicas
    function startDraw(e) {
      drawing = true;
      ctx.beginPath();
      let pos = getPosition(e);
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!drawing) return;
      let pos = getPosition(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDraw() {
      drawing = false;
    }

    // Obtener posición (tanto para mouse como para touch)
    function getPosition(e) {
      if (e.touches && e.touches.length > 0) {
        let touch = e.touches[0];
        return { x: touch.clientX, y: touch.clientY };
      } else {
        return { x: e.clientX, y: e.clientY };
      }
    }

    // Eventos de mouse y touch
    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;
    canvas.onmouseout = stopDraw;

    canvas.ontouchstart = function(e) {
      e.preventDefault(); // Prevenir scroll
      startDraw(e);
    };
    canvas.ontouchmove = function(e) {
      e.preventDefault(); // Prevenir scroll
      draw(e);
    };
    canvas.ontouchend = stopDraw;

    // Redimensionar canvas al cambiar tamaño de ventana
    window.onresize = function() {
      resizeCanvas();
    };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Función para limpiar el canvas
    function clearCanvas() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Inicializar fondo blanco
    resizeCanvas();
