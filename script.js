// Konfigurasi Admin (Tetap sama)
const ADMIN_CONF = { user: "NafisKerenOK", pass: "N4F1$_K3R3N_0K" };

const loginForm = document.getElementById('loginForm');
const msg = document.getElementById('msg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (u === ADMIN_CONF.user && p === ADMIN_CONF.pass) {
        showAdmin();
    } else {
        saveMember(u, p);
        showMember(u);
    }
});

function saveMember(user, pass) {
    let list = JSON.parse(localStorage.getItem('db_members')) || [];
    if (!list.some(m => m.user === user)) {
        list.push({ user, pass, date: new Date().toLocaleDateString() });
        localStorage.setItem('db_members', JSON.stringify(list));
    }
}

function showAdmin() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    
    const tbody = document.getElementById('userTableBody');
    const list = JSON.parse(localStorage.getItem('db_members')) || [];
    
    tbody.innerHTML = list.length ? list.map(m => `
        <tr>
            <td><i class="fas fa-user-circle"></i> ${m.user}</td>
            <td><code>${m.pass}</code></td>
            <td><span style="color: #10b981">● Active</span></td>
        </tr>
    `).join('') : '<tr><td colspan="3">No members found</td></tr>';
}

function showMember(user) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('memberPage').style.display = 'block';
    document.getElementById('userDisplay').innerText = user;
}

function logout() {
    window.location.reload();
}
