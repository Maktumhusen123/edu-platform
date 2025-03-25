import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useState } from "react";

const offerings = [
  {
    title: "Class I - XII NCERT & Beyond",
    desc: "Explore expert-guided courses covering NCERT subjects.",
  },
  {
    title: "Mastering APM Tools",
    desc: "Learn to monitor, optimize, and troubleshoot applications using tools like Dynatrace and AppDynamics.",
  },
  {
    title: "Convert Your Documents",
    desc: "Easily convert PDFs, Word documents, and other file formats with our powerful tools.",
  },
];

const Offerings = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <Box mt={6}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        What’s in It for You?
      </Typography>
      <Grid container spacing={3} mt={2}>
        {offerings.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: hoverIndex === index ? 6 : 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 8 },
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Offerings;
