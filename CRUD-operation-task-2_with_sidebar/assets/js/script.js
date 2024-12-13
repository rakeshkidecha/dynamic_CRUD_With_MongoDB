const sidebar = document.getElementById('sidebar');
sidebar.addEventListener('click',()=>{
    document.getElementById('main').classList.toggle('show-main');
    document.getElementById('aside').classList.toggle('show-aside');
})