'use strict'

const goodsModel = new goods() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#goods-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const goodsData = {}
    formData.forEach((value, key) => {
      goodsData[key] = value
    })

    goodsModel.Create(goodsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#goods-list').DataTable({
    data: goodsModel.Select(),
    columns: [
      { title: 'code', data: 'code' },
      { title: 'name', data: 'name' },
      { title: 'weight', data: 'weight' },
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
  goodsModel.Delete(code);
}

function initListEvents () {
  document.addEventListener('goodsListDataChanged', function (e) {
    const dataTable = window.jQuery('#goods-list').DataTable()

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
