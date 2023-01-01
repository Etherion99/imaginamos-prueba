import { IDepartment } from '../department/department.interface';

export interface IMunicipality {
  id?: string;
  name: string;
  department: IDepartment;
}
