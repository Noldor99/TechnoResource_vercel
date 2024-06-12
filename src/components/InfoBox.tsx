import { Box, IconButton, Typography } from "@mui/material";
import PaperRounding from "./styleComponents/containers/PaperRounding";
import FlexBetween from "./styleComponents/FlexBetween";


const InfoBox = ({ cardClass, title, count, icon }: any) => {
  return (
    <PaperRounding sx={{ padding: 2, maxWidth: '250px' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <FlexBetween>
        <Typography variant="h4">
          {count}
        </Typography>
        {icon}
      </FlexBetween>
    </PaperRounding>
  );
};

export default InfoBox;
