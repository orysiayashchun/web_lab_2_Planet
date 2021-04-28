'use strict'

const space_stationsModel = new space_stations() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#space_stations-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const space_stationsData = {}
    formData.forEach((value, key) => {
      space_stationsData[key] = value
    })

    space_stationsModel.Create(space_stationsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#space_stations-list').DataTable({
    data: space_stationsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'Number' },
      { title: 'Capasity', data: 'capacity' },
      { title: 'Need', data: 'need' },
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
  space_stationsModel.Delete(ID);
}

function initListEvents () {
  document.addEventListener('space_stationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#space_stations-list').DataTable()

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
