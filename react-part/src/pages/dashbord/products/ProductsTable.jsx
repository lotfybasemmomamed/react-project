import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showProducts, deleteProduct } from "../../../apis/api";
// import Cookies from 'universal-cookie';

export default function ProductsTable() {
  // const cookie = new Cookies()
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);

  useEffect(() => {
    showProducts().then((res) =>  {
    setProducts(res.data);
    // console.log("res.data",res.data)
  })
  }, [runUseEffect]);

//   console.log("res.data",products)

  //delete user
  async function handleDeleteProduct(id) {
    await deleteProduct(id);
    setRunUseEffect((prev) => prev + 1);
  }
  //end delete user

  // Generate table rows for each product
 const productsData = products.map((product) => (
    <tr key={product.id} className="border-b dark:border-neutral-500 bg-blue-100">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{product.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.title}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.description}</td>
      <td className="whitespace-nowrap px-6 py-4"><img src={product.image} alt="productphoto" /></td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex gap-2">
          <svg
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/products/${product.id}`);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
          </svg>
          <svg
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => handleDeleteProduct(product.id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
          </svg>
        </div>
      </td>
    </tr>
  ));
  //End generate table rows for each product

//   return (
//     <div className="flex flex-col ms-1">
//       <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//           <div className="overflow-hidden">
//             <table className="min-w-full text-left text-sm font-light">
//               <thead className="border-b font-medium dark:border-neutral-500">
//                 <tr className="bg-blue-500">
//                   <th scope="col" className="px-6 py-4">
//                     Id
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Title
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Description
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Image
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Action
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     <button
//                       className="bg-blue-300 p-3 rounded-lg hover:bg-blue-200"
//                       onClick={() => {
//                         window.location.pathname = "/dashboard/products/create";
//                       }}
//                     >
//                       Add New Product
//                     </button>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>{usersData}</tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

 return (
    <div className="flex flex-col ms-1">
      <div className="hidden md:block overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">

            <div className="mb-4 flex justify-end">
              <button
                className="bg-blue-300 p-3 rounded-lg hover:bg-blue-200"
                onClick={() => {
                  window.location.pathname = "/dashboard/products/create";
                }}
              >
                Add New Product
              </button>
            </div>
            
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="bg-blue-500">
                  <th scope="col" className="px-6 py-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{productsData}</tbody>
            </table>
          </div>
        </div>
      </div>

   
      
    </div>
  );
 }
