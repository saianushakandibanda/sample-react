import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useFormData } from "../context/FormDataContext";
import { Box } from '@mui/material';
import ProductChild from "./ProductChild";

// const CustomFooter = () => (

//       // <GridPagination />
  
// );


const ProductData = () => {
  
  
  const [tableData, setTableData] = useState([]);
  const { formState } = useFormData();
  const [age, setAge] = useState(0);
  const columns = [
    { field: "asin", headerName: "Product ID", width: 200 },
    {
      field: "product_title",
      headerName: "Title",
      width: 500,
      editable: true,
    },
    {
      field: "product_price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "product_star_rating",
      headerName: "Rating",
      width: 110,
      editable: true,
    },
    {
      field: "product_photo",
      headerName: "Photo",
      width: 160,
    },
  ];

  async function getProducts() {
    let response = await fetch(
      "https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
          "x-rapidapi-key":
            "e4545d9d0dmsh1c93aa81debaf91p146aa4jsne8ae48a6a295",
        },
      }
    );
    let data = await response.json();
    setTableData(data.data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

 

  return (
    <div className="grid-style">
      <span> Product Owner: {formState.name}</span>
      <span style={{ marginLeft: 80 }}> Experience: {age} </span>
      <Box sx={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row.asin}
         
          checkboxSelection
          disableRowSelectionOnClick
         
        />
      </Box>
      <ProductChild getAge={setAge} />
    </div>
  );
};

export default ProductData;
