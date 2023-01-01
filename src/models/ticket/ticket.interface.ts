import { IClient } from '../client/client.interface';
import { IMunicipality } from '../municipality/municipality.interface';
import { ITechnician } from '../technician/technician.interface';

export interface ITicket {
  id?: string;
  client: IClient;
  technician?: ITechnician;
  municipality: IMunicipality;
  address: string;
  payment: number;
  comments: string;
  serviceDate: Date;
  done: boolean;
}
