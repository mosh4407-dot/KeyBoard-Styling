(() => {
  // تحديد كل العناصر model-viewer الموجودة في الصفحة
  const modelViewers = document.querySelectorAll('model-viewer');
  // تحديد كل الكروت (.card) الموجودة في الصفحة
  const cards = document.querySelectorAll('.card');

  // إعدادات الكاميرا الافتراضية لكل نموذج 3D
  const defaultOrbit = '64deg 25deg 64m'; // زاوية ودوران الكاميرا الافتراضي
  const hoverOrbit = '90deg -42deg 50m'; // زاوية ودوران الكاميرا عند المرور على الكرت
  const defaultTarget = '8m 1m 1m'; // النقطة المستهدفة (المركز) افتراضي
  const hoverTarget = '4m 1m 1m'; // النقطة المستهدفة عند المرور على الكرت

  // دالة لتطبيق إعدادات الكاميرا على عنصر model-viewer
  const applyOrbit = (modelViewer, orbit, target) => {
    modelViewer.setAttribute('camera-orbit', orbit); // تعيين زاوية الكاميرا
    modelViewer.setAttribute('camera-target', target); // تعيين نقطة التركيز
    modelViewer.setAttribute('interpolation-decay', '124'); // سرعة انتقال الكاميرا بين الإعدادات
  };

  // التكرار على كل الكروت لتطبيق الحركة على النموذج 3D الخاص بها
  cards.forEach((card, index) => {
    const modelViewer = modelViewers[index]; // ربط الكرت بالنموذج 3D المقابل له
    if (modelViewer) {
      // تطبيق الإعدادات الافتراضية عند البداية
      applyOrbit(modelViewer, defaultOrbit, defaultTarget);

      // عند المرور على الكرت (Hover)، تغيير الكاميرا إلى زاوية Hover
      card.addEventListener('mouseenter', () => applyOrbit(modelViewer, hoverOrbit, hoverTarget));

      // عند خروج الفأرة من الكرت، إعادة الكاميرا للإعداد الافتراضي
      card.addEventListener('mouseleave', () => applyOrbit(modelViewer, defaultOrbit, defaultTarget));

      // عند تحميل النموذج 3D بالكامل، إضافة كلاس 'loaded' لتطبيق تأثيرات CSS
      modelViewer.addEventListener('load', () => {
        modelViewer.classList.add('loaded');
      });
    } else {
      // إذا لم يتم العثور على نموذج 3D للكرت، يتم طباعة تحذير في الكونسول
      console.log(`No model found for card at i:${index}`);
    }
  });
})();

// دالة لتغيير ستايل النموذج 3D ديناميكياً (مثل تعديل الألوان أو التأثيرات)
function changeModelStyle(element, deg, invert = 0) {
  const card = element.closest('.card'); // البحث عن الكرت الأقرب للعنصر الذي تم النقر عليه
  const modelViewer = card.querySelector('model-viewer'); // العثور على النموذج 3D داخل الكرت
  if (modelViewer) { 
    // تغيير اللون باستخدام hue-rotate وinvert عبر CSS filter
    modelViewer.style.filter = `hue-rotate(${deg}deg) invert(${invert})`; 
  }
}