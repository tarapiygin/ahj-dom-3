import UIManager from './UIManager';

export default class TableManager {
  constructor(dataJSON) {
    this.data = dataJSON;
    this.headerObjList = [];
    this.UIManager = new UIManager(document.querySelector('.table'));
    this.lastSortingObj = null;
  }

  static sortingData(data, name) {
    return data.sort((a, b) => {
      if (a[name] < b[name]) {
        return -1;
      }
      if (a[name] > b[name]) {
        return 1;
      }
      return 0;
    });
  }

  onClickTableHeader(name, sorting) {
    const headerObj = this.headerObjList.find((obj) => obj.header === name);
    headerObj.sorting = sorting === 'down' ? 'up' : 'down';
    if (this.lastSortingObj !== headerObj && this.lastSortingObj !== null) this.lastSortingObj.sorting = '';
    this.lastSortingObj = headerObj;
    const sortingData = TableManager.sortingData(this.data.slice(), name);

    if (headerObj.sorting === 'up') sortingData.reverse();
    this.UIManager.drawTable(this.headerObjList, sortingData);
  }

  parseTableHeaders() {
    for (const header of Object.getOwnPropertyNames(this.data[0])) {
      this.headerObjList.push({
        header,
        sorting: '',
      });
    }
  }

  registerEvents() {
    this.UIManager.addClickTableTitleListener(this.onClickTableHeader.bind(this));
  }

  init() {
    this.parseTableHeaders();
    this.registerEvents();
    this.UIManager.drawTable(this.headerObjList, this.data);
  }
}
