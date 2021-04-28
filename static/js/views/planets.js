'use strict'

const planetsModel = new planets() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#planets-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const planetsData = {}
    formData.forEach((value, key) => {
      planetsData[key] = value
    })

    planetsModel.Create(planetsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#planets-list').DataTable({
    data: planetsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'namep' },
      { title: 'Capasity', data: 'capacity' },
      { title: 'Mass', data: 'mass' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 4
      }
    ]
  })
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  planetsModel.Delete(ID);
}


function initListEvents () {
  document.addEventListener('planetsListDataChanged', function (e) {
    const dataTable = window.jQuery('#shop-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
