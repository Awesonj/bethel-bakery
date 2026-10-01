import { useState } from "react";
import { addMenuItem } from "../../../firebase/menu";
import { uploadMenuItemImage } from "../../../firebase/storage";
import "./MenuManager.css";

const CATEGORIES = [
  "Bread",
  "Pastries",
  "Everyday Cakes",
  "Cupcakes",
  "Cookies",
  "Brownies",
  "Bespoke Cakes",
  "Seasonal",
];

const ALLERGENS = [
  "Gluten",
  "Eggs",
  "Milk",
  "Nuts",
  "Peanuts",
  "Soya",
  "Sesame",
];

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [allergens, setAllergens] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleAllergen = (allergen) => {
    setAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file || null);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory(CATEGORIES[0]);
    setAllergens([]);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      let imageUrl = null;

      if (photoFile) {
        imageUrl = await uploadMenuItemImage(photoFile);
      }

      await addMenuItem({
        name,
        description,
        price: parseFloat(price),
        category,
        allergens,
        stock: 0,
        soldOut: true,
        onSale: false,
        saleText: "",
        image: imageUrl,
      });

      resetForm();
      setSuccess(true);
    } catch (err) {
      alert("Something went wrong saving this item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="menu-manager">
      <h1 className="menu-manager__heading">Add Item</h1>

      <form className="item-form" onSubmit={handleSubmit}>
        <div className="item-form__photo-section">
          <div className="item-form__photo-preview">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" />
            ) : (
              <span>No photo selected</span>
            )}
          </div>

          <label className="item-form__label" style={{ flex: 1 }}>
            Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <label className="item-form__label">
          Item name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="item-form__label">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>

        <div className="item-form__row">
          <label className="item-form__label">
            Price (GBP)
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <label className="item-form__label">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="item-form__allergens">
          <legend>Allergens</legend>
          {ALLERGENS.map((allergen) => (
            <label key={allergen} className="item-form__allergen-option">
              <input
                type="checkbox"
                checked={allergens.includes(allergen)}
                onChange={() => toggleAllergen(allergen)}
              />
              {allergen}
            </label>
          ))}
        </fieldset>

        {success && (
          <p className="item-form__success">
            Item saved. Set its stock in Update Item to put it on sale.
          </p>
        )}

        <button type="submit" className="item-form__submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save item"}
        </button>
      </form>
    </div>
  );
}