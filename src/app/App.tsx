import { Box, Container } from "@chakra-ui/react";
import { TransactionsPage } from "../features/transactions/TransactionsPage";

export function App() {
  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 6, md: 10 }}>
      <Container maxW="3xl">
        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="xl" boxShadow="sm">
          <TransactionsPage />
        </Box>
      </Container>
    </Box>
  );
}
