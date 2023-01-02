import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

jest.setTimeout(10000);

describe('TicketsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tickets (GET)', () => {
    return request(app.getHttpServer())
      .get('/tickets')
      .expect(200)
      .expect((res) => {
        const data = res.body;

        expect(data).toHaveProperty('success');
        expect(data.success).toEqual(true);

        expect(data).toHaveProperty('data');
        expect(Array.isArray(data.data)).toEqual(true);

        if (data.data.length > 0) {
          const ticket = data.data[0];

          expect(ticket).toHaveProperty('id');
          expect(ticket).toHaveProperty('address');
          expect(ticket).toHaveProperty('payment');
          expect(ticket).toHaveProperty('comments');
          expect(ticket).toHaveProperty('serviceDate');
          expect(ticket).toHaveProperty('done');
          expect(ticket).toHaveProperty('technician');
          expect(ticket).toHaveProperty('client');
          expect(ticket).toHaveProperty('municipality');
        }
      });
  });

  it('/tickets/:id (GET)', async () => {
    const tickets = (await request(app.getHttpServer()).get('/tickets')).body
      .data;

    expect(tickets.length).toBeGreaterThanOrEqual(1);

    if (tickets.length > 0) {
      const id = tickets[0].id;

      return request(app.getHttpServer())
        .get(`/tickets/${id}`)
        .expect(200)
        .expect((res) => {
          const data = res.body;

          expect(data).toHaveProperty('success');
          expect(data.success).toEqual(true);

          expect(data).toHaveProperty('data');
          expect(typeof data.data === 'object').toEqual(true);

          const ticket = data.data;

          expect(ticket).toHaveProperty('id');
          expect(ticket).toHaveProperty('address');
          expect(ticket).toHaveProperty('payment');
          expect(ticket).toHaveProperty('comments');
          expect(ticket).toHaveProperty('serviceDate');
          expect(ticket).toHaveProperty('done');
          expect(ticket).toHaveProperty('client');
          expect(ticket).toHaveProperty('municipality');
        });
    }
  });

  it('/tickets (POST)', () => {
    return request(app.getHttpServer())
      .post('/tickets')
      .send({
        address: 'cra 5 # 10-52',
        payment: 50000,
        comments: 'servicio rapido',
        serviceDate: '2022-12-30 00:00:00+00',
        done: true,
        client: {
          id: '8238f326-925d-407c-96cc-2cf46976ff41',
        },
        municipality: {
          id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
        },
      })
      .expect(201)
      .expect((res) => {
        const data = res.body;

        expect(data).toHaveProperty('success');
        expect(data.success).toEqual(true);

        expect(data).toHaveProperty('data');
        expect(typeof data.data === 'object').toEqual(true);

        const ticket = data.data;

        expect(ticket).toHaveProperty('id');
        expect(ticket).toHaveProperty('address');
        expect(ticket).toHaveProperty('payment');
        expect(ticket).toHaveProperty('comments');
        expect(ticket).toHaveProperty('serviceDate');
        expect(ticket).toHaveProperty('done');
      });
  });

  it('/tickets/:id (PUT)', async () => {
    const tickets = (await request(app.getHttpServer()).get('/tickets')).body
      .data;

    expect(tickets.length).toBeGreaterThanOrEqual(1);

    if (tickets.length > 0) {
      const id = tickets[0].id;

      return request(app.getHttpServer())
        .put(`/tickets/${id}`)
        .send({
          address: 'cra 5 # 10-52',
          payment: 50000,
          comments: 'servicio rapido55',
          serviceDate: '2022-12-30 00:00:00+00',
          done: true,
          client: {
            id: '8238f326-925d-407c-96cc-2cf46976ff41',
          },
          municipality: {
            id: '46bb3dff-34e1-45ec-aae8-ab0112d4bb71',
          },
        })
        .expect(200)
        .expect((res) => {
          const data = res.body;

          expect(data).toHaveProperty('success');
          expect(data.success).toEqual(true);

          expect(data).toHaveProperty('data');
          expect(typeof data.data === 'object').toEqual(true);

          const ticket = data.data;

          expect(ticket).toHaveProperty('id');
          expect(ticket).toHaveProperty('address');
          expect(ticket).toHaveProperty('payment');
          expect(ticket).toHaveProperty('comments');
          expect(ticket).toHaveProperty('serviceDate');
          expect(ticket).toHaveProperty('done');
          expect(ticket).toHaveProperty('client');
          expect(ticket).toHaveProperty('municipality');
        });
    }
  });

  it('/tickets/:id (DELETE)', async () => {
    const tickets = (await request(app.getHttpServer()).get('/tickets')).body
      .data;

    expect(tickets.length).toBeGreaterThanOrEqual(1);

    if (tickets.length > 0) {
      const id = tickets[0].id;

      return request(app.getHttpServer())
        .delete(`/tickets/${id}`)
        .expect(200)
        .expect((res) => {
          const data = res.body;

          expect(data).toHaveProperty('success');
          expect(data.success).toEqual(true);
        });
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
