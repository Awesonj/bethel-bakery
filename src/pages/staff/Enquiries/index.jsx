import { useState, useEffect } from "react";
import { listenToEnquiries, updateEnquiryStatus } from "../../../firebase/enquiries";
import "./Enquiries.css";

const STATUSES = ["new", "contacted", "quoted", "booked", "declined"];
const FILTER_TABS = ["all", ...STATUSES];

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = listenToEnquiries(setEnquiries);
    return unsubscribe;
  }, []);

  const visibleEnquiries =
    filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  const handleStatusChange = (id, status) => {
    updateEnquiryStatus(id, status);
  };

  return (
    <div className="staff-enquiries">
      <h1 className="staff-enquiries__heading">Enquiries</h1>

      <div className="staff-enquiries__tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className={
              filter === tab
                ? "staff-enquiries__tab staff-enquiries__tab--active"
                : "staff-enquiries__tab"
            }
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {visibleEnquiries.length === 0 && (
        <p className="staff-enquiries__empty">No enquiries here right now.</p>
      )}

      <div className="staff-enquiries__list">
        {visibleEnquiries.map((enquiry) => (
          <div key={enquiry.id} className="enquiry-card">
            <div className="enquiry-card__top">
              <div>
                <span className="enquiry-card__name">{enquiry.name}</span>
                <span className="enquiry-card__event">
                  {enquiry.eventType}
                  {enquiry.eventDate ? " — " + enquiry.eventDate : ""}
                </span>
              </div>
              <span className={"enquiry-card__status enquiry-card__status--" + enquiry.status}>
                {enquiry.status}
              </span>
            </div>

            <div className="enquiry-card__contact">
              {enquiry.email && <span>{enquiry.email}</span>}
              {enquiry.phone && <span>{enquiry.phone}</span>}
              {enquiry.servings && <span>{enquiry.servings} servings</span>}
            </div>

            {enquiry.details && (
              <p className="enquiry-card__details">{enquiry.details}</p>
            )}

            {enquiry.dietary && (
              <p className="enquiry-card__dietary">
                <strong>Dietary:</strong> {enquiry.dietary}
              </p>
            )}

            {enquiry.inspirationImage && (
              <a
                href={enquiry.inspirationImage}
                target="_blank"
                rel="noopener noreferrer"
                className="enquiry-card__image-link"
              >
                <img
                  src={enquiry.inspirationImage}
                  alt="Inspiration"
                  className="enquiry-card__image"
                />
              </a>
            )}

            <div className="enquiry-card__footer">
              <select
                value={enquiry.status}
                onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                className="enquiry-card__status-select"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}