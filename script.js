 const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');
    const pencilBtn = document.getElementById('pencil');
    const eraserBtn = document.getElementById('eraser');
    const clearBtn = document.getElementById('clear');

    // Configuración inicial
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Ajustar tamaño del canvas al inicio
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;

    // Fondo inicial blanco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    function getTouchPos(e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function startDrawing(e) {
      e.preventDefault();
      isDrawing = true;
      const pos = e.touches ? getTouchPos(e) : { x: e.offsetX, y: e.offsetY };
      [lastX, lastY] = [pos.x, pos.y];
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = e.touches ? getTouchPos(e) : { x: e.offsetX, y: e.offsetY };
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      [lastX, lastY] = [pos.x, pos.y];
    }

    function stopDrawing(e) {
      e.preventDefault();
      isDrawing = false;
      ctx.beginPath();
    }

    pencilBtn.addEventListener('click', () => {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
    });

    eraserBtn.addEventListener('click', () => {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;
    });

    clearBtn.addEventListener('click', () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Eventos de mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Eventos táctiles
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);