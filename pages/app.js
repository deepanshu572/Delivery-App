
    // ---- shared helpers used across every page ----
function getParam(name, fallback){
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || fallback;
}

function pillHTML(mode){
  return mode === 'cod'
    ? '<span class="pill pill-cod">\uD83D\uDCB5 Cash On Delivery (COD)</span>'
    : '<span class="pill pill-online">\u2705 Online Paid</span>';
}

function withMode(url, mode, extra){
  extra = extra || '';
  return url + '?mode=' + encodeURIComponent(mode) + extra;
}

function statusBarNow(){
  // purely cosmetic, keeps 9:41 like the original screenshots
  return '9:41';
}

function otpBoxesBehavior(){
  const boxes = document.querySelectorAll('.otp-boxes input');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9]/g,'').slice(0,1);
      if(box.value && boxes[i+1]) boxes[i+1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if(e.key === 'Backspace' && !box.value && boxes[i-1]) boxes[i-1].focus();
    });
  });
}

// ---- slide-to-confirm control ----
function initSlideConfirm(el){
  const handle = el.querySelector('.slide-confirm-handle');
  const label = el.querySelector('.slide-confirm-label');
  if(!handle) return;

  let dragging = false;
  let startClientX = 0;
  let startLeft = 0;
  let currentX = 0;

  function maxX(){
    return el.clientWidth - handle.offsetWidth - 8; // 8 = container padding (4px each side)
  }

  function place(x){
    const max = Math.max(maxX(), 0);
    currentX = Math.min(Math.max(x, 0), max);
    handle.style.transform = 'translateX(' + currentX + 'px)';
    if(label){
      const progress = max > 0 ? currentX / max : 0;
      label.style.opacity = String(1 - progress * 0.85);
    }
    return max;
  }

  function onPointerDown(e){
    if(el.classList.contains('disabled') || el.classList.contains('completed')) return;
    dragging = true;
    startClientX = e.clientX;
    startLeft = currentX;
    el.classList.add('dragging');
    handle.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e){
    if(!dragging) return;
    place(startLeft + (e.clientX - startClientX));
  }

  function onPointerUp(e){
    if(!dragging) return;
    dragging = false;
    el.classList.remove('dragging');
    const max = place(currentX);
    if(max <= 0 || currentX >= max * 0.78){
      place(max);
      el.classList.add('completed', 'disabled');
      const target = el.getAttribute('data-target');
      const onComplete = el.getAttribute('data-oncomplete');
      setTimeout(() => {
        if(onComplete && typeof window[onComplete] === 'function'){
          window[onComplete](el);
        } else if(target){
          window.location.href = target;
        }
      }, 200);
    } else {
      place(0);
    }
  }

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', () => place(currentX));
}

function chevronSVG(){
  return '<svg viewBox="0 0 24 24" fill="none" class="chev"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function setupSlideConfirms(){
  document.querySelectorAll('.slide-confirm').forEach(el => {
    const handle = el.querySelector('.slide-confirm-handle');
    if(handle && !handle.innerHTML.trim()) handle.innerHTML = chevronSVG();
    initSlideConfirm(el);
  });
}

document.addEventListener('DOMContentLoaded', setupSlideConfirms);
