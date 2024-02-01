function createRow(phone, index){
    return `
    <tr data-id = "data_${phone.id}">
                <th scope="row">${index}</th>
                <td class = "text-primary fw-bold" style = "cursor:pointer" >${phone.name}</td>
                <td>${phone.price}</td>
                <td>${phone.description}</td>
                <td>
                  <button type="button" class="btn btn-primary me-4">Edit</button>
                  <button type="button" class="btn btn-danger">Delete</button>
                </td>
              </tr>`
}

function validate(name, price){
  if(!name.value){
    alert("Name is required");
    name.focus();
    return false;
  }

if(name.value.trim().length < 3){
    alert("Name must be at least 3 characters");
    name.focus();
    return false;
}

  if(!price.value){
    alert("Price is required");
    price.focus();
    return false;
  }
return true;
}

export {createRow, validate}