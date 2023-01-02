import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TicketsService } from '../../src/modules/tickets/tickets.service';
import { TicketEntity } from '../../src/models/ticket/ticket.entity';
import { MunicipalityEntity } from '../../src/models/municipality/municipality.entity';
import { ClientEntity } from '../../src/models/client/client.entity';
import { TechnicianEntity } from '../../src/models/technician/technician.entity';
import { TicketsModule } from '../../src/modules/tickets/tickets.module';
import { createConnection } from 'net';
import { DepartmentEntity } from '../../src/models/department/department.entity';
import { ConfigService } from '@nestjs/config';

describe('TicketsService', () => {
  let service: TicketsService;

  const mockTicketsRepository = {
    save: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: '',
        address: dto.address,
        comments: dto.comments,
        done: dto.done,
        serviceDate: dto.serviceDate,
        payment: dto.payment,
      }),
    ),
    findOneBy: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: dto.id,
        address: dto.address,
        comments: dto.comments,
        done: dto.done,
        serviceDate: dto.serviceDate,
        payment: dto.payment,
      }),
    ),
    find: jest.fn().mockImplementation((dto) =>
      Promise.resolve([
        {
          id: 'a40a7e40-0a54-403a-afec-34d218e7a264',
          address: 'cra 5 # 10-52',
          payment: 50000,
          comments: 'servicio rapido',
          serviceDate: '2022-12-30T00:00:00.000Z',
          done: true,
          technician: {
            id: '0ab65924-dc8f-406f-b3a3-daa86ad4b622',
            firstName: 'Duvan',
            lastName: 'Martinez',
            admissionDate: '2022-12-30T00:00:00.000Z',
          },
          client: {
            id: '8238f326-925d-407c-96cc-2cf46976ff41',
            firstName: 'juan',
            lastName: 'trujillo',
          },
          municipality: {
            id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
            name: 'Bucaramanga',
          },
        },
      ]),
    ),
    findOne: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: 'a40a7e40-0a54-403a-afec-34d218e7a264',
        address: 'cra 5 # 10-52',
        payment: 50000,
        comments: 'servicio rapido',
        serviceDate: '2022-12-30T00:00:00.000Z',
        done: true,
        technician: {
          id: '0ab65924-dc8f-406f-b3a3-daa86ad4b622',
          firstName: 'Duvan',
          lastName: 'Martinez',
          admissionDate: '2022-12-30T00:00:00.000Z',
        },
        client: {
          id: '8238f326-925d-407c-96cc-2cf46976ff41',
          firstName: 'juan',
          lastName: 'trujillo',
        },
        municipality: {
          id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
          name: 'Bucaramanga',
        },
      }),
    ),
    delete: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        affected: 1,
      }),
    ),
  };

  const mockMunicipalitiesRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
        name: 'Bucaramanga',
        tickets: [],
      }),
    ),
    save: jest.fn().mockImplementation((dto) => dto),
  };

  const mockClientsRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id: id,
        firstName: 'juan',
        lastName: 'trujillo',
        tickets: [],
      }),
    ),
    save: jest.fn().mockImplementation((dto) => dto),
  };

  const mockTechniciansRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          getOne: jest.fn(),
        })),
      })),
      relation: jest.fn(() => ({
        of: jest.fn(() => ({
          add: jest.fn(),
        })),
      })),
    })),
  };

  const createOrUpdateTicketModel = {
    address: 'cra 5 # 10-52',
    payment: 50000,
    comments: 'servicio rapido',
    serviceDate: new Date('2022-12-30 00:00:00+00'),
    done: true,
    client: {
      id: '8238f326-925d-407c-96cc-2cf46976ff41',
      firstName: '',
      lastName: '',
    },
    municipality: {
      id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
      name: '',
      department: {
        name: '',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(TicketEntity),
          useValue: mockTicketsRepository,
        },
        {
          provide: getRepositoryToken(ClientEntity),
          useValue: mockClientsRepository,
        },
        {
          provide: getRepositoryToken(MunicipalityEntity),
          useValue: mockMunicipalitiesRepository,
        },
        {
          provide: getRepositoryToken(TechnicianEntity),
          useValue: mockTechniciansRepository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Ticket', async () => {
    expect(await service.create(createOrUpdateTicketModel)).toEqual({
      success: true,
      data: {
        address: 'cra 5 # 10-52',
        payment: 50000,
        comments: 'servicio rapido',
        serviceDate: new Date('2022-12-30 00:00:00+00'),
        done: true,
        id: expect.any(String),
      },
    });

    expect(mockTicketsRepository.save).toHaveBeenCalled();
    expect(mockTicketsRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should update a Ticket', async () => {
    expect(
      await service.update(
        'a40a7e40-0a54-403a-afec-34d218e7a264',
        createOrUpdateTicketModel,
      ),
    ).toEqual({
      success: true,
      data: {
        address: 'cra 5 # 10-52',
        payment: 50000,
        comments: 'servicio rapido',
        serviceDate: new Date('2022-12-30 00:00:00+00'),
        done: true,
        id: expect.any(String),
      },
    });

    expect(mockTicketsRepository.findOneBy).toHaveBeenCalledWith({
      id: 'a40a7e40-0a54-403a-afec-34d218e7a264',
    });
    expect(mockTicketsRepository.findOneBy).toHaveBeenCalledTimes(1);

    expect(mockTicketsRepository.save).toHaveBeenCalled();
    expect(mockTicketsRepository.save).toHaveBeenCalledTimes(2);
  });

  it('should find all Tickets', async () => {
    expect(await service.findAll()).toEqual({
      success: true,
      data: [
        {
          id: 'a40a7e40-0a54-403a-afec-34d218e7a264',
          address: 'cra 5 # 10-52',
          payment: 50000,
          comments: 'servicio rapido',
          serviceDate: '2022-12-30T00:00:00.000Z',
          done: true,
          technician: {
            id: '0ab65924-dc8f-406f-b3a3-daa86ad4b622',
            firstName: 'Duvan',
            lastName: 'Martinez',
            admissionDate: '2022-12-30T00:00:00.000Z',
          },
          client: {
            id: '8238f326-925d-407c-96cc-2cf46976ff41',
            firstName: 'juan',
            lastName: 'trujillo',
          },
          municipality: {
            id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
            name: 'Bucaramanga',
          },
        },
      ],
    });

    expect(mockTicketsRepository.find).toHaveBeenCalledWith({
      relations: ['technician', 'client', 'municipality'],
    });
    expect(mockTicketsRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should find one Ticket', async () => {
    expect(
      await service.findOne('a40a7e40-0a54-403a-afec-34d218e7a264'),
    ).toEqual({
      success: true,
      data: {
        id: 'a40a7e40-0a54-403a-afec-34d218e7a264',
        address: 'cra 5 # 10-52',
        payment: 50000,
        comments: 'servicio rapido',
        serviceDate: '2022-12-30T00:00:00.000Z',
        done: true,
        technician: {
          id: '0ab65924-dc8f-406f-b3a3-daa86ad4b622',
          firstName: 'Duvan',
          lastName: 'Martinez',
          admissionDate: '2022-12-30T00:00:00.000Z',
        },
        client: {
          id: '8238f326-925d-407c-96cc-2cf46976ff41',
          firstName: 'juan',
          lastName: 'trujillo',
        },
        municipality: {
          id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
          name: 'Bucaramanga',
        },
      },
    });

    expect(mockTicketsRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'a40a7e40-0a54-403a-afec-34d218e7a264' },
      relations: ['technician', 'client', 'municipality'],
    });
    expect(mockTicketsRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should delete Ticket', async () => {
    expect(
      await service.delete('a40a7e40-0a54-403a-afec-34d218e7a264'),
    ).toEqual({
      success: true,
    });

    expect(mockTicketsRepository.delete).toHaveBeenCalledWith(
      'a40a7e40-0a54-403a-afec-34d218e7a264',
    );
    expect(mockTicketsRepository.delete).toHaveBeenCalledTimes(1);
  });
});
