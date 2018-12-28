import { Component, OnInit } from '@angular/core';
import { EmpHttpService } from './emp-http.service';
import { Employee } from './employee';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  error: any;
  emps: Employee[];
  empNew: Employee = new Employee();
  empUpdateBackup: Employee = null;
  empUpdateId: number = 0;

  constructor(private empHttpService: EmpHttpService) { }

  findAllClassic() {
    this.empHttpService.findAllClassic().then(result => {
      if (result) {
        this.emps = result;
      }
    }).catch(error => this.error = error);
  }

  ngOnInit() {
    // this.findAllClassic();
    this.findAll();
  }

  async findAll() {
    try {
      this.emps = await this.empHttpService.findAll();
    } catch (error) {
      this.error = error;
    }
  }

  async addOne() {
    try {
      let emp = await this.empHttpService.addOne(this.empNew);
      this.emps.push(emp);
      this.empNew = new Employee();
    } catch (error) {
      this.error = error;
    }
  }

  async updateOne(emp) {
    if (window.confirm(`Are you sure to update?`)) {
      try {
        let nothingToDo = await this.empHttpService.updateOne(emp);
        this.empUpdateBackup = null;
        this.empUpdateId = 0;
      } catch (error) {
        this.error = error;
      }
    }
  }

  async deleteOne(id: number) {
    if (window.confirm(`Are you sure to delete of #${id}?`)) {
      try {
        if (await this.empHttpService.deleteOne(id)) {
          this.emps.splice(this.emps.findIndex(item => item.id === id), 1);
        }
      } catch (error) {
        this.error = error;
      }
    }
  }

  updateMode(id: number, event) {
    // 이미 업데이트 모드인 다른 행이 있다면 취소로 보고 되돌려 놓는 작업을 수행한다.
    if (this.empUpdateId !== 0 && this.empUpdateBackup !== null) {
        this.updateCancel();
    }

    // 사용자가 클릭한 테이블의 행,열 정보를 이용할 수 있다.
    // 이를 이용한다면 셀단위로 수정모드를 지원할 수 있다.
    // 소개를 위해서 언급했지만 사용하지는 않고 있다.
    console.log(event.target.dataset.row + ',' + event.target.cellIndex);

    // 지금은 키(id) 값으로 제어해 보자. 행 전체를 수정모드로 변경하는 방식을 사용한다.
    this.empUpdateBackup = JSON.parse(JSON.stringify(this.emps.find(item => item.id === id)));
    this.empUpdateId = id;
  }

  updateCancel() {
    this.emps.splice(this.emps.findIndex(item => item.id === this.empUpdateId), 1, this.empUpdateBackup);
    this.empUpdateId = 0;
  }
}
