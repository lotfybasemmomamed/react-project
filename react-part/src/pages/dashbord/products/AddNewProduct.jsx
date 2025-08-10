import { useState } from "react";
import { addNewProduct } from "../../../apis/api";
export default function AddNewProduct() {
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const formData = new FormData();
  const [errorMessage, setErrorMessage] = useState("");

   //Error function
    function showMessageError(message) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
    }

  async function handleSubmitProduct(e) {
    e.preventDefault();

   
    formData.append("title", formInputs.title);
    formData.append("description", formInputs.description);
    formData.append("image", formInputs.image);
    try {
      await addNewProduct(formData);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      showMessageError(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[90%]">
      <form
        onSubmit={handleSubmitProduct}
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
