import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from '../../src/modules/tickets/tickets.service';
import { TicketsController } from '../../src/modules/tickets/tickets.controller';

describe('TicketsController', () => {
  let controller: TicketsController;

  const mockTicketsService = {
    create: jest.fn((dto) => {
      return {
        success: true,
        data: {
          id: '',
          address: dto.address,
          comments: dto.comments,
          done: dto.done,
          serviceDate: dto.serviceDate,
          payment: dto.payment,
        },
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        success: true,
        data: {
          id: id,
          address: dto.address,
          comments: dto.comments,
          done: dto.done,
          serviceDate: dto.serviceDate,
          payment: dto.payment,
          client: { id: dto.client.id },
          municipality: { id: dto.municipality.id },
        },
      };
    }),
    findAll: jest.fn(() => {
      return {
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
      };
    }),
    findOne: jest.fn((id) => {
      return {
        success: true,
        data: {
          id: id,
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
      };
    }),
    delete: jest.fn((id) => {
      return {
        success: true,
      };
    }),
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
      controllers: [TicketsController],
      providers: [TicketsService],
    })
      .overrideProvider(TicketsService)
      .useValue(mockTicketsService)
      .compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a Ticket', async () => {
    expect(controller.create(createOrUpdateTicketModel)).toEqual({
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

    expect(mockTicketsService.create).toHaveBeenCalledWith(
      createOrUpdateTicketModel,
    );
    expect(mockTicketsService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all Tickets', async () => {
    expect(controller.findAll()).toEqual({
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

    expect(mockTicketsService.findAll).toHaveBeenCalled();
    expect(mockTicketsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one Ticket', async () => {
    expect(controller.findOne('a40a7e40-0a54-403a-afec-34d218e7a264')).toEqual({
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

    expect(mockTicketsService.findOne).toHaveBeenCalledWith(
      'a40a7e40-0a54-403a-afec-34d218e7a264',
    );
    expect(mockTicketsService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a Ticket', async () => {
    expect(
      controller.update(
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
        client: {
          id: '8238f326-925d-407c-96cc-2cf46976ff41',
        },
        municipality: {
          id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
        },
      },
    });

    expect(mockTicketsService.update).toHaveBeenCalledWith(
      'a40a7e40-0a54-403a-afec-34d218e7a264',
      createOrUpdateTicketModel,
    );
    expect(mockTicketsService.update).toHaveBeenCalledTimes(1);
  });

  it('should delete one Ticket', async () => {
    expect(controller.delete('a40a7e40-0a54-403a-afec-34d218e7a264')).toEqual({
      success: true,
    });

    expect(mockTicketsService.delete).toHaveBeenCalledWith(
      'a40a7e40-0a54-403a-afec-34d218e7a264',
    );
    expect(mockTicketsService.delete).toHaveBeenCalledTimes(1);
  });
});
