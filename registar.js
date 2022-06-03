
class Reg {
    constructor(name, job, tell) {
      this.name = name;
      this.job = job;
      this.tell = tell;
    }
  }    

  class UI {
    static displayRegs() {
      const regs = Storage.getRegs();  
      regs.forEach((reg) => UI.addRegToList(reg));
    }

  
    static addRegToList(reg) {
      const list = document.querySelector('#reg-list');  
      const row = document.createElement('tr');
   
      row.innerHTML = `
        <td>${reg.name}</td>
        <td>${reg.job}</td>
        <td>${reg.tell}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
  
      list.appendChild(row);
    }
  
    static deleteReg(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#reg-form');
      container.insertBefore(div, form);  
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#job').value = '';
      document.querySelector('#tell').value = '';     
    }
  }
  
  
  class Storage {
    static getRegs() {
      let regs;
      if(localStorage.getItem('regs') === null) {
        regs = [];
      } else {
        regs = JSON.parse(localStorage.getItem('regs'));
      }
  
      return regs;
    }
  
    static addReg(reg) {
      const regs = Storage.getRegs();
      regs.push(reg);
      localStorage.setItem('regs', JSON.stringify(regs));
    }
  
    static removeReg(tell) {
      const regs = Storage.getRegs();
  
      regs.forEach((reg, index) => {
        if(reg.tell === tell) {
          regs.splice(index, 1);
        }
      });
  
      localStorage.setItem('regs', JSON.stringify(regs));
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', UI.displayRegs);
  document.querySelector('#reg-form').addEventListener('submit', (e) => {
        e.preventDefault();
  
    const name = document.querySelector('#name').value;
    const job = document.querySelector('#job').value;
    const tell = document.querySelector('#tell').value;
  
   
    if(name === '' || job === '' || tell === '') {
      UI.showAlert('Моля попълнете всички полета', 'danger');
    } else {
      
      const reg = new Reg(name, job, tell);  
      
      UI.addRegToList(reg);       
      Storage.addReg(reg);  
      UI.showAlert('Успешно добавяне', 'success');        
      UI.clearFields();
    }
  });
  
 
  document.querySelector('#reg-list').addEventListener('click', (e) => {   
    UI.deleteReg(e.target);   
    Storage.removeReg(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Контакта е изтрит', 'danger');
  });