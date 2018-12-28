import { Injectable } from '@angular/core';
import axios from 'axios';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmpHttpService {
  URL = 'http://localhost:3000/employees';

  // GET    /employees
  // GET    /employees/1
  // POST   /employees
  // PUT    /employees/1
  // PATCH  /employees/1
  // DELETE /employees/1

  constructor() { }

  findAllClassic(): Promise<void | Employee[]> {
    return axios.get(this.URL)
      .then(function(response) {
        let empsNoType = response.data;

        let empsWithType: Employee[] = [];
        for (let i = 0; i < empsNoType.length; i++) {
          empsWithType.push(new Employee().deserialize(empsNoType[i]));
        }

        return empsWithType;
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  async findAll(): Promise<Employee[]> {
    try {
      let response = await axios.get(this.URL);
      let empsNoType = response.data;

      let empsWithType: Employee[] = [];
      for (let i = 0; i < empsNoType.length; i++) {
        empsWithType.push(new Employee().deserialize(empsNoType[i]));
      }
      return empsWithType;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Employee> {
    try {
      let response = await axios.get(this.URL + '/' + id);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addOne(emp: Employee): Promise<Employee> {
    try {
      let response = await axios.post(this.URL, emp);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateOne(emp: Employee): Promise<Employee> {
    try {
      let response = await axios.put(this.URL + '/' + emp.id, emp);
      return new Employee().deserialize(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOne(id: number): Promise<boolean> {
    try {
      await axios.delete(this.URL + '/' + id);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
