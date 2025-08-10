import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateProduct, showProductById } from "../../../apis/api";

function UpdateProduct() {
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const productData = new FormData();

  useEffect(() => {
    showProductById(id).then((productData) => {
      setFormInputs(productData);
      console.log("productData", productData);
      console.log("formInputs", formInputs);
    }).catch((err)=>console.log("err",err));
  }, []);

  function handleAddProduct(e) {
    e.preventDefault();
    productData.append("title", formInputs.title);
    productData.append("description", formInputs.description);
    productData.append("image", formInputs.image);
    updateProduct(id, productData)
      .then((data) => console.log("data", data))
      .catch((err) => setErrorMessage(err.response.data.message));
    window.location.pathname = "/dashboard/products";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[90%]">
      <form
        onSubmit={handleAddProduct}
        className="flex flex-col items-center justify-center gap-[30px] p-[100px] rounded-[5px] bg-gray-100 shadow-lg"
      >
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <input
          type="text"
          placeholder="Enter Product Title"
          className="form-input"
          value={formInputs.title}
          onChange={(e) =>
            setFormInputs({ ...formInputs, title: e.target.value })
          }
          required
        />
        <textarea
          type="text"
          placeholder="Enter Product Description"
          className="form-input h-32"
          value={formInputs.description}
          onChange={(e) =>
            setFormInputs({ ...formInputs, description: e.target.value })
          }
          required
        />
        <input
          type="file"
          placeholder="Choose Image"
          className="form-input"
          onChange={(e) =>
            setFormInputs({ ...formInputs, image: e.target.files.item(0) })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-500 color-[black] hover:bg-blue-600 border border-blue-500 px-[20px] py-[10px] rounded-md transition-colors duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md">
      {message}
    </div>
  );
}

export default UpdateProduct;
