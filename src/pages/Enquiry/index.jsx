import { useState } from "react";
import { createEnquiry } from "../../firebase/enquiries";
import { uploadEnquiryImage } from "../../firebase/storage";
import "./Enquiry.css";

const EVENT_TYPES = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Corporate event",
  "Christening",
  "Other",
];

export default function Enquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [eventDate, setEventDate] = useState("");
  const [servings, setServings] = useState("");
  const [details, setDetails] = useState("");
  const [dietary, setDietary] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file || null);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = null;
      if (photoFile) {
        imageUrl = await uploadEnquiryImage(photoFile);
      }

      await createEnquiry({
        name,
        email,
        phone,
        eventType,
        eventDate,
        servings,
        details,
        dietary,
        inspirationImage: imageUrl,
      });

      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong sending your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="enquiry-page">
        <div className="enquiry-success">
          <div className="enquiry-success__badge">✓</div>
          <h1>Enquiry sent</h1>
          <p>
            Thank you for reaching out! We'll be in touch soon to discuss
            your bespoke cake.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-page">
      <h1 className="enquiry-page__heading">Bespoke &amp; Wedding Cake Enquiry</h1>
      <p className="enquiry-page__intro">
        Tell us about your event and vision, and we'll get back to you with
        ideas and a quote.
      </p>

      <form className="enquiry-form" onSubmit={handleSubmit}>
        <label className="enquiry-field">
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <div className="enquiry-row">
          <label className="enquiry-field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="enquiry-field">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="enquiry-row">
          <label className="enquiry-field">
            Event type
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="enquiry-field">
            Event date
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="enquiry-field">
          Approximate number of servings
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </label>

        <label className="enquiry-field">
          Tell us about your vision
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            placeholder="Flavours, colours, theme, design ideas..."
            required
          />
        </label>

        <label className="enquiry-field">
          Dietary requirements or allergies
          <input
            type="text"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            placeholder="e.g. nut-free, gluten-free, vegan"
          />
        </label>

        <div className="enquiry-photo-section">
          <div className="enquiry-photo-preview">
            {photoPreview ? (
              <img src={photoPreview} alt="Inspiration preview" />
            ) : (
              <span>No photo selected</span>
            )}
          </div>

          <label className="enquiry-field" style={{ flex: 1 }}>
            Inspiration photo (optional)
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <button type="submit" className="enquiry-submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send enquiry"}
        </button>
      </form>
    </div>
  );
}