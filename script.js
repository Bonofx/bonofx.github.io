// script.js — minimal interactivity for CTA & form
document.addEventListener('DOMContentLoaded',function(){
  var form = document.getElementById('signup-form');
  var msg = document.getElementById('signup-msg');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    if(!email){ msg.textContent='Please enter a valid email.'; return; }
    // placeholder behaviour: store to localStorage and show thanks
    var leads = JSON.parse(localStorage.getItem('do_leads')||'[]');
    leads.push({email:email,ts:new Date().toISOString()});
    localStorage.setItem('do_leads',JSON.stringify(leads));
    msg.textContent = 'Thanks — check your inbox (placeholder). We saved your email.';
    form.reset();
  });
});
