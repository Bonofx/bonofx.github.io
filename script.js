// script.js — minimal interactivity for CTA & form
document.addEventListener('DOMContentLoaded',function(){
  var form = document.getElementById('signup-form');
  var msg = document.getElementById('signup-msg');
  var payment = document.querySelector('.payment-instructions');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    if(!email){ msg.textContent='Please enter a valid email.'; return; }
    // placeholder behaviour: store to localStorage and show thanks
    var leads = JSON.parse(localStorage.getItem('do_leads')||'[]');
    leads.push({email:email,ts:new Date().toISOString()});
    localStorage.setItem('do_leads',JSON.stringify(leads));
    msg.innerHTML = 'Thanks — check your inbox (placeholder). We saved your email.' +
      '<br><strong>To pay Pro by EFT:</strong> Account number <strong>1309243832</strong>. WhatsApp <strong>065 391 8848</strong> with your name and this email to activate Pro access.';
    form.reset();
    // scroll to payment instructions
    if(payment) payment.scrollIntoView({behavior:'smooth'});
  });
});
