import { supabase } from './supabase.js';

window.login = async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.setItem('access_token', data.session.access_token);
  localStorage.setItem('user_id', data.user.id);

  window.location.href = '/index.html';
};

window.register = async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert('Conta criada! Faça login.');
};
