const name = document.getElementById('name');
const description = document.getElementById('desc');
const price = document.getElementById('price');
const loader = document.querySelector('.center')

document.addEventListener('DOMContentLoaded', function () {
    let id = window.location.href.substring(window.location.href.search('id=') + 3);
    if(id) {
        fetch(`https://auth-rg69.onrender.com/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.id){
                name.textContent = data.name;
                description.textContent = data.description;
                price.textContent = data.price;
            }
            loader.style.display = 'none';
        })
        .catch(err => {
             console.log(err);
        })
        
    }else{
        let domain = window.location.href.substring(0, window.location.href.search('pages/info'));
                        window.location.assign(`${domain}index.html`)
    }
});