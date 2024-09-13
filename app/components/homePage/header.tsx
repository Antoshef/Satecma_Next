import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export const Header = () => (
  <Box
    component="header"
    sx={{
      position: "relative",
      width: "100%",
      height: "80vh", // Taller height for header
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Space between text and right-side image
      p: 4,
      // backgroundColor: "#3baf63", // Fallback color for background
    }}
  >
    {/* Background Image */}
    <Image
      src="/header-bg.jpg"
      alt="Business Management App Background"
      fill
      quality={100}
      style={{ zIndex: 1, width: "100%", height: "100%", objectFit: "cover" }}
    />

    {/* Left-side content */}
    <Box
      sx={{
        zIndex: 1,
        maxWidth: { xs: "100%", md: "50%" },
        color: "white",
        backdropFilter: "blur(10px)",
        borderRadius: 4,
        p: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: "bold",
          background: "linear-gradient(90deg, black, pink)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Добре дошли в нашето приложение за управление на бизнес
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          color: "#e0e0e0",
          background: "linear-gradient(90deg, black, pink)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Оптимизирайте бизнес операциите си с лекота
      </Typography>

      {/* Buttons for Sign Up and Book a Demo */}
      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "#1e88e5",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
          }}
        >
          Вход
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderColor: "white",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            "&:hover": {
              borderColor: "#1e88e5",
            },
          }}
        >
          Виж Демо
        </Button>
      </Box>

      {/* Awards/Badges section */}
      {/* <Box
        sx={{
          display: "flex",
          mt: 6,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Image src={Badge} alt="Badge" width={200} height={200} />
        <Image
          src="/award2.png"
          alt="Award 2"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
        <Image
          src="/award3.png"
          alt="Award 3"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </Box> */}
    </Box>

    {/* Right-side image */}
    {/* <Box
      sx={{
        display: { xs: "none", md: "block" }, // Show only on medium screens and up
        zIndex: 1,
        width: "40%",
        height: "auto",
      }}
    >
      <Image
        src="/girl-transparent.png" // Add the right-side image you want here
        alt="girl image"
        layout="responsive"
        width={500}
        height={500}
        objectFit="contain"
      />
    </Box> */}
  </Box>
);
