import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./styles.css";

const theme = extendTheme({
  fonts: {
    body: `'Mulish', sans-serif`,
  },
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
    FormLabel: {
      baseStyle: {
        marginBottom: "4px",
        fontSize: "small",
        color: "gray.500",
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
