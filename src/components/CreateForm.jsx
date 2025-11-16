import { useState } from "react";

function ProductCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [""],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    else if (isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Price must be a valid number.";
    if (!formData.categoryId) newErrors.categoryId = "Category ID is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.images.length || formData.images.some((img) => !img))
      newErrors.images = "At least one image URL is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
    };

    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })
        console.log(response)

    setFormData({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: [""],
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create Product</h2>

      <label style={styles.label}>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.title && <span style={styles.error}>{errors.title}</span>}
      </label>

      <label style={styles.label}>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.price && <span style={styles.error}>{errors.price}</span>}
      </label>

      <label style={styles.label}>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />
        {errors.description && (
          <span style={styles.error}>{errors.description}</span>
        )}
      </label>

      <label style={styles.label}>
        Category ID:
        <input
          type="number"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.categoryId && (
          <span style={styles.error}>{errors.categoryId}</span>
        )}
      </label>

      <div style={styles.label}>
        <span>Images:</span>
        {formData.images.map((img, index) => (
          <div key={index} style={styles.imageRow}>
            <input
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              style={{ ...styles.input, flex: 1 }}
            />
            {formData.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                style={styles.removeButton}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          style={styles.addButton}
        >
          + Add Image
        </button>
        {errors.images && <span style={styles.error}>{errors.images}</span>}
      </div>

      <button type="submit" style={styles.submitButton}>
        Create Product
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  label: {
    display: "block",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    marginTop: "5px",
  },
  imageRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    gap: "5px",
  },
  addButton: {
    marginTop: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  removeButton: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    display: "block",
    marginTop: "4px",
  },
};

export default ProductCreateForm;
