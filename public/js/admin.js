

const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const productElement = btn.closest('article');
    fetch('/admin/product/' + prodId, {   //fetch() is used for both Fetching and sending
        method: "DELETE",
        headers: {
            'csrf-token': csrf
        }

    })
        .then(result => {
            return result.json();

        }).then(data => {
            console.log(data);
            // productElement.remove(); dosen't work for Internet Explorer
            productElement.parentNode.removeChild(productElement);
        })
        .catch(err => console.log(err))


};