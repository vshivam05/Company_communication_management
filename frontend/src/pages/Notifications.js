import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [overdue, setOverdue] = useState([]);
  const [todays, setTodays] = useState([]);
  const [counts, setCounts] = useState({ overdue: 0, todays: 0 });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/communications"
        );
        const communications = response.data;

        const now = new Date();
        const todayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1);

        // Group communications by company and classify based on lastDate
        const companyOverdue = {};
        const companyTodays = {};

        communications.forEach((comm) => {
          const lastCommDate = new Date(comm.lastDate);

          // If lastDate has passed, add to overdue communications
          if (lastCommDate < todayStart) {
            if (!companyOverdue[comm.companyId._id]) {
              companyOverdue[comm.companyId._id] = {
                company: comm.companyId,
                communications: [],
              };
            }
            companyOverdue[comm.companyId._id].communications.push(comm);
          }
          // If lastDate is today or in the future, add to today's communications
          else if (lastCommDate >= todayStart && lastCommDate >= todayEnd) {
            if (!companyTodays[comm.companyId._id]) {
              companyTodays[comm.companyId._id] = {
                company: comm.companyId,
                communications: [],
              };
            }
            companyTodays[comm.companyId._id].communications.push(comm);
          }
        });

        // Set state with classified communications
        setOverdue(Object.values(companyOverdue));
        setTodays(Object.values(companyTodays));
        setCounts({
          overdue: Object.values(companyOverdue).reduce(
            (acc, curr) => acc + curr.communications.length,
            0
          ),
          todays: Object.values(companyTodays).reduce(
            (acc, curr) => acc + curr.communications.length,
            0
          ),
        });

        // Update notification badge
        const totalNotifications = counts.overdue + counts.todays;
        document.title =
          totalNotifications > 0
            ? `(${totalNotifications}) Notifications`
            : "Notifications";
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const renderGrid = (items, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          
            

          <div
            key={item.company._id}
            className="p-4 bg-white rounded-lg shadow-lg"
          >
            <h4 className="font-medium text-gray-800">{item.company.name}</h4>
            <div className="text-sm text-gray-500 mb-2">
              {item.communications.map((comm, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">
                    {new Date(comm.lastDate).toLocaleDateString()}
                  </span>
                  <p className="text-gray-600">
                    {comm.notes || "No notes available"}
                  </p>
                  <p className="text-gray-500">Type: {comm.type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {/* Notification Icon */}
      {console.log("Overdue:", overdue)}
      <div className="relative">
        <i className="fas fa-bell text-2xl text-gray-800"></i>
        {counts.overdue > 0 || counts.todays > 0 ? (
          <span className="absolute top-0 right-0 px-2 py-1 text-xs bg-red-600 text-white rounded-full">
            {counts.overdue + counts.todays}
          </span>
        ) : null}
      </div>

      {/* Overdue and Today's Communications Grids */}
      {renderGrid(
        overdue,
        `Companies with Overdue Communications (${counts.overdue})`
      )}
      {renderGrid(
        todays,
        `Companies with Today's Communications (${counts.todays})`
      )}
    </div>
  );
};

export default Notifications;
