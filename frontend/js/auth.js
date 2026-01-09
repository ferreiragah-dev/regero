async function login(email, password) {
  const { data, error } =
    await window.supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    alert(error.message);
    return;
  }

  // salva sessão
  localStorage.setItem("access_token", data.session.access_token);
  localStorage.setItem("user_id", data.user.id);

  window.location.href = "/index.html";
}

async function register(email, password) {
  const { error } =
    await window.supabaseClient.auth.signUp({
      email,
      password
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Conta criada! Faça login.");
}
