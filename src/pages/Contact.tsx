import { useRef } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Container, Grid, Stack, Typography } from "@mui/material";
import PaperSharp from "../components/styleComponents/containers/PaperSharp";
import ButtonBlueGreen from "../components/styleComponents/buttons/ButtonBlueGreen";
import TextFieldForm from "../components/styleComponents/TextFieldForm";
import FlexBetween from "../components/styleComponents/FlexBetween";
import PaperRounding from "../components/styleComponents/containers/PaperRounding";

const Contact = () => {
  const form = useRef<any>();

  const sendEmail = (e: any) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        'service_x1pzosl',
        "template_w9hg697",
        form.current,
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
      )
      .then(
        (result: any) => {
          toast.success("Message sent successfully");
        },
        (error: any) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <Container>
      <Typography variant="h3" mb={2}>
        Contact Us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <form ref={form} onSubmit={sendEmail}>
            <PaperSharp sx={{
              padding: 2, display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>

              <TextFieldForm
                label="Name" variant="filled"
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <TextFieldForm
                label="Email" variant="filled"
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <TextFieldForm
                label="Subject" variant="filled"
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />

              <label>Message:</label>
              {/* @ts-ignore */}
              <textarea style={{ padding: "12px" }} name="message" cols="30" rows="10"></textarea>

              <ButtonBlueGreen type="submit">Send Message</ButtonBlueGreen>
            </PaperSharp>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PaperSharp sx={{ padding: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h3">
                Our Contact Information
              </Typography>
              <Typography>Fill the form or contact us via other channels listed below</Typography>
              <PaperRounding sx={{
                padding: 2,
                background: '#35fb82 !important', maxWidth: '300px'
              }}>
                <Stack spacing={2}>
                  <FlexBetween>
                    <SmartphoneIcon />
                    <Typography>+380 ** *** ** **</Typography>
                  </FlexBetween>
                  <FlexBetween>
                    <EmailIcon />
                    <Typography>Support@eshop.com</Typography>
                  </FlexBetween>
                  <FlexBetween>
                    <LocationOnIcon />
                    <Typography>Vitaly, Nigeria</Typography>
                  </FlexBetween>
                  <FlexBetween>
                    <TwitterIcon />
                    <Typography>@ZinoTrust</Typography>
                  </FlexBetween>
                </Stack>
              </PaperRounding>
            </Stack>
          </PaperSharp>
        </Grid>
      </Grid>
    </Container >
  );
};

export default Contact;
