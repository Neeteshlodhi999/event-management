const EventTable = ({ events }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left p-4">Event</th>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Tickets</th>
            <th className="text-left p-4">Revenue</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-b border-white/5"
            >
              <td className="p-4">{event.title}</td>
              <td className="p-4">{event.date}</td>
              <td className="p-4">{event.status}</td>
              <td className="p-4">{event.tickets}</td>
              <td className="p-4">₹{event.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;