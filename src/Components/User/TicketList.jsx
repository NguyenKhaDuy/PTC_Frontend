import TicketCard from "./TicketCard";

export default function TicketList({ tickets, setSelectedTicket }) {
  return (
    <>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.idBill}
          ticket={ticket}
          onClick={() => setSelectedTicket(ticket)}
        />
      ))}
    </>
  );
}
