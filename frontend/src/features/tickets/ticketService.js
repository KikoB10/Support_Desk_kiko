import axios from 'axios';

const API_URL = '/api/tickets/';

//Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //making the requests
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const ticketService = {
  createTicket,
};

export default ticketService;
