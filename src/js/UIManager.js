import round from './utils';

export default class UIManager {
  constructor(tableElement) {
    this.tableElement = tableElement;
    this.clickTableHeaderListeners = [];
  }

  static renderTableHeaders(headerObjList) {
    let HTML = '<tr>';
    headerObjList.forEach((obj) => {
      let sortingImage = ' ';
      if (obj.sorting === 'down') sortingImage += '↓';
      if (obj.sorting === 'up') sortingImage += '↑';
      HTML += `<th class="table-td table-header" data-name=${obj.header} data-sorting="${obj.sorting}">${obj.header + sortingImage}</th>`;
    });
    HTML += '</tr>';
    return HTML;
  }

  static renderTableBody(data) {
    let HTML = '';
    data.forEach((element) => {
      HTML += `<tr data-id="${element.id}"
      data-title="${element.title}"
      data-year="${element.year}"
      data-imdb="${element.imdb}">
          <td class="table-td">#${element.id}</td>
          <td class="table-td">${element.title}</td>
          <td class="table-td">imdb: ${round(element.imdb)}</td>
          <td class="table-td">(${element.year})</td>
      </tr>`;
    });
    return HTML;
  }

  drawTable(headerObjList, data) {
    const headersHTML = UIManager.renderTableHeaders(headerObjList);
    const bodyHTML = UIManager.renderTableBody(data);
    this.tableElement.innerHTML = headersHTML + bodyHTML;
    this.registerEvents();
  }

  addClickTableTitleListener(callback) {
    this.clickTableHeaderListeners.push(callback);
  }

  onClickTableHeader(event) {
    const headerEl = event.currentTarget;
    const { name, sorting } = headerEl.dataset;
    this.clickTableHeaderListeners.forEach((o) => o.call(null, name, sorting));
  }

  registerEvents() {
    const headerEl = Array.from(document.getElementsByClassName('table-header'));
    headerEl.forEach((th) => th.addEventListener('click', this.onClickTableHeader.bind(this)));
  }
}
