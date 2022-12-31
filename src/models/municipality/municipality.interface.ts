import { IDepartment } from '../department/department.interface';

export interface IMunicipality {
  id: number;
  name: string;
  department: IDepartment;
}
