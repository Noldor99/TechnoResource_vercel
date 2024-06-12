import { Container, Grid, MenuItem, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormGroupThema from "../../components/styleComponents/FormGroupThema";
import TextFieldForm from "../../components/styleComponents/TextFieldForm";
import { SAVE_SHIPPING_ADDRESS } from "../../store/slice/checkoutSlice";
import countries from "../../common/countries.json";
import TypographyTitle from "../../components/styleComponents/TypographyTitle";
import CheckoutSummary from "../../components/CheckoutSummary";
import ButtonBlueGreen from "../../components/styleComponents/buttons/ButtonBlueGreen";
import { BASE_URL } from "../../URL";
import { IShippingAddress } from "../../models/models";

const initialAddressState: IShippingAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState<IShippingAddress>({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate(`${BASE_URL}/checkout`);
  };

  return (
    <Container>
      <Grid container justifyContent='space-between' spacing={2}>
        <Grid item xs={12} md={6}>

          <TypographyTitle variant="h3" textAlign='center' paddingBottom={2}>
            Checkout Details
          </TypographyTitle>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormGroupThema sx={{ p: 2, gap: "30px" }}>
              <TypographyTitle variant="h4">
                Shipping Address
              </TypographyTitle>
              <TextFieldForm
                type="text"
                label="Recipient Name"
                required
                fullWidth
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <TextFieldForm
                type="text"
                label="Address line 1"
                required
                fullWidth
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <TextFieldForm
                type="text"
                label="Address line 2"

                fullWidth
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <TextFieldForm
                type="text"
                label="City"
                required
                fullWidth
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />

              <TextFieldForm
                type="text"
                label="State"
                required
                fullWidth
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <TextFieldForm
                type="text"
                label="Postal code"
                required
                fullWidth
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* COUNTRY INPUT */}
              <TextFieldForm
                select
                label="Country"
                name="country"
                value={shippingAddress.country}
                onChange={handleShipping}
                fullWidth
                required
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextFieldForm>
              <TextFieldForm
                type="text"
                label="Phone"
                required
                fullWidth
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
              <ButtonBlueGreen type="submit">
                Proceed To Checkout
              </ButtonBlueGreen>
            </FormGroupThema>
          </form>
        </Grid>
        <Grid item>

          <CheckoutSummary />

        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutDetails;

