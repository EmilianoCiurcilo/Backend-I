import { ticketDao } from "../dao/mongo/ticket.dao.js";

class TicketService{
    async create(amount, purchaser){
        const code = Math.random().toString(36).substr(2, 5);

        const ticket = await ticketDao.create({
            code,
            amount,
            purchaser,
        });

        return ticket;
    }
}

export const ticketService = new TicketService();