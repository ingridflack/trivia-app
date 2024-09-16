import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./styles.css";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.200",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "992px",
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
