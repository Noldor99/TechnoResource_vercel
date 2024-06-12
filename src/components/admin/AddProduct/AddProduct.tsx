import {
  Box, Typography, LinearProgress, Select, MenuItem, TextareaAutosize,
  CircularProgress, FormControl, FormGroup, InputLabel, Container
} from "@mui/material";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { IProduct } from "../../../models/models";
import { selectProducts } from "../../../store/slice/productSlice";
import { BASE_URL } from "../../../URL";
import ButtonBlueBack from "../../styleComponents/buttons/ButtonBlueBack";
import FormGroupThema from "../../styleComponents/FormGroupThema";
import SelectForm from "../../styleComponents/SelectForm";
import TextFieldForm from "../../styleComponents/TextFieldForm";
import UploadButtons from "./UploadButtons";



const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item: IProduct) => item.id === (id));


  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id: any, f1: any, f2: any) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("first")
    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate(`${BASE_URL}/admin/all-products`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };


  const editProduct = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    //@ts-ignore
    if (productEdit && product.imageURL !== productEdit.imageURL) {
      //@ts-ignore
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }


    try {
      // @ts-ignore
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        // @ts-ignore
        createdAt: productEdit?.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate(`${BASE_URL}/admin/all-products`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      {isLoading && <CircularProgress />}
      <form onSubmit={detectForm(id, addProduct, editProduct)}>
        <FormGroupThema
          sx={{ p: 2, gap: '30px' }}>
          <Typography variant="h2">
            {detectForm(id, "Add New Product", "Edit Product")}
          </Typography>

          <TextFieldForm
            type="text"
            label="Product name"
            required
            fullWidth
            name="name"
            value={product?.name}
            onChange={(e) => handleInputChange(e)}
          />
          <FormControl sx={{ gap: '10px' }}>

            {uploadProgress === 0 ? null : (
              <Box>
                <LinearProgress color="secondary" variant="buffer" value={uploadProgress} />
                {uploadProgress < 100
                  ? `Uploading ${uploadProgress}`
                  : `Upload Complete ${uploadProgress}%`}
              </Box>
            )}
            <UploadButtons handleImageChange={handleImageChange} />
            {product.imageURL === "" ? null : (
              <TextFieldForm
                type="text"
                // required
                fullWidth
                placeholder="Image URL"
                name="imageURL"
                value={product.imageURL}
                disabled
              />
            )}
          </FormControl>
          <TextFieldForm
            type="number"
            label="Product price"
            fullWidth
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <SelectForm
              required
              fullWidth
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <MenuItem value="" disabled>
                -- choose product category --
              </MenuItem>
              {categories.map((cat) => {
                return (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            </SelectForm>

          </FormControl>

          <TextFieldForm
            type="text"
            label="Product brand"
            required
            fullWidth
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <TextareaAutosize
            style={{ width: '100% ', padding: '12px' }}
            name="desc"
            placeholder="Product Description"
            required
            minRows={6}
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
          />
          <ButtonBlueBack variant="contained" type="submit">
            {detectForm(id, "Save Product", "Edit Product")}
          </ButtonBlueBack>

        </FormGroupThema>
      </form>
    </Container>
  );
}

export default AddProduct
